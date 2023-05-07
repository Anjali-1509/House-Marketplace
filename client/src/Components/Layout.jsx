import React from 'react'
import Rout from '../Pages/Rout'
import Footer from './Footer'
import Navbar from './Navbar'
import toast, { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <Rout />
        <main style={{minHeight:"90vh"}}>
            {children}
            <Toaster />
        </main>
        <Footer />
    </div>
  )
}

export default Layout