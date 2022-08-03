import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/solid'
import React from 'react'

export default function Input() {
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
        <img 
            src="https://media-exp1.licdn.com/dms/image/C5603AQHENc1KNEV9uA/profile-displayphoto-shrink_200_200/0/1517420039217?e=1665014400&v=beta&t=EmHjtkGrQdFn7TOxTBzGzAHxYvcsvAg3k0Mh0AYS4DA"
            alt="user-img"
            className='h-11 w-11 rounded-full cursor-pointer hover:brightness-80'
        />
        <div className='w-full divide-y divide-gray-200'>
            <div className=''>
                <textarea className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder="What's happening"></textarea>
            </div>
            <div className='flex items-center justify-between pt-2.5'>
                <div className='flex'>
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
                </div>
                <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50' disabled>Tweet</button>
            </div>
        </div>
    </div>
  )
}
