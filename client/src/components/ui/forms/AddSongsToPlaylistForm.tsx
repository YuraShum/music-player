import playlistApi from '@/api/requests/playlist.requests'
import songApi from '@/api/requests/song.requests'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RxCrossCircled } from 'react-icons/rx'
import { SiNbc } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface SongsParams {
    songIds: string[]
    songsInformation: never[]
}
type Props = {
    playlistId: string
}

const AddSongsToPlaylistForm = ({ playlistId, includedSongs }: Props) => {

    const [userSongs, setUserSongs] = useState([])
    const [selectedSongs, setSelectedSongs] = useState<string[]>([])
    const { user } = useSelector((state: any) => state.user)
    const selectMusicRef = useRef<HTMLSelectElement>(null)

    const {
        reset,
        handleSubmit,
    } = useForm<SongsParams>()

    useEffect(() => {
        if (selectedSongs.length === 0 && selectMusicRef.current) {
            selectMusicRef.current.value = ''
        }
    }, [selectedSongs])

    useEffect(() => {

        const getUserSongs = async () => {
            const { response, error } = await songApi.getUserSongs()

            if (response) {
                setUserSongs(response)
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


    const submitSongsToPlaylist: SubmitHandler<SongsParams> = async () => {
        console.log("selected songId", selectedSongs)
        const { response, error } = await playlistApi.addSongsToPlaylist({ playlistId, songIds: selectedSongs })

        if (response) {
            reset()
            toast.success("Songs have been successfully added to the playlist")
        }
        if (error) {
            console.log(error)
        }
    }
    const handleRemoveFromSelected = (songId: string) => {
        setSelectedSongs(selectedSongs.filter(id => id !== songId))
    }

    const handleSongSelected = (event) => {
        if (!selectedSongs.includes(event.target.value)) {
            setSelectedSongs([...selectedSongs, event.target.value])
        } else {
            toast.warning('Ця пісня вже додана в плейлист.');
        }
    }
    console.log(selectedSongs)


    return (
        <form
            onSubmit={handleSubmit(submitSongsToPlaylist)}
            className='max-w-[600px] w-full flex flex-col gap-4'>
            <div className=' flex flex-col gap-2'>
                <label className=' font-bold'>
                    Add songs that should be included in the playlist
                </label>
                <select
                ref={selectMusicRef}
                    defaultValue=''
                    className='bg-transparent p-3 text-sm w-full border-2 border-gray-300 rounded-lg'
                    onChange={handleSongSelected}>
                    <option value='' disabled>Choose a song</option>
                    {userSongs
                        .filter((song) => !includedSongs.some((includedSong) => includedSong._id === song._id))
                        .map((song, index) => (
                            <option
                                key={song._id}
                                value={song?._id}
                                className='text-primary bg-transparent p-2'>
                                {song?.title} - {song?.artist}
                            </option>
                        ))}
                </select>

                <ul className='max-h-[20vh] overflow-auto ml-3 flex flex-col gap-2 bg-transparent '>
                    {selectedSongs.map((songId, index) => {
                        const song = userSongs.find(song => song._id === songId)
                        return (
                            <li key={songId}
                                className='p-3 text-sm w-full border-2 border-gray-300 rounded-lg flex justify-between items-center hover:bg-hovered hover:bg-opacity-40 hover:text-white duration-300'>
                                <div className='flex gap-2'>
                                    <span>{index + 1}</span>
                                    <p>{song?.title} - {song?.artist}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromSelected(songId)}>
                                    <RxCrossCircled className='w-5 h-5 hover:text-link duration-300' />
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button
                type='submit'
                className="bg-primary text-white p-3 rounded-lg hover:bg-hovered duration-500 hover:translate-y-[-2px] w-full border-gray-300 border-2">
                Add songs
            </button>
        </form>
    )
}

export default AddSongsToPlaylistForm