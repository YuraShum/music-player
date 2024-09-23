import { getHexColorByText } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import playlistApi from '@/api/requests/playlist.requests'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import songApi from '@/api/requests/song.requests'
import configURL from '@/const/config.ts'
import { SlOptions } from "react-icons/sl";

type Props = {
    name: string,
    description: string,
    songs: string[],
    id: string
}


//!! додати динамічне оновлення даних після видалення 
const Playlist = ({ name, description, songs, id }: Props) => {

    const { user } = useSelector(state => state.user)

    const [songsInformation, setSongsInformation] = useState([])
    const [allInfoIsOpen, setAllInfoIsOpen] = useState(false)

    useEffect(() => {
        const getSongsInfo = async () => {
            if (songs.length === 0) return;

            try {
                const { response, error } = await songApi.getSongsInformation(songs);
                if (response) {
                    setSongsInformation(response);
                } else if (error) {
                    toast.error('Не вдалося отримати інформацію про пісні');
                }
            } catch (err) {
                console.error('Помилка при отриманні інформації про пісні:', err);
                toast.error('Сталася неочікувана помилка.');
            }
        };

        getSongsInfo();
    }, [user]);


    console.log('Song information', songsInformation)

    const handleDeletePlayList = async () => {
        const { response, error } = await playlistApi.deletePlaylist({ playlistId: id })

        if (response) {
            toast.success('Плейлист успішно видалено')
        }
        if (error)
            toast.error("Неможливо виконати видалення плейлисту")
    }

    const handleToggleOpenAllInformation = () => {
        setAllInfoIsOpen(prevValue => !prevValue)
    }
    const nameArray = name.split(' ')
    return (
        <div
            className={`text-white p-3 rounded-lg`}
            style={{ 
                background: `linear-gradient( ${getHexColorByText(name)}, #363558)`
            }}>
            <div className=' flex justify-between items-center h-32 '>
                <div className='flex gap-6'>
                    {/** logo section */}
                    <p className='flex justify-center items-center h-24 w-24 rounded-xl shadow-xl text-4xl italic text-white font-bold border-2 shadow-lg' style={{ backgroundColor: getHexColorByText(name) }}>
                        {nameArray.length > 1 ? `${nameArray[0][0] + nameArray[1][0]}` : nameArray[0][0]}
                    </p>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-bold mb-4'>{name}</h2>
                        <div className='text-sm'>
                            <p>{description}</p>
                            <span>Number of songs: {songs.length}</span>
                        </div>
                    </div>
                </div>
                <CustomButton text='Delete' handleClick={handleDeletePlayList} />
            </div>
            <div className='mb-3 text-lg '>
                {allInfoIsOpen ?
                    <button onClick={handleToggleOpenAllInformation}>
                        Cloce
                    </button> :
                    <button onClick={handleToggleOpenAllInformation}>
                        Open detail information</button>}
            </div>
            {allInfoIsOpen && (
                <table className="w-full table-auto">
                    <thead className='border-b-2 '>
                        <tr >
                            <th scope="col" className="text-left">#</th>
                            <th scope="col" className="text-left">Name</th>
                            <th scope="col" className="text-right">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songsInformation.map((song, index) => (
                            <tr key={song._id}>
                                <td className="text-left">{index + 1}</td>
                                <td className="text-left">
                                    {song.cover ? (
                                        <div className="flex gap-2 items-center">
                                            <img
                                                src={`${configURL.BASE_URL}/${song.cover}`}
                                                alt="song title"
                                                className="w-14 h-14 bg-gray-200 rounded-xl"
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold">{song.title}</h3>
                                                <p className="text-sm">{song.artist}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="text-xl font-bold">{song.title}</h3>
                                            <p className="text-sm">{song.artist}</p>
                                        </div>
                                    )}
                                </td>
                                <td className="flex justify-end mr-4">
                                    <SlOptions />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            )}
        </div>
    )
}

export default Playlist