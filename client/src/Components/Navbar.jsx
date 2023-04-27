import React from 'react'
import {GiHouse} from "react-icons/gi"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div>
        <div className="nav-container">

          <div style={{marginLeft:"20px"}}>
              <h5><GiHouse size="35px" color="rgb(51,68,161)" /> FABER & CO
              <br/> REAL ESTATE</h5>
          </div>
            
              
            <ul>
               <Link><li>Login</li></Link> 
               <Link><li>signup</li></Link>
               <Link><li>home</li></Link>
            </ul>
          
        </div>
    </div>
  )
}

export default Navbar