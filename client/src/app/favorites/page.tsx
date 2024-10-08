'use client'
import favoriteApi from '@/api/requests/favorite.requests'
import songApi from '@/api/requests/song.requests'
import FavoriteItem from '@/components/ui/FavoriteItem'
import Search from '@/components/ui/Search'
import { SongType } from '@/types/types'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { IoIosSearch } from 'react-icons/io'
import { toast } from 'react-toastify'

type Props = {}

const Page = (props: Props) => {
    
    const [favoriteSongsId, setFavoriteSongsId] = useState<string[]>([])
    const [favoriteInformation, setFavoriteInformation] = useState<SongType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [filteredFavoriteSongs, setFilteredFavoriteSongs] = useState<SongType[]>([])

    const getFavoriteSongs = async () => {
        try {
            const result = await favoriteApi.getAllUserFavoritesSongs();

            if ('response' in result) {
                setFavoriteSongsId(result.response || []);
            } else if ('error' in result) {
                console.log(result.error);
            }
        } catch (err) {
            console.error('Помилка при отриманні улюблених пісень:', err);
        }
    }
    useEffect(() => {
        getFavoriteSongs()
    }, [])

    useEffect(() => {
        const getSongsInformation = async () => {
            if (favoriteSongsId.length === 0) return;
            try {
                const result = await songApi.getSongsInformation(favoriteSongsId)
                if ('response' in result) {
                    setFavoriteInformation(result.response)
                    setFilteredFavoriteSongs(result.response)
                }
                else if ('error' in result) {
                    console.log(result.error)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getSongsInformation()
    }, [favoriteSongsId])

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        const currentValue = event.target.value.toLowerCase()

        const filteredSongs = favoriteInformation.filter(favorite =>
            favorite.artist.toLowerCase().includes(currentValue) ||
            favorite.title.toLowerCase().includes(currentValue)
        )
        setFilteredFavoriteSongs(filteredSongs)
    }

    const onDeleteFromFavorites = async (songId: string) => {
        const { response, error } = await favoriteApi.removeFromFavorites({ songId })
        console.log(response)
        if (response) {
            toast.success('Successfully delete your favorite track')
            getFavoriteSongs()
            setFavoriteSongsId(prevValue => prevValue.filter(id => id !== songId))
            setFilteredFavoriteSongs(prevValue => prevValue.filter(song => song._id !== songId))
        }
        if (error) {
            console.log(error)
            toast.error('Failed to remove from favorites')
        }
    }

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** section serach favorite song */}
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center gap-2'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold '>Favorite songs</h2>
                    <div className='relative'>
                        <FaHeart className='w-8 h-8 lg:w-10 lg:h-10 text-red-600' />
                        <span className='absolute top-[2px] left-[9px] lg:top-[6px] lg:left-[13px] text-lg lg:text-xl font-bold text-white'>{favoriteSongsId.length}</span>
                    </div>
                </div>
                <Search searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue}/>
            </div>
            {filteredFavoriteSongs.map((favorite) => (
                <div
                    key={favorite._id}>
                    <FavoriteItem favoriteSong={favorite} onDeleteFromFavorites={onDeleteFromFavorites} />
                </div>
            ))}
        </div>
    )
}

export default Page