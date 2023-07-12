import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedLayout({children, login =false}) {

  const isAuth = Boolean(useSelector(state => state.token))

  if(login) {
    if(isAuth) return <Navigate to="/" />

    return children
  }

  if(!isAuth) {
    return <Navigate to="/login" />
  }

  return children
}
