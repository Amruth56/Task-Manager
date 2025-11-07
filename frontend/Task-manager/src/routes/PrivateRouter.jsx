import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRouter = ({allowedRoles}) => {
  return <Outlet/>
}

export default PrivateRouter