import userApi from '@/api/requests/user.requests'
import { updateUserPasswordParams } from '@/interfaces/apiInterfaces'
import { setAuthUser } from '@/redux/features/modalSlise'
import { setUser } from '@/redux/features/userSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

type Props = {}

const UpdateUserPasswordForm = (props: Props) => {

    const dispatch = useDispatch()
    const router = useRouter()
    const { reset, register, handleSubmit, formState: { errors } } = useForm<updateUserPasswordParams>()

    const submiteNewPassword: SubmitHandler<updateUserPasswordParams> = async (values) => {
        try {
            const { response, error } = await userApi.updateUserPassword(values)
            if (response) {
                reset()
                dispatch(setUser(null))
                dispatch(setAuthUser(true))
                router.push('/')
            }
            if (error) {
                console.log(error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(submiteNewPassword)}
            className='flex flex-col gap-4 p-2 md:p-6 max-w-[600px] w-full'>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>
                    User's password *
                </label>
                <input
                    type="password"
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg'
                    placeholder='Enter password here'
                    {...register('password', { required: true, minLength: 8 })} />
                {errors.password &&
                    <p className='text-red-500 text-sm -mt-1 pl-3'>
                        Пароль користувача має бути більшим 8 символів.
                    </p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>
                    New password *
                </label>
                <input
                    type="password"
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg'
                    placeholder='Enter new password here'
                    {...register('newPassword', { required: true, minLength: 8 })} />
                {errors.newPassword &&
                    <p className='text-red-500 text-sm -mt-1 pl-3'>
                        Пароль користувача має бути більшим 8 символів.
                    </p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>
                    Confirm new password *
                </label>
                <input
                    type="password"
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg'
                    placeholder='Enter confirm password here'
                    {...register('confirmNewPassword', { required: true, minLength: 8 })} />
                {errors.confirmNewPassword &&
                    <p className='text-red-500 text-sm -mt-1 pl-3'>
                        Пароль користувача має бути більшим 8 символів.
                    </p>}
            </div>
            <div className='flex gap-2 flex-col-reverse md:flex-row md:justify-between md:items-center'>
                <button
                    onClick={() => reset()}
                    className=' w-fit border-2 text-white bg-link border-gray-300 p-2 hover:bg-orange-400 rounded-lg font-bold transition hover:translate-y-[-2px] duration-500'>
                    Cancel
                </button>
                <button
                    type='submit'
                    className=" w-fit p-2 bg-primary text-white rounded hover:bg-hovered transition hover:translate-y-[-2px] duration-500">
                    Change password
                </button>
            </div>
        </form>
    )
}

export default UpdateUserPasswordForm