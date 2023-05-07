import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../firebase.config"
import Spinner from "../Components/Spinner"

export default function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.listingId])

  if(loading){
    return <Spinner />
  }
  return (
    <div className="main category">
      <div className="container d-flex align-items-center justify-content-center mt-4">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
             <h3>{listing.name}</h3>
             <h6>Price : {""} 
             {listing.offer ? listing.discountedPrice : listing.regularPrice} /Rs
             </h6>
             <p>Property For {listing.type==="rent"? "Rent" : "Sale"}</p>
             <p>
              {listing.offer && (
                <span>
                  {listing.regularPrice-listing.discountedPrice} Discount
                </span>
              )}
             </p>
             <p> {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : " 1 Bedroom"}</p>
             <p> {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : " 1 Bathroom"}</p>
             <p> {listing.parking ? "Parking Spot" : "No Parking Spot"}</p>
             <p> {listing.furnished ? "Furnished House" : "Not Furnished"}</p>
             <Link className="btn btn-primary" to={`/contact/${listing.useRef}?listingName=${listing.name}`}>
               Contact Landlord
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}