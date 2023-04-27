import React from 'react'
import Rout from '../Pages/Rout'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <Rout />
        <main style={{minHeight:"70vh"}}>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout