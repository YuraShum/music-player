import { getRandomHexColor } from '@/utils/utils'
import React from 'react'
import CustomButton from './CustomButton'
import playlistApi from '@/api/requests/playlist.requests'
import { toast } from 'react-toastify'

type Props = {
    name: string,
    description: string,
    songs: string[],
    id: string
}


//!! додати динамічне оновлення даних після видалення 
const Playlist = ({ name, description, songs, id }: Props) => {

    const handleDeletePlayList = async () => {
        const { response, error } = await playlistApi.deletePlaylist({ playlistId: id })

        if(response){
            toast.success('Плейлист успішно видалено')
        }
        if(error)
            toast.error("Неможливо виконати видалення плейлисту")
    }

    const nameArray = name.split(' ')
    return (
        <div className=' flex justify-between items-center h-32 bg-gradient-to-t from-gray-200 to-white p-3 rounded-lg'>
            <div className='flex gap-6'>
                {/** logo section */}
                <p className='flex justify-center items-center h-24 w-24 opacity-40 rounded-xl shadow-xl text-4xl italic text-white font-bold' style={{ backgroundColor: getRandomHexColor() }}>
                    {nameArray.length > 1 ? `${nameArray[0][0] + nameArray[1][0]}` : nameArray[0][0]}
                </p>
                <div className='flex flex-col'>
                    <h2 className='text-2xl font-bold mb-4'>{name}</h2>
                    <div className='text-sm text-gray-600'>
                        <p>{description}</p>
                        <span>Number of songs: {songs.length}</span>
                    </div>
                </div>
            </div>
            <CustomButton text='Delete' handleClick={handleDeletePlayList} />
        </div>
    )
}

export default Playlist