import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import toast from "react-hot-toast"
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgetPassword = () => {
 const [email, setEmail] = useState("")
 const navigate = useNavigate()

 const handleSubmit= async(e)=>{
  e.preventDefault()
  try{
   const auth = getAuth()
   await sendPasswordResetEmail(auth,email)
   toast.success("email has sent")
   navigate("/")
  }
  catch(err){
    console.log(err)
    toast.error("Something Went Wrong")
  }
 }


  return (
    <div className='main'>
    <div className="d-flex align-items-center justify-content-center w-50">
     
      <form className="bg-light p-5" onSubmit={handleSubmit}>
      <h4 className="bg-dark p-2 mt-2 text-center text-light">FORGET PASSWORD</h4>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={email} onChange={(e)=>setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">RESET</button>
        <Link to="/signin">Sign In</Link>
        </div>

      </form>
      </div>
    </div>
  )
}

export default ForgetPassword
