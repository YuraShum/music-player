import userApi from '@/api/requests/user.requests'
import { UpdateUserNameParams } from '@/interfaces/apiInterfaces'
import { setAuthUser } from '@/redux/features/modalSlise'
import { setUser } from '@/redux/features/userSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

type Props = {
    name: string
}


const UpdateUserNameForm = ({ name }: Props) => {

    const dispatch = useDispatch()

    const router = useRouter()

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit
    } = useForm<UpdateUserNameParams>()

    const submitNewUserName: SubmitHandler<UpdateUserNameParams> = async (values) => {

        const { response, error } = await userApi.updateUserName(values)
        if (response) {
            reset()
            dispatch(setUser(null))
            dispatch(setAuthUser(true))
            router.push('/')
            
        }
        if (error) {
            console.log(error)
        }

    }

    return (
        <form
            onSubmit={handleSubmit(submitNewUserName)}
            className='flex flex-col gap-4 p-6 max-w-[600px] w-full'>
            {/** curent user name section */}
            <div className='flex flex-col gap-2 '>
                <label className='text-sm font-bold'>
                    Curent user name *
                </label>
                <input
                    disabled
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg'
                    type="text"
                    value={name} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>
                    New username *
                </label>
                <input
                    type="text"
                    placeholder='Enter new username here'
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg'
                    {...register('newUserName', { required: true, minLength: 8 })} />
                {errors.newUserName &&
                    <p className='text-red-500 text-sm -mt-1 pl-3'>
                        Ім'я має бути більше 8 символів.
                    </p>}
            </div>
            <div className='flex justify-between items-center'>
                <button
                className='border-2 text-white bg-link hover:bg-orange-400 border-gray-300 p-2 rounded-lg font-bold transition hover:translate-y-[-2px] duration-500'
                    onClick={() => reset()}>
                    Cancel
                </button>
                <button
                    type='submit'
                    className=" p-2 bg-primary text-white wont-bold rounded hover:bg-hovered transition hover:translate-y-[-2px] duration-500">
                    Change username
                </button>
            </div>
        </form>
    )
}

export default UpdateUserNameForm