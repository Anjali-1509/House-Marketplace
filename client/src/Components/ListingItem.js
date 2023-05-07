import { Link } from "react-router-dom"
import {FaBed, FaBath} from "react-icons/fa"


export default function ListingItem({listing,id}){
    return (
        <div className="d-flex align-items-center justify-content-center">
           <div className="card" style={{width : '800px'}}>
              <Link style={{textDecoration:"none", color:"black"}} to={`/category/${listing.type}/${id}`}>
                 <div className="row container p-2">
                    <div className="col-md-6">
                       <img
                        src={listing.imgUrls[0]}
                        className="img-thumbnail"
                        alt={listing.name}
                        style={{height:"250px"}}
                        width={350}
                         />
                    </div>

                    <div className="col-md-5">
                        <p>{listing.location}</p>
                        <h2>{listing.name}</h2>
                        <p>
                        Rs : {""}
                        {
                            listing.offer ? listing.discountedPrice :
                            listing.regularPrice }{" "}
                            {listing.type==="rent" && "/ Month"}
                        </p>
                         <p>
                           <FaBed size={25} /> &nbsp;
                           {listing.bedrooms>1 ?
                            `${listing.bedrooms} Bedrooms`:
                            "1 Bedroom"
                            }
                         </p>

                         <p>
                           <FaBath size={25} /> &nbsp;
                           {listing.bathrooms>1 ?
                            `${listing.bathrooms} Bathrooms`:
                            "1 Bathroom"
                            }
                         </p>
                     </div>
                 </div>
              </Link>
           </div>
        </div>
    )
}