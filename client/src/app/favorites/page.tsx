'use client'
import favoriteApi from '@/api/requests/favorite.requests'
import songApi from '@/api/requests/song.requests'
import FavoriteItem from '@/components/ui/FavoriteItem'
import { GetSongsInformationParams } from '@/interfaces/apiInterfaces'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { IoIosSearch } from 'react-icons/io'
import { toast } from 'react-toastify'

type Props = {}

const Page = (props: Props) => {
    const [favoriteSongsId, setFavoriteSongsId] = useState<string[]>([])
    const [favoriteInformation, setFavoriteInformation] = useState<GetSongsInformationParams | any[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredFavoriteSongs, setFilteredFavoriteSongs] = useState(null)

    useEffect(() => {
        const getFavoriteSongs = async () => {
            const { response, error } = await favoriteApi.getAllUserFavoritesSongs()

            if (response) {
                setFavoriteSongsId(response?.songs || [])
            }
            if (error) {
                console.log(error)
            }
        }

        getFavoriteSongs()
    }, [])


    useEffect(() => {
        const getSongsInformation = async () => {
            if (favoriteSongsId.length === 0) return;

            const { response, error } = await songApi.getSongsInformation(favoriteSongsId)
            if (response) {
                setFavoriteInformation(response)
                setFilteredFavoriteSongs(response)
            }
            if (error) {
                (error)
            }
        }

        getSongsInformation()
    }, [favoriteSongsId])

    console.log(favoriteInformation)

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        const currentValue = event.target.value.toLowerCase()

        const filteredSongs = favoriteInformation?.filter(favorite =>
            favorite.artist.toLowerCase().includes(currentValue) ||
            favorite.title.toLowerCase().includes(currentValue)
        )
        setFilteredFavoriteSongs(filteredSongs)
    }
    const onDeleteFronFavorites = async (songId: string) => {
        const { response, error } = await favoriteApi.removeFromFavorites({ songId })
        console.log(response)
        if (response) {
            toast.success('Successfully delete your favorite track')
            setFavoriteSongsId(prevValue => prevValue.filter(id => id !== songId))
        }
        if (error) {
            console.log(error)
            toast.success('Failed to remove from favorites')
        }
    }

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** section serach favorite song */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <h2 className='text-4xl font-bold '>Favorite songs</h2>
                    <div className='relative'>
                        <FaHeart className='w-10 h-10 text-red-600' />
                        <span className='absolute top-[6px] left-[13px] text-xl font-bold text-white'>{favoriteSongsId.length}</span>
                    </div>
                </div>
                <div className='relative'>
                    <IoIosSearch className='absolute top-2 left-0 w-8 h-8 text-gray-400' />
                    <input
                        placeholder='Search'
                        className='bg-gray-100 p-3 pl-8 text-sm border-gray-300 border-2 rounded-lg w-full'
                        value={searchValue}
                        onChange={handleChangeSearchValue} />
                </div>
            </div>
            {filteredFavoriteSongs?.map((favorite) => (
                <div
                    key={favorite._id}>
                    <FavoriteItem favoriteSong={favorite} onDeleteFronFavorites={onDeleteFronFavorites} />
                </div>
            ))}
        </div>
    )
}

export default Page