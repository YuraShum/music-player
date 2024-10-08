import playlistApi from '@/api/requests/playlist.requests';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RxCrossCircled } from "react-icons/rx";
import { SongType } from '@/types/types';

interface CreatePlaylistParams {
    name: string,
    description: string,
    songs: string[]
}
type Props = {
    onPlaylistCreated: () => void,
    userSongs: SongType[],
    openForm: (value: boolean) => void
}

const CreateNewPlaylistForm = ({ onPlaylistCreated, userSongs, openForm }: Props) => {

    const [selectedSongs, setSelectedSongs] = useState<string[]>([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePlaylistParams>();
    const selectRef = useRef<HTMLSelectElement>(null)


    useEffect(() => {
        if (selectedSongs.length === 0 && selectRef.current) {
            selectRef.current.value = "";
        }
    }, [selectedSongs]);

    const handleSongSelected = (event: ChangeEvent<HTMLSelectElement>) => {
        if (!selectedSongs.includes(event.target.value)) {
            setSelectedSongs([...selectedSongs, event.target.value])
        } else {
            toast.warning('Ця пісня вже додана в плейлист.');
        }
    }

    const handleRemoveFromSelected = (songId: string) => {
        setSelectedSongs(selectedSongs.filter(id => id !== songId))
    }

    const submitNewPlaylist: SubmitHandler<CreatePlaylistParams> = async ({ name, description }) => {
        try {
            const { response, error } = await playlistApi.createPlayList({ name, description, songs: selectedSongs })

            if (response) {
                toast.success('Успішно створено новий плейлист')
                setSelectedSongs([])
                reset()
                openForm(false)
                onPlaylistCreated()
            }
            if (error) {
                console.log(error)
                toast.error('Сталася помилка при створені нового плейлиста')
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error('Сталася неочікувана помилка.');
        }
    }

    return (
        <form
            className='flex flex-col gap-4 p-6 max-w-[600px]'
            onSubmit={handleSubmit(submitNewPlaylist)}>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>Playlist name*</label>
                <input
                    type="text"
                    placeholder='name'
                    {...register('name', { required: true })}
                    className="bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg" />
                {errors.name && (
                    <p className="text-red-500 text-sm -mt-1 pl-3">Поле обов'язкове.</p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>Description*</label>
                <input
                    type="text"
                    placeholder='text'
                    {...register('description', { required: true })}
                    className="bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg" />
                {errors.description && (
                    <p className="text-red-500 text-sm -mt-1 pl-3">Поле обов'язкове.</p>
                )}
            </div>
            <div
                className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>Додайте пісні які мають входити в плейлист</label>
                <select
                    ref={selectRef}
                    defaultValue=""
                    className='bg-gray-100 p-3 text-sm w-full border-2 border-gray-300 rounded-lg'
                    onChange={handleSongSelected}>
                    <option value="" disabled>Choose a song</option>
                    {userSongs.map((song) => (
                        <option
                            key={song?._id}
                            value={song?._id}>
                            {song?.title} - {song?.artist}
                        </option>
                    ))}
                </select>
                <ul className='max-h-[20vh] overflow-auto ml-3 flex flex-col gap-2 '>
                    {selectedSongs.map((songId, index) => {
                        const song = userSongs.find(song => song._id === songId)
                        return (
                            <li key={songId}
                                className='bg-gray-100 p-3 text-sm w-full border-2 border-gray-300 rounded-lg flex justify-between items-center hover:bg-hovered hover:text-white duration-300'>
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
                className="bg-primary text-white p-3 rounded-lg hover:bg-hovered duration-500 hover:translate-y-[-2px]">
                Create
            </button>
        </form>
    )
}

export default CreateNewPlaylistForm