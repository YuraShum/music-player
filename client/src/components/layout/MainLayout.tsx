'user client'
import React, { ReactNode, use, useEffect } from 'react'
import NavBar from '../ui/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import ModalWindow from '../ui/ModalWindow'
import userApi from '@/api/requests/user.requests'
import { setUser } from '@/redux/features/userSlice'
import Loader from '../ui/Loader/Loader'
import { setAuthUser } from '@/redux/features/modalSlise'


type Props = {
    children: ReactNode
}

const MainLayout = ({ children }: Props) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.user)

    const { authUser } = useSelector((state: any) => state.authUser)
    useEffect(() => {
        const getAuthUser = async () => {
        try {
            const result = await userApi.getUserInformation()

            if ('response' in result) {
                dispatch(setUser(result.response))
            }
            if ('error' in result) {
                dispatch(setUser(null))
                dispatch(setAuthUser(true))
            }
        } catch (err) {
            console.log(err)
        }
        }

        getAuthUser()
    }, [dispatch])

    return (
        <>
            {!user ?
                authUser ? <ModalWindow /> : <Loader /> :
                <div>

                    <div className="bg-primary min-h-[100vh] w-full flex">
                        <NavBar />
                        <div className="w-full min-h-[90vh] bg-custom rounded-3xl m-4">
                            {children}
                        </div>
                    </div>
                </div>}

        </>

    )
}

export default MainLayout