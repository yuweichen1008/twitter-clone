import { SparklesIcon } from '@heroicons/react/solid'
import React from 'react'
import Input from './Input'
import Post from './Post'

export default function Feed() {
    const posts = [
        {
            id: "1",
            name: "Yuwei Chen",
            username: "yuweichen",
            userImg: "https://images.unsplash.com/photo-1659462247480-9e42c7e2ced8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            img: "https://images.unsplash.com/photo-1659394754299-26e8172a1d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            text: "Nice view",
            timestamp: "1 hour ago"
        },
        {
            id: "2",
            name: "Naiwei Li",
            username: "naiwei",
            userImg: "https://images.unsplash.com/photo-1656444470562-5c077e738fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
            img: "https://images.unsplash.com/photo-1659462306513-478ac16140a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
            text: "Nice view",
            timestamp: "2 hours ago"
        }
    ]
    return (
        <div className='xl:ml-[370px] border-l border-r xl:min-w-[567px] sm:ml-[73px] flex-grow max-w-xl'>
            <div className='flex py-2 px-3 sticky top-0 z-50 bg:white border-b border-gray-200'>
                <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
                <div className='hoverEffect flex item-center justify-center px-0 ml-auto w-9 h-9'>
                    <SparklesIcon className='h-5' />
                </div>
            </div>
            <Input />
            {posts.map((post)=>(
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
