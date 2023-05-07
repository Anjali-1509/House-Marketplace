import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from "react"
import toast from 'react-hot-toast'
import { db } from '../firebase.config'
import Spinner from '../Components/Spinner'
import ListingItem from '../Components/ListingItem'

const Offer = () => {
  const [listing, setListing] = useState("")
  const [loading, setLoading] = useState(true)
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("offer", "==", true),
          limit(10)
        );
        const querySnap = await getDocs(q);

        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        });
        setListing(listings)
        console.log(listing)
        setLoading(false)
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong In Fetching Data :(");
      }
    };

    fetchData()
  }, [])

  return (
    <div className="main category">
      <div>
        <h1>Best offers</h1>
        {
          loading ? <Spinner /> :
            listing && listing.length > 0 ? (
            <>
            <div>
               {
                listing.map((list)=>
                 <ListingItem id={list.id} listing={list.data}  key={list.id} />
               )}
            </div>
            </>
            ) :
              (<p>No offers available</p>)
        }
      </div>
    </div>
  )
}

export default Offer
