'use client'
import userApi from '@/api/requests/user.requests'
import React, { useEffect, useState } from 'react'
import UserProfile from '@/components/ui/userProfile';
import UpdateUserNameForm from '@/components/ui/forms/UpdateUserNameForm';
import UpdateUserPasswordForm from '@/components/ui/forms/UpdateUserPasswordForm';
import CustomButton from '@/components/ui/CustomButton';
import { UserInformation, UserRaiting } from '@/interfaces/apiInterfaces';

type Props = {}

const page = (props: Props) => {

    const [userInformation, setUserInformation] = useState<UserInformation| null>(null);
    const [userRaiting, setUserRating] = useState<UserRaiting| null>(null);
    const [isUpdateUserNameOpen, setIsUpdateUserNameOpen] = useState<boolean>(true)

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const [resultRating, resultInfo] = await Promise.all([
                    userApi.getUserRating(),
                    userApi.getUserInformation(),
                ]);

                if ('response' in resultRating) {
                    setUserRating(resultRating.response);
                } else if ('error' in resultRating) {
                    console.log(resultRating.error);
                }

                if ('response' in resultInfo) {
                    setUserInformation(resultInfo.response);
                } else if ('error' in resultInfo) {
                    console.log(resultInfo.error);
                }
            } catch (err) {
                console.error('Помилка при отриманні інформації про користувача:', err);
            }
        };

        getUserInfo();
    }, []);

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** background section */}
            <div className='w-full '>
                <img className='rounded-t-lg h-[30vh] w-full opacity-70 overflow-hidden object-cover' src='/modalImg.jpg' alt="" />
            </div>
            {/** user section */}
            <div className='flex flex-col md:flex-row'>
                {/** user information section */}
                <UserProfile userInformation={userInformation} userRaiting={userRaiting} />
                {/** update section */}
                <div className='md:max-w-[60%] w-full bg-slate-200 rounded-b-lg md:rounded-none px-2'>
                    <div className=' flex flex-col md:flex-row gap-4 justify-center items-center mt-4 '>
                        <CustomButton text='Update username' handleClick={() => setIsUpdateUserNameOpen(true)} />
                        <CustomButton text='Update password' handleClick={() => setIsUpdateUserNameOpen(false)} />
                    </div>
                    <div className='flex justify-center '>
                        {isUpdateUserNameOpen ?
                            <UpdateUserNameForm name={userInformation?.username} /> :
                            <UpdateUserPasswordForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page