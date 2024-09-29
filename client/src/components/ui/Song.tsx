import { getHexColorByText } from '@/utils/utils';
import { SiMusicbrainz } from "react-icons/si";
import { IoPersonSharp } from "react-icons/io5";
import songApi from '@/api/requests/song.requests';
import { toast } from 'react-toastify';
import { FaPlayCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { FaCirclePause } from "react-icons/fa6";
import configURL from '../../const/config.ts'
import favoriteApi from '@/api/requests/favorite.requests.ts';
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Props = {
    artist: string,
    cover: string,
    mp3: string,
    title: string,
    index: number,
    id: string,
    onPlay: () => void,
    currentTrack: { mp3: string, cover: string, artist: string, title: string } | null,
    isPlaying: boolean,
    deletedSong: () => void,
}

const Song = ({ artist, cover, mp3, title, index, id, onPlay, currentTrack, isPlaying, deletedSong}: Props) => {

    const [isFavoriteSong, setIsFavoriteSong] = useState<boolean>(false)
    const coverSrc = cover ? `${configURL.BASE_URL}/${cover}` : ''
    const isCurrentTrack = currentTrack && currentTrack.mp3 === mp3 && currentTrack.title === title

    useEffect(() => {
        try {
            const checkIsFavoriteSong = async () => {
                const result = await favoriteApi.isSongIsFavorites({ songId: id })
                if ("response" in result) {
                    setIsFavoriteSong(result.response.isFavorite)
                }
                if ("error" in result) {
                    console.log(result.error)
                }
            }
            checkIsFavoriteSong()
        } catch (err) {
            console.log(err)
        }
    }, [id])

    const handleDeleteSong = async () => {
        try {
            const { response, error } = await songApi.deleteSong({ songId: id });
            if (response) {
                deletedSong()
                toast.success('Пісню успішно видалено');
            }
            if (error) {
                console.log(error);
                toast.error("Пісню неможливо видалити");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleAddToFavorite = async () => {
        try {
            const { response, error } = await favoriteApi.addToFavorites({ songId: id })
            if (response) {
                setIsFavoriteSong(true)
            }
            if (error) {
                console.log(error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemoveFromFavorite = async () => {
        try {
            const { response, error } = await favoriteApi.removeFromFavorites({ songId: id })
            if (response) {
                setIsFavoriteSong(false)
            }
            if (error) {
                console.log(error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleMusicIsPlaying = () => {
        onPlay()
        
    }

    return (
        <div>
            <div className='flex justify-between hover:bg-gray-200 p-4'>
                <div className='flex items-center gap-8'>
                    <p className='text-xl font-bold text-gray-400 min-w-8'>{9 >= index && 0}{index + 1}</p>
                    {cover ?
                        <img src={coverSrc} alt='song title' className='w-16 h-16 bg-gray-200 rounded-xl object-cover' /> :
                        <SiMusicbrainz style={{ color: getHexColorByText(title) }} className='w-16 h-16 bg-gray-200 rounded-xl ' />
                    }
                    {isCurrentTrack && isPlaying ?
                        <FaCirclePause
                            className='w-8 h-8 cursor-pointer text-primary'/>
                        :
                        <FaPlayCircle
                            className='w-8 h-8 cursor-pointer text-primary'
                            onClick={handleMusicIsPlaying} />}
                    <div className='flex flex-col'>
                        <h2 className='text-lg font-bold'>{title}</h2>
                        <div className='flex gap-2 items-center text-gray-400'>
                            <IoPersonSharp />
                            <p>{artist}</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 items-center'>
                    {isFavoriteSong ?
                        <button onClick={handleRemoveFromFavorite}>
                            <FaHeart className='w-6 h-6 cursor-pointer text-red-500' />
                        </button> :
                        <button onClick={handleAddToFavorite}>
                            <FaHeart className='w-6 h-6 cursor-pointer' />
                        </button>
                    }
                    <button
                        onClick={handleDeleteSong}>
                        <MdDelete className='w-7 h-7 text-primary' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Song