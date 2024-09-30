import React from 'react'
import './Loader.css'
import { loaderStyles } from '@/const/loaderConfig'

const Loader = () => {

  const array = new Array(10).fill(null)
  const loaderColors = [
    'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500',
    'bg-orange-400', 'bg-orange-300', 'bg-orange-200', 'bg-orange-100', 'bg-orange-200',
]

  return (
    <div className='h-[100vh] bg-primary flex flex-row items-center justify-center relative w-full gap-4'>
      {array.map((item, index) => (
        <div 
          key={index}
          className={`${loaderColors[index]} loader-line `}
          style={{ animationDelay: loaderStyles[index] }}
        >
        </div>
      ))}
    </div>
  )
}

export default Loader