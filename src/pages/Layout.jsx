import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <div>Layout Header/Sidebar</div>
            <Outlet />
        </div>
    )
}

export default Layout