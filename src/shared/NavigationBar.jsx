import { AccountCircle, Image, Person } from '@mui/icons-material'
import React from 'react'
import logoImg from '../assets/logotask.png'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
  return (
    <div className='flex justify-between'>
    <Link to='/' className='flex justify-center items-center gap-2'>
        <h1 className='text-2xl font-bold'>Task</h1>
        <h1 className='text-2xl font-bold text-blue-500'>Manager</h1>
    <img className='rounded-full w-[45px] h-[35px]'  src={logoImg} alt="logo" />
    </Link>
    <div>
        <AccountCircle  sx={{ fontSize: 38 }}/>
    </div>
</div>
  )
}

