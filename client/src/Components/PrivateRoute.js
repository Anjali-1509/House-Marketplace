import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import useAuthState from '../hooks/useAuthState'
import Spinner from './Spinner'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const PrivateRoute = () => {
   const [loggedIn, setLoggedIn] = useState(false)
const [checkState, setCheckState] = useState(true)


useEffect(()=>{
  const auth = getAuth()
  onAuthStateChanged(auth, (user)=>{
    if(user){
      setLoggedIn(true)
    }
    setCheckState(false)
  })
})

   

   if(checkState){
    return <Spinner />
   }
 
   return loggedIn ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
