'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShootingStars } from './ShootingStars'
import { StarsBackground } from './StarsBackground'
import CustomButton from './CustomButton'
import SigninForm from './forms/SigninForm'
import SignupForm from './forms/SignupForm'

const ModalWindow = () => {

    const [isLogin, setIsLogin] = useState(false)

    return (
        <div className="h-[100vh] bg-primary flex flex-col items-center justify-center relative w-full">
            <div className='bg-white rounded-lg max-w-[600px] w-full flex shadow-2xl z-10'>
                <div className='w-[40%] bg-primary '>
                    <img className='rounded-l-lg opacity-50 h-full object-cover' src='/modalImg.jpg' alt="" />
                </div>
                <div className='w-[60%] flex-col'>
                    <div className='flex justify-center items-center gap-4 mt-2'>

                        <CustomButton text='Sign up' handleClick={() => setIsLogin(false)} />
                        <CustomButton text='Sign in' handleClick={() => setIsLogin(true)} />
                    </div>

                    {isLogin ?
                        <SigninForm/> :
                        <SignupForm/>}
                </div>
            </div>
            <ShootingStars />
            <StarsBackground />
        </div>
    )
}

export default ModalWindow