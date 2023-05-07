import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getAuth, updateProfile } from "firebase/auth"
import toast from "react-hot-toast"
import { db } from "../firebase.config"
import { MdOutlineDoneAll } from 'react-icons/md'
import { BiEdit } from "react-icons/bi"
import { doc, updateDoc } from 'firebase/firestore'
import {BsFillArrowRightCircleFill} from "react-icons/bs"

const Profile = () => {
  const navigate = useNavigate()
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const handleLogout = () => {
    auth.signOut()
    toast.success("Successfully Logged Out")
    navigate("/")
  }

  const onChange= (e)=>{
     setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
     }))
  }


  const onSubmit = async() => {
   try{
    if(auth.currentUser.displayName !== name){
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      const useRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(useRef, {name})
      console.log("anjali")
      toast.success("User Updated Successfully")
    }
   }
   catch(err){
    console.log(err)
    toast.error("Something Went Wrong")
   }
  }

  return (
    <div className="main">
      <div className='conatiner w-50 d-flex justify-content-between'>
        <h4>Profile Details</h4>
        <button onClick={handleLogout} className='btn btn-danger'>LOGOUT</button>
      </div>


      <div className="container card" style={{ width: "18rem" }}>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <h5>User Personal Details</h5>
            <span style={{ cursor: 'pointer' }}
              onClick={() => { changeDetails && onSubmit(); setChangeDetails((prevState => !prevState)) }}
            >
              {changeDetails ? <MdOutlineDoneAll color='green' /> : <BiEdit color='red' />}
            </span>
          </div>
        </div>

        <div className="card-body">
          <form>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={onChange} disabled={!changeDetails}/>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={onChange} disabled={!changeDetails} />
            </div>

          </form>
        </div>
      </div>

      <div>
          <Link to="/create-listing">
             <BsFillArrowRightCircleFill /> Sell or Rent Your Home
          </Link>
        </div>
    </div>
  )
}

export default Profile