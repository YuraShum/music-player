'use client'
import playlistApi from '@/api/requests/playlist.requests'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { CiCirclePlus } from "react-icons/ci";
import CreateNewPlaylistForm from '@/components/ui/forms/CreateNewPlaylistForm'

type Props = {}

const page = (props: Props) => {

    const { user } = useSelector((state: any) => state.user)

    const [playlists, setPlaylists] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [createNewPlaylistIsOpen, setCreateNewPlaylistIsOpen] = useState(false)

    useEffect(() => {
        const getUserPlaylists = async () => {
            const { response, error } = await playlistApi.getUserPlayLists()
            if (response) {
                setPlaylists(response)
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

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** section search and create playlist */}
            <div>
                <div className='flex gap-5'>
                    <h2 className='text-4xl font-bold'>Playlists</h2>
                    <button 
                    onClick={handleToggleCreateNewPlaylist}
                    className='flex items-center border-2 border-gray-400 px-3 py-2 gap-2 rounded-full hover:translate-y-[-2px] duration-500 hover:text-white hover:bg-hovered'>
                        <CiCirclePlus className='w-7 h-7'/>
                        <span>Create new Playlist</span>
                    </button>
                </div>
                <div>

                </div>
            </div>
            {/** create new playlist form */}
            {createNewPlaylistIsOpen && <CreateNewPlaylistForm/>}
        
        </div>

    )
}

export default page