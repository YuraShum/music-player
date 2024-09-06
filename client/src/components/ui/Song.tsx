import { getRandomHexColor } from '@/utils/utils';
import { SiMusicbrainz } from "react-icons/si";
import { IoPersonSharp } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import CustomButton from './CustomButton';


type Props = {
    artist: string,
    cover: string,
    mp3: string,
    title: string,
    index: number,
    id: string
}

//!! додати функціонал
const handleDeleteSong = async() => {

}

const Song = ({ artist, cover, mp3, title, index, id }: Props) => {
    return (
        <div className='flex justify-between'>
            <div className='flex items-center gap-8'>
                <span className='text-xl font-bold text-gray-400'>{9 >= index && 0}{index + 1}</span>
                {cover ?
                    <img src={cover} alt='song title' /> :
                    <SiMusicbrainz style={{ color: getRandomHexColor() }} className='w-16 h-16 bg-gray-200 rounded-xl ' />
                }
                <div className='flex flex-col'>
                    <h2 className='text-lg font-bold'>{title}</h2>
                    <div className='flex gap-2 items-center text-gray-400'>
                        <IoPersonSharp />
                        <p>{artist}</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-6 items-center'>
                <GrFavorite  className='w-6 h-6 cursor-pointer' />
                <CustomButton text='Delete' handleClick={() => console.log()}></CustomButton>
            </div>
        </div>
    )
}

export default Song