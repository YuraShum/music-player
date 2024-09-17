'use client'
import userApi from '@/api/requests/user.requests'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserAlt } from "react-icons/fa";
import UserProfile from '@/components/ui/userProfile';
import UpdateUserNameForm from '@/components/ui/forms/UpdateUserNameForm';
import UpdateUserPasswordForm from '@/components/ui/forms/UpdateUserPasswordForm';
import CustomButton from '@/components/ui/CustomButton';

type Props = {}

const page = (props: Props) => {


    const { user } = useSelector((state: any) => state.user)

    const [userInformation, setUserInformation] = useState(null)
    const [userRaiting, setUserRating] = useState(null)
    const [isUpdateUserNameOpen, setIsUpdateUserNameOpen] = useState<boolean>(true)

    useEffect(() => {
        const getUserInfo = async () => {
            const [{ response: ratingResponse, error: ratingError }, { response: infoResponse, error: infoError }] = await Promise.all([
                userApi.getUserRating(),
                userApi.getUserInformation(),
            ]);

            if (ratingResponse) {
                setUserRating(ratingResponse);
            } else {
                console.log(ratingError);
            }
            if (infoResponse) {
                setUserInformation(infoResponse)
            }
            if (infoError) {
                console.log(infoError)
            }
        }
        getUserInfo()
    }, [user])
    console.log('User account info', userInformation)

    return (
        <div className='p-4 h-[95vh] overflow-auto'>
            {/** background section */}
            <div className='w-full '>
                <img className='rounded-t-lg h-[30vh] w-full opacity-70 overflow-hidden object-cover' src='/modalImg.jpg' alt="" />
            </div>
            {/** user section */}
            <div className='flex'>
                {/** user information section */}
                <UserProfile userInformation={userInformation} userRaiting={userRaiting} />
                {/** update section */}
                <div className='max-w-[60%] w-full bg-slate-200'>
                    <div className=' flex gap-4 justify-center items-center mt-4'>
                        <CustomButton text='Update username' handleClick={() => setIsUpdateUserNameOpen(true)}/>
                        <CustomButton text='Update password' handleClick={() => setIsUpdateUserNameOpen(false)}/>
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