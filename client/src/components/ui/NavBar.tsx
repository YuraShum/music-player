import NAV_BAR_CONFIG from '@/const/navbarConfig'
import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
    return (
        <div className='p-6 flex flex-col relative justify-center items-center gap-6 max-h-[100vh]'>
            {NAV_BAR_CONFIG.map((item, index) => (
                <a
                    href={item.link}
                    key={item.link}
                    className={`
                        ${index === 0 ? 'absolute top-12' : ""} 
                        ${index === NAV_BAR_CONFIG.length - 1 ? 'absolute bottom-12' : ""} 
                        text-white`}>
                    {index === 4 && (
                        <div className="w-[0.5px] h-16 bg-white ml-[14px] rotate-90 mb-3 opacity-45"></div>
                    )}
                    <span
                        className={`hover:text-gray-300 hover:translate-y-1 ${index !== 0? "hover:shadow-[0_3px_3px_0_rgba(255,255,255,0.4)] duration-300 flex items-center justify-center rounded-b" : ''}`}
                    >
                        {index === 0
                            ? React.createElement(item.icon, { size: 60, color: '#e28743' })
                            : React.createElement(item.icon, { size: 25 })}
                    </span>

                </a>
            ))}
        </div>
    )
}

export default NavBar