'user client'
import React, { ReactNode} from 'react'
import NavBar from '../ui/NavBar'
import { useSelector } from 'react-redux'
import ModalWindow from '../ui/ModalWindow'


type Props = {
    children: ReactNode
}

const MainLayout = ({ children }: Props) => {
    const { user } = useSelector((state: any) => state.user)
    
    return (
        <>
            {!user && <ModalWindow/>}
            {user &&  (<div>

                <div className="bg-primary min-h-[100vh] w-full flex">
                    <NavBar />
                    <div className="w-full min-h-[90vh] bg-custom rounded-3xl m-4">
                        {children}
                    </div>
                </div>
            </div>)}

        </>

    )
}

export default MainLayout