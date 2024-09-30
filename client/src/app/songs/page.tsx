'use client'
import songApi from '@/api/requests/song.requests'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IoIosSearch } from "react-icons/io";
import { RiDownloadCloudLine } from "react-icons/ri";
import DownLoadSongForm from '@/components/ui/forms/DownLoadSongForm'
import Song from '@/components/ui/Song'
import MusicPlaingItem from '@/components/ui/MusicPlaingItem'
import { randomNonRepeatingIndex } from '@/utils/utils'
import { SongType } from '@/types/types'
import Search from '@/components/ui/Search';

type Props = {}

const Page = (props: Props) => {

    const [songs, setSongs] = useState<SongType[]>([])
    const [originalSongs, setOriginalSongs] = useState<SongType[] | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const [createFormIsOpen, setCreateFromIsOpen] = useState<boolean>(false)
    const [currentTrack, setCurrentTrack] = useState<SongType | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const getUserSongs = async () => {
        try {
            const result = await songApi.getUserSongs()
            if ('response' in result) {
                const songsData: SongType[] = result.response;
                setSongs(songsData)
                setOriginalSongs(songsData)
                toast.success('Пісні успішно отримані')
            }
            if ('error' in result) {
                toast.error(
                    'Неможливо отримати пісні'
                )
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserSongs()
    }, [])

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredSongs = originalSongs?.filter(song =>
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        )
        setSongs(filteredSongs || [])
        setSearchValue(searchTerm);
    };

    const handleToggleDownload = () => {
        setCreateFromIsOpen(prevValue => !prevValue)
    }

    const handlePlay = () => setIsPlaying(true);

    const handlePause = () => setIsPlaying(false);

    const handleToggleSong = () => {
        getUserSongs()
    }

    const handlePreviousTrack = () => {
        if (!currentTrack || songs.length === 0) return

        const currentIndex = songs.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
        const previosIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentTrack(songs[previosIndex])
    }

    const handleNextTrack = () => {
        if (!currentTrack || songs.length === 0) return
        const currentIndex = songs.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentTrack(songs[nextIndex])
    }

    const handleNextRandomTrack = () => {
        if (!currentTrack || songs?.length === 0) return
        const currentIndex = songs.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
        const newIndex = randomNonRepeatingIndex(currentIndex, songs.length)
        setCurrentTrack(songs[newIndex])
    }

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** section search and download song */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    <h2 className='text-4xl font-bold '>Songs</h2>
                    <button
                        onClick={handleToggleDownload}
                        className='flex border-2 border-gray-400 px-3 py-2 justify-center items-center gap-2 rounded-full hover:translate-y-[-2px] duration-500 hover:text-white hover:bg-hovered'>
                        <RiDownloadCloudLine />
                        <span>Download</span>
                    </button>
                </div>
                <Search searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue} />
            </div>
            {/** download song section */}
            {createFormIsOpen &&
                <DownLoadSongForm
                    onCretedNewSong={handleToggleSong}
                    setCreateFromIsOpen={setCreateFromIsOpen} />}
            {/** Downloaded songs section */}
            <div className='mt-16'>
                <h2 className="text-2xl font-bold">Downloaded songs</h2>
                <div className="flex flex-col h-full max-h-[70vh] overflow-auto">
                    {songs?.map((song, index) => (
                        <Song
                            key={song._id}
                            title={song.title}
                            artist={song.artist}
                            mp3={song.mp3}
                            cover={song.cover}
                            index={index}
                            id={song._id}
                            onPlay={() => setCurrentTrack(song)}
                            currentTrack={currentTrack}
                            isPlaying={isPlaying}
                            deletedSong={handleToggleSong}
                        />
                    ))}
                </div>
            </div>
            {songs && <MusicPlaingItem
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                nextTrack={handleNextTrack}
                previousTrack={handlePreviousTrack}
                nextRandomTrack={handleNextRandomTrack} />}
        </div>
    )
}

export default Page