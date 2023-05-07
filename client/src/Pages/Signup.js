import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import {BsFillEyeFill} from "react-icons/bs"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {db} from "../firebase.config"
import toast from "react-hot-toast"
import {doc, setDoc, serverTimestamp} from "firebase/firestore"
import OAuth from '../Components/OAuth'


const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name : "",
    email: "",
    password: ""
  })


  const {name, email, password} = formData

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

 const handleSubmit = async(e)=>{
  e.preventDefault()
  try{
   const auth = getAuth()
   const userCredential = await createUserWithEmailAndPassword(auth, email, password)
   const user = userCredential.user
   updateProfile(auth.currentUser, {displayName: name})
   const formDataCopy = {...formData}
   delete formDataCopy.password
   formDataCopy.timeStamp = serverTimestamp()
   await setDoc(doc(db, "users", user.uid), formDataCopy)
   navigate("/")
   toast.success("Signed Up Successfully")
  }
  catch(err){
    console.log(err)
  }
 }

  return (
    <div className='main'>
      <div className='d-flex align-items-center justify-content-center w-50'>
        <form className="bg-light p-5" onSubmit={handleSubmit}>

        <h4 className="bg-dark p-2 mt-2 text-center text-light">SIGN UP</h4>

        <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={onChange} />
          </div>

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
          </div>
          
          <button type="submit" className="btn btn-primary">SIGN UP</button>
          <div>
            <h6>Login With Google <OAuth /></h6>

            <span>Already a User</span><Link to="/signin">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
