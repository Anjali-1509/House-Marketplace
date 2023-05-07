import React, { useEffect, useState } from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.config';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [message, setMessage]= useState("")
  const [landlord, setLandLord] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()

  useEffect(()=>{
    const getLandLord = async()=>{
     const docRef= doc(db, "users", params.landlordId)
     const docSnap = await getDoc(docRef)
     if(docSnap.exists()){
      setLandLord(docSnap.data())
      console.log(landlord)
     }
     else{
      toast.error("Unable to Fetch Data")
     }
    }
    getLandLord()
  }, [params.landlordId])
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-4">
      <h1>Contact</h1>
      <div>
        {
          landlord !== "" && (
            <main>
              <h4>{landlord?.name}</h4>
            </main>
          )
        }
      </div>
      </div>
      
    </div>
  )
}

export default Contact
