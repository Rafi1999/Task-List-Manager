import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col ">
    {/* Main Content */}
    <main>
    <div className='mt-16 text-center font-semibold text-5xl'>
        Manage Your Task.
    </div>
    <div className='grid justify-center items-center'>
        <Link to='/tasks'  className='mt-5 text-center rounded-md px-5 py-2 text-base bg-amber-500 font-medium'>Get Started</Link >
    </div>
    </main>
  </div>
  )
}
