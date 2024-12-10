import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import Footer from '../components/Footer'

export default function Main() {
  return (
    <div>
        <Navbar />
        <Outlet />   
    </div>
  )
}
