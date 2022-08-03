import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className='flex min-h-screen max-w-7xl mx-auto bg-green-50'>
      <Sidebar />
    </div>
  )
}
