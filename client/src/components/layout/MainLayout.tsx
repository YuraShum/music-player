'user client'
import React, { ReactNode, use, useEffect } from 'react'
import NavBar from '../ui/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import ModalWindow from '../ui/ModalWindow'
import userApi from '@/api/requests/user.requests'
import { setUser } from '@/redux/features/userSlice'


type Props = {
    children: ReactNode
}

const MainLayout = ({ children }: Props) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.user)

    useEffect(() => {
        const getAuthUser = async () => {
            const {response, error} = await userApi.getUserInformation()

            if(response){
                dispatch(setUser(response))
            }
            if(error){
                dispatch(setUser(null))
            }
        }

        getAuthUser()
    }, [dispatch])

    console.log('User MainLayout', user)


    return (
        <>
            {!user ? <ModalWindow /> :
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