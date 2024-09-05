
import userApi from '@/api/requests/user.requests';
import { setAuthUser } from '@/redux/features/modalSlise';
import { setUser } from '@/redux/features/userSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

type Props = {}

interface ExitUserParams {
    username: string,
    password: string
}

const SigninForm = (props: Props) => {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ExitUserParams>();

    const submitExitUser: SubmitHandler<ExitUserParams> = async (values) => {
        const { response, error } = await userApi.userSignIn(values)
        if (response) {
            reset()
            dispatch(setUser(response))
            dispatch(setAuthUser(false))
            toast.success('Вхід дозволений!!')
        }
        if(error)
            console.log(error)
        toast.error(
           'щось пішло не так'
        )
    }

    return (
        <form onSubmit={handleSubmit(submitExitUser)}
            className='flex flex-col gap-4 p-6'>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>
                    User Name *
                </label>
                <input
                    type='text'
                    placeholder='Full Name'
                    {...register('username', { required: true, minLength: 8 })}
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg' />
                {errors.username &&
                    <p className='text-red-500 text-sm -mt-1 pl-3'>
                        Ім'я має бути більше 8 символів.
                    </p>}
            </div>

            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold'>
                    Password *
                </label>
                <input
                    placeholder='create your password'
                    type='password'
                    {...register('password', { required: true, minLength: 8 })}
                    className='bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg' />
                {errors.password && <p className='text-red-500 text-sm -mt-1 pl-3'>Пароль має бути більше 8 символів.</p>}
            </div>
            <button
                type="submit"
                className="mt-4 p-2 bg-primary text-white rounded hover:bg-hovered transition hover:translate-y-[-2px] duration-500"
            >
                Exit
            </button>
        </form>
    )
}

export default SigninForm