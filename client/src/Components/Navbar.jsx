import React from 'react'
import {GiHouse} from "react-icons/gi"
import {Link} from "react-router-dom"
import {FaUserAlt} from "react-icons/fa"
import {MdLocalOffer, MdTravelExplore} from "react-icons/md"

const Navbar = () => {
  return (
    <div>
        <div className="nav-container">

          <div style={{marginLeft:"20px"}}>
              <Link to="/"><h5><GiHouse size="35px" color="rgb(180,220,224)" /> FABER & CO
              <br/> REAL ESTATE</h5></Link>
          </div>
            
              
            <ul>
               <Link to="/offer"><li><MdLocalOffer color="rgb(180,220,224)" />
               <br/>OFFER</li></Link > 

               <Link><li><MdTravelExplore color="rgb(180,220,224)" />
               <br/>EXPLORE</li></Link>

               <Link to="/profile"><li><FaUserAlt color="rgb(180,220,224)" />
               <br/>PROFILE</li></Link>

            </ul>
          
        </div>
    </div>
  )
}

export default Navbar