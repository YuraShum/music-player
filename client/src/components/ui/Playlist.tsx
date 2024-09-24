import { getHexColorByText } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import playlistApi from '@/api/requests/playlist.requests'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import songApi from '@/api/requests/song.requests'
import configURL from '@/const/config.ts'
import { MdDelete } from "react-icons/md";
import AddSongsToPlaylistForm from './forms/AddSongsToPlaylistForm'

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
    const [userSongs, setUserSongs] = useState([])
    const [isAddSongToPlaylist, setIsAddSongsToPlaylist] = useState(false)

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

        const getUserSongs = async () => {
            const { response, error } = await songApi.getUserSongs()
            if (response) {
                setUserSongs(response)
            }
            if (error) {
                console.log(error)
            }
        }

        getSongsInfo();
        getUserSongs();
    }, [user]);

    console.log(`Playlist songs: ${songsInformation}, UserSongs:${userSongs}`)

    const allUserSongsIncluded = userSongs.every(userSong => songsInformation.some(playlistSong => playlistSong._id === userSong._id));

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

    const handleDeleteSongFromPlaylist = async (playlistId: string, songId: string) => {
        const { response, error } = await playlistApi.deleteSongFromPlaylist({ playlistId, songId })
        if (response) {
            toast.success("Successfully removed from playlist")
        }
        if (error) {
            console.log(error)
        }
    }
    console.log(songsInformation)
    const handleToggleAddSongsToPlaylist = () => {
        setIsAddSongsToPlaylist(prevValue => !prevValue)
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
                <button
                    className='px-3 py-2 border-2 border-gray-300 rounded-full hover:translate-y-[-2px] duration-500 hover:text-white hover:bg-link'
                    onClick={handleDeletePlayList}>
                    Delete Playlist
                </button>

            </div>
            <div className='my-3 text-lg flex gap-4'>
                {allInfoIsOpen ?
                    <button
                        className='border-2 py-1 px-3 rounded-full hover:translate-y-[-2px] duration-500  hover:bg-link'
                        onClick={handleToggleOpenAllInformation}>
                        Close
                    </button> :
                    <button
                        className='border-2 py-1 px-3 rounded-full hover:translate-y-[-2px] duration-500  hover:bg-link'
                        onClick={handleToggleOpenAllInformation}>
                        Open detail information</button>}
                {!allUserSongsIncluded &&
                    <>
                        {isAddSongToPlaylist ?
                            <button
                                className='border-2 py-1 px-3 rounded-full hover:translate-y-[-2px] duration-500  hover:bg-link'
                                onClick={handleToggleAddSongsToPlaylist}>
                                Close form add songs
                            </button> :
                            <button
                                className='border-2 py-1 px-3 rounded-full hover:translate-y-[-2px] duration-500  hover:bg-link'
                                onClick={handleToggleAddSongsToPlaylist}>
                                Add songs to playlist
                            </button>}
                    </>
                }

            </div>
            {allInfoIsOpen && (
                songsInformation.length > 0 ?
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
                                <tr key={song._id} className='hover:bg-gray-400 duration-200 hover:bg-opacity-20'>
                                    <td className="text-left p-2">{index + 1}</td>
                                    <td className="text-left p-2">
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
                                    <td className="flex justify-end mr-4 p-2 ">
                                        <button
                                            className=''
                                            onClick={() => handleDeleteSongFromPlaylist(id, song._id)}>
                                            <MdDelete className='w-6 h-6' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> :
                    <p className='m-auto my-6 p-4 border-2 border-gray-300 rounded-full w-fit text-lg'>There are no songs in the playlist: <span className='font-bold italic underline'>{name}</span></p>
            )}
            {/** add songs to playlist section */}

            {!allUserSongsIncluded && isAddSongToPlaylist && (
                <AddSongsToPlaylistForm playlistId={id} includedSongs={songsInformation} />
            )}
        </div>
    )
}

export default Playlist