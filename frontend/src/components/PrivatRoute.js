import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
const PrivatRoute = () => {
    const auth = localStorage.getItem('user');
  return (
     auth ? <Outlet/> : <Navigate to={'/signin'}/>
  )
}

export default PrivatRoute
