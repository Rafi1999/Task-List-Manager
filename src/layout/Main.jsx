import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../shared/NavigationBar'

export default function Main() {
  return (
    <div className='my-3 mx-16'>
        <NavigationBar />
        <Outlet />   
    </div>
  )
}
