'use client'
import playlistApi from '@/api/requests/playlist.requests'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { CiCirclePlus } from "react-icons/ci";
import CreateNewPlaylistForm from '@/components/ui/forms/CreateNewPlaylistForm'
import AllUserPlaylists from '@/components/ui/AllUserPlaylists'
import { IoIosSearch } from "react-icons/io";
import { PlaylistType } from '@/types/types'

type Props = {}

const page = (props: Props) => {

    const { user } = useSelector((state: any) => state.user)

    const [originalPlaylists, setOriginalPlaylists] = useState<PlaylistType[] | null>(null)
    const [filteredPlaylists, setFilteredPlaylists] = useState<PlaylistType[] | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [createNewPlaylistIsOpen, setCreateNewPlaylistIsOpen] = useState(false)

    useEffect(() => {
        const getUserPlaylists = async () => {
            const { response, error } = await playlistApi.getUserPlayLists()
            if (response) {
                setOriginalPlaylists(response)
                setFilteredPlaylists(response)
                toast.success('Плейлисти успішно отримані')

            }
            if (error) {
                toast.error('Не вдалося отримати плейлисти')
            }
        }

        getUserPlaylists()

    }, [user])

    const handleToggleCreateNewPlaylist = () => {
        setCreateNewPlaylistIsOpen(prevValue => !prevValue)
    }

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        const searchItem = event.target.value.toLowerCase()

        const filteredPlaylists = originalPlaylists?.filter(playlist =>
            playlist.name.toLowerCase().includes(searchItem)
        )
        setFilteredPlaylists(filteredPlaylists || [])
        setSearchValue(searchItem)
    }

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** section search and create playlist */}
            <div className='flex justify-between items-center w-full'>
                <div className='flex gap-5'>
                    <h2 className='text-4xl font-bold'>Playlists</h2>
                    <button
                        onClick={handleToggleCreateNewPlaylist}
                        className={`flex items-center border-2 border-gray-400 px-3 py-2 gap-2 rounded-full hover:translate-y-[-2px] duration-500 hover:text-white hover:bg-hovered ${createNewPlaylistIsOpen && 'bg-primary text-white'}`}>
                        {createNewPlaylistIsOpen ?
                            <p>Close</p>
                            :
                            <>
                                <CiCirclePlus className='w-7 h-7' />
                                <span>Create new Playlist</span>
                            </>}
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
            {/** create new playlist form */}
            {createNewPlaylistIsOpen && <CreateNewPlaylistForm />}
            {/** display of all created user playlists */}
            {filteredPlaylists?.length > 0 && <AllUserPlaylists
                playlists={filteredPlaylists} />}

        </div>

    )
}

export default page