import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute({isLogged}) {
  return (
    isLogged ? <Outlet/> : <Navigate to="/"/>
  )
}
