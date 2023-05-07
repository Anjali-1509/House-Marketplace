import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import {BsFillEyeFill} from "react-icons/bs"
import { useState } from 'react'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import toast from "react-hot-toast"
import OAuth from '../Components/OAuth'


const Signin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name : "",
    email: "",
    password: ""
  })


  const { email, password} = formData

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))  
  }
   
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
       const auth = getAuth()
       const userCredential = await signInWithEmailAndPassword(auth, email, password)
       if(userCredential.user){
        navigate("/")
        toast.success("Logged In Successfully")
       }
    }
    catch(err){
      console.log(err.message)
      if(err.message === "Firebase: Error (auth/wrong-password).") {
        toast.error("Wrong Password")
      }
    }
  }
  return (
    <div className='main'>
      <div className='d-flex align-items-center justify-content-center w-50'>
        <form className="bg-light p-5" onSubmit={handleSubmit}>

        <h4 className="bg-dark p-2 mt-2 text-center text-light">SIGN IN</h4>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value= {email} onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type={showPassword ? "text" :"password"} className="form-control" id="password" value={password} onChange={onChange} />
            <span>
            Show Password 
            <BsFillEyeFill
             style={{cursor : "pointer"}}
             onClick={()=>{setShowPassword((prevState)=>!prevState)}}
             className='ms-2' />
            </span>
            <Link to="/forget-password">forgot password</Link>
          </div>
          
          <button type="submit" className="btn btn-primary">SIGN IN</button>
          <div className='mt-5'>
             <h6>Login With Google <OAuth /></h6>
            <span className='mt-2'>New User</span><Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
