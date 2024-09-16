import { FaUserAlt } from 'react-icons/fa';

const UserProfile = ({ userInformation, userRaiting }) => {
    return (
        <div className='relative max-w-[40%] w-full border-2 border-gray-200'>
            <div className='absolute inset-x-0 top-[-80px] flex justify-center items-center'>
                <div className='rounded-full bg-orange-400 w-40 h-40 flex justify-center items-center text-white'>
                    <FaUserAlt className='w-20 h-20' />
                </div>
            </div>
            <p className='text-center mt-24 text-lg '>{userInformation?.username}</p>
            <div className='flex mt-10'>
                <div className='flex-1 flex flex-col items-center justify-center border-t-2 p-4'>
                    <p className='text-xl font-bold'>{userInformation?.songs.length}</p>
                    <span className='text-sm opacity-65 text-wrap text-center'>number of tracks</span>
                </div>
                <div className='flex-1 flex flex-col items-center justify-center border-2 border-b-0 p-4'>
                    <p className='text-xl font-bold'> {userRaiting?.rank}/{userRaiting?.totalUsers}</p>
                    <span className='text-sm opacity-65 text-wrap text-center'>Raiting</span>
                </div>
                <div className='flex-1 flex flex-col items-center justify-center border-t-2 p-4'>
                    <p className='text-xl font-bold'>{userInformation?.playlists.length}</p>
                    <span className='text-sm opacity-65 text-wrap text-center'>number of playlists</span>
                </div>
            </div>

        </div>
    );
}

export default UserProfile;