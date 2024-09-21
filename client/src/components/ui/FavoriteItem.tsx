import React from 'react'
import configURL from '../../const/config.ts'
import { SiMusicbrainz } from 'react-icons/si'
import { getRandomHexColor } from '@/utils/utils.ts'
import { MdDelete } from "react-icons/md";

type Props = {
    favoriteSong: {
        _id: string,
        cover: string,
        artist: string,
        title: string
    } | null,
    onDeleteFronFavorites: (songId: string) => void
}

const FavoriteItem = ({ favoriteSong }: Props) => {

    const coverSrc = favoriteSong?.cover ? `${configURL.BASE_URL}/${favoriteSong?.cover}` : ''
    return (
        <div className='flex justify-between items-center border-b-2 border-gray-300'>
            <div className='flex gap-4 p-2'>
                {favoriteSong?.cover ?
                    <img src={coverSrc} alt='song title' className='w-24 h-24 bg-gray-200 rounded-xl' /> :
                    <SiMusicbrainz style={{ color: getRandomHexColor() }} className='w-24 h-24 bg-gray-200 rounded-xl ' />
                }
                <div className=''>
                    <h2 className='font-bold text-2xl'>{favoriteSong?.title}</h2>
                    <span className='text-sm opacity-75'>{favoriteSong?.artist}</span>
                </div>
            </div>
            <button 
            onClick={() => onDeleteFronFavorites(favoriteSong?._id)}>
                <MdDelete className='w-7 h-7 text-primary'/>
            </button>
        </div>
    )
}

export default FavoriteItem