import React, { ChangeEvent, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'

type Props = {
    searchValue: string,
    handleChangeSearchValue: (e: ChangeEvent<HTMLInputElement>) => void,

}

const Search = ({searchValue, handleChangeSearchValue}: Props) => {

    return (
        <div className='relative'>
            <IoIosSearch className='absolute top-2 left-0 w-8 h-8 text-gray-400' />
            <input
                placeholder='Search'
                className='bg-gray-100 p-3 pl-8 text-sm border-gray-300 border-2 rounded-lg w-full'
                value={searchValue}
                onChange={handleChangeSearchValue} />
        </div>
    )
}

export default Search