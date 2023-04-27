import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomePage from './HomePage'
import Profile from './Profile'

const Rout = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Profile />} />
    </Routes>
  )
}

export default Rout