import React from 'react'
import Image from 'next/image'
import SidebarMenuItems from './SidebarMenuItems'
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon
} from "@heroicons/react/solid"
import { useSession, signIn, signOut } from 'next-auth/react'
export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
      {/* Logo */}
      <div className='hoverEffect p-0 hover:bg-blue-100'>
        <Image
          width="50"
          height="50"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png" />
      </div>
      {/* Menu */}
      <div className='mt-4 mb-2.5 xl:item-start'>
        <SidebarMenuItems text="Home" Icon={HomeIcon} active />
        <SidebarMenuItems text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItems text="Notification" Icon={BellIcon} />
            <SidebarMenuItems text="Message" Icon={InboxIcon} />
            <SidebarMenuItems text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItems text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItems text="Profile" Icon={UserIcon} />
            <SidebarMenuItems text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {/* Button */}
      {session ? (
        <>
          <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold hover:brightness-80 text-lg hidden xl:inline'>
            Tweet
          </button>
        </>
      ) :
        <>
          <button
            onClick={signIn}
            className='bg-blue-400 text-white rounded-full w-36 h-12 font-bold hover:brightness-80 text-lg hidden xl:inline'>
            Sign In
          </button>
        </>}

      {/* Mini-Profile */}
      {session && (
        <>
          <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            <img
              onClick={signOut}
              src={session.user.image}
              alt="user-img"
              className='h-10 w-10 rounded-full xl:mr-2'
            />
            <div className=' hidden xl:inline'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
          </div>
        </>
      )}
    </div>
  )
}
