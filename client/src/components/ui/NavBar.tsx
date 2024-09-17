import NAV_BAR_CONFIG from '@/const/navbarConfig'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdExitToApp } from "react-icons/md";
import { setUser } from '@/redux/features/userSlice';
import { setAuthUser } from '@/redux/features/modalSlise';

type Props = {}

const NavBar = (props: Props) => {

    const pathname = usePathname()
    const dispatch = useDispatch()
    const router = useRouter()

    const { authUser } = useSelector((state: any) => state.authUser)

    const handleSignOutUser =  () => {
        dispatch(setUser(null))
        dispatch(setAuthUser(true))
        router.push('/')
    }

    return (
        <div className='p-6 flex flex-col relative justify-center items-center gap-6 max-h-[100vh]'>
            {NAV_BAR_CONFIG.map((item, index) => (
                <a
                    href={item.link}
                    key={`${item.link} ${index}`}
                    className={`
                        ${index === 0 ? 'absolute top-12' : ""} 
                        ${index === NAV_BAR_CONFIG.length - 1 ? 'absolute bottom-12' : ""} 
                        ${pathname == item.link ? 'text-link': 'text-white' }`}
                >
                    {index === 4 && (
                        <div className="w-[0.5px] h-16 bg-white ml-[14px] rotate-90 mb-3 opacity-45"></div>
                    )}
                    <span
                        className={`hover:text-gray-300 hover:translate-y-1 ${index !== 0 ? "hover:shadow-[0_3px_3px_0_rgba(255,255,255,0.4)] duration-300 flex items-center justify-center rounded-b" : ''}`}
                    >
                        {index === 0
                            ? React.createElement(item.icon, { size: 60, color: '#e28743' })
                            : React.createElement(item.icon, { size: 25 })}
                    </span>
                </a>
            ))}
            {!authUser && 
            <button 
            className='border-none'
            onClick={() => handleSignOutUser()}>
                <MdExitToApp className='w-[27px] h-[27px] text-white hover:text-gray-300 hover:translate-y-1 hover:shadow-[0_3px_3px_0_rgba(255,255,255,0.4)] duration-300 flex items-center justify-center rounded-b'/>
                </button>}
        </div>
    )
}

export default NavBar