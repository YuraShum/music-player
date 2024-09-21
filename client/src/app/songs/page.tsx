'use client'
import songApi from '@/api/requests/song.requests'
import MainLayout from '@/components/layout/MainLayout'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IoIosSearch } from "react-icons/io";
import { RiDownloadCloudLine } from "react-icons/ri";
import DownLoadSongForm from '@/components/ui/forms/DownLoadSongForm'
import Song from '@/components/ui/Song'
import MusicPlaingItem from '@/components/ui/MusicPlaingItem'
import { randomNonRepeatingIndex } from '@/utils/utils'
import { SongType } from '@/types/types'

type Props = {}

const Page = (props: Props) => {
    const { user } = useSelector((state: any) => state.user)

    const [songs, setSongs] = useState<SongType[] | null>(null)
    const [originalSongs, setOriginalSongs] = useState<SongType[] | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [createFormIsOpen, setCreateFromIsOpen] = useState(false)

    const [currentTrack, setCurrentTrack] = useState<SongType| null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();

        const filteredSongs = originalSongs?.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        )

        setSongs(filteredSongs || [])
        setSearchValue(searchTerm);
    };

    useEffect(() => {
        const getUserSongs = async () => {
            const { response, error } = await songApi.getUserSongs()
            if (response) {
                const songsData: SongType[] = response as SongType[];
                setSongs(songsData)
                setOriginalSongs(songsData)
                toast.success('Пісні успішно отримані')
            }
            if (error) {
                toast.error(
                    'Неможливо отримати пісні'
                )
            }
        }
        getUserSongs()
    }, [user])

    const handleToggleDownload = () => {
        setCreateFromIsOpen(prevValue => !prevValue)
    }
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handlePreviousTrack = () => {
        if (!currentTrack || songs?.length === 0) return

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
                <div className='relative'>
                    <IoIosSearch className='absolute top-2 left-0 w-8 h-8 text-gray-400' />
                    <input
                        placeholder='Search'
                        className='bg-gray-100 p-3 pl-8 text-sm border-gray-300 border-2 rounded-lg w-full'
                        value={searchValue} onChange={(event) => handleChangeSearchValue(event)} />
                </div>
            </div>
            {/** download song section */}
            {createFormIsOpen && <DownLoadSongForm />}
            {/** Downloaded songs section */}
            <div className='mt-16'>
                <h2 className="text-2xl font-bold">Downloaded songs</h2>
                <div className="flex flex-col gap-6 p-6 h-full max-h-[70vh] overflow-auto">
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
                        />
                    ))}
                </div>
            </div>
            <MusicPlaingItem
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                nextTrack={handleNextTrack}
                previousTrack={handlePreviousTrack} 
                nextRandomTrack={handleNextRandomTrack}/>
        </div>

    )
}

export default Page