'use client'
import songApi from '@/api/requests/song.requests'
import MainLayout from '@/components/layout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IoIosSearch } from "react-icons/io";
import { RiDownloadCloudLine } from "react-icons/ri";
import DownLoadSongForm from '@/components/ui/forms/DownLoadSongForm'

type Props = {}

const Page = (props: Props) => {
    const { user } = useSelector((state: any) => state.user)

    const [songs, setSongs] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [createFormIsOpen, setCreateFromIsOpen] = useState(false)

    const handleChangeSearchValue = (event) => {
        console.log(event.target.value)
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        const getUserSongs = async () => {
            const { response, error } = await songApi.getUserSongs()
            console.log(response)
            if (response) {
                setSongs(response)
                toast.success('Пісні успішно отриманні')
            }
            if (error) {
                toast.error(
                    'Неможливо отримати пісні'
                )
            }
        }
        getUserSongs()
    }, [user])

    console.log(songs)

    const handleToggleDownload = () => {
        setCreateFromIsOpen(prevValue => !prevValue)
    }

    return (
        <div className='p-4'>
            {/** section search and download song song */}
            <div className='flex justify-between items-center'>
                <div  className='flex gap-5'>
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
            {createFormIsOpen && <DownLoadSongForm/>}
        </div>

    )
}

export default Page