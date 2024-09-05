import React from 'react'

type Props = {
    text: string,
    handleClick: () => void;
}

const CustomButton = ({ text, handleClick }: Props) => {
    return (
        <button
            onClick={ handleClick}
            className="relative cursor-pointer p-[2px] ">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none"></div>
            <div className="px-4 py-1 bg-white rounded-[6px] relative group transition duration-500 text-black hover:bg-transparent">
                {text}
            </div>
        </button>
    )
}

export default CustomButton