import React from 'react'
import Dashboard_header from '../Dashboard/Header/Dashboard_header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Dashboard_header/>
      <Outlet/>
    </div>
  )
}

export default Layout
