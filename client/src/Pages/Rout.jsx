import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomePage from './HomePage'
import Profile from './Profile'
import Offer from './Offer'
import Signin from './Signin'
import Signup from './Signup'
import PrivateRoute from '../Components/PrivateRoute'
import ForgetPassword from "./ForgetPassword"
import Category from './Category'
import CreateListing from './CreateListing'
import Listing from "./Listing"
import Contact from './Contact'

const Rout = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/contact/:landlordId" element={<Contact />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/category/:categoryName/:listingId" element={<Listing />} />
        <Route path="/profile" element={<PrivateRoute />}>
           <Route path="/profile" element={<Profile />} />
        </Route>
    </Routes>
  )
}

export default Rout