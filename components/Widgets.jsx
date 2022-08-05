import React, { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import News from './News'

export default function Widgets({ newsResults }) {
  const [articleNum, setArticleNum] = useState(5)
  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5'>
      <div className='w-[90%] xl:w-[75%] sticky top-0 py-1.5 z-50'>
        <div className='flex item-center p-3 rounded-full relative'>
          <SearchIcon className='h-5 z-50 text-gray-500' />
          <input className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-200' type="text" placeholder='Search Twitter' />
        </div>
      </div>
      <div className='text-gray-700 space-y-3 rounded-xl pt-2 bg-gray-200 w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4'>What's happening</h4>
        {newsResults.slice(0,articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button 
          onClick={()=>setArticleNum(articleNum + 3)}
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show more</button>
      </div>
    </div>
  )
}
