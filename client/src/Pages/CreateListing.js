import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from '../Components/Spinner'
import { useRef } from "react"
import { AiOutlineFileAdd } from "react-icons/ai"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref,  getDownloadURL, uploadBytesResumable } from "firebase/storage"
import {db} from "../firebase.config"
import {addDoc,collection,serverTimestamp} from "firebase/firestore"



export default function CreateListing() {
    const [loading, setLoading] = useState(false)
    const [geoLocationEnable, setGeoLocationEnable] = useState(false)
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0

    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                setFormData({
                    ...formData,
                    useRef: user.uid
                })
            })
        }
        else {
            navigate("/signin")
        }
    }, [auth, navigate])

    if (loading) {
        return <Spinner />
    }

    const onChangeHandler = (e) => {
        let boolean = null
        if (e.target.value === "true") {
            boolean = true
        }
        if (e.target.value === "false") {
            boolean = false
        }

        //Images
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }

        //text/booleans/number
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formData)

        if(discountedPrice >= regularPrice){
            setLoading(false)
            toast.error("Discount price should be less than regular price")
            return;
        }

        if(images>6){
            setLoading(false)
            toast.error("Max 6 images can be selected")
            return
        }

        //for images
        const storeImage = async (image) => {
         return new Promise((resolve, reject)=>{
            const storage = getStorage()
            const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
            const storageRef = ref(storage, "images/"+fileName)
            const uploadTask = uploadBytesResumable(storageRef,image)
            uploadTask.on("state-changed", (snapshot)=>{
                const progress =(snapshot.bytesTransferred / snapshot.totalBytes *100)
                console.log(`upload is ${progress} done`)
                switch(snapshot.state){
                    case "paused" :
                        console.log("upload is paused")
                        break;
                        case "running" : 
                         console.log("upload is running")
                }
            },
            (error)=>{reject(error)},

            //success
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{resolve(downloadURL)})
            }
            )
         })
        }
    
          const imgUrls = await Promise.all(
            [...images].map((image)=>storeImage(image))
          ).catch(()=>{
            setLoading(false)
            toast.error("Images Not Uploaded")
            return
        })
          console.log(imgUrls)

        const formDataCopy = {
        ...formData,
        imgUrls,
        timestamp:serverTimestamp()
        }

        formData.location = address
        delete formDataCopy.images
        !formDataCopy.offer && delete formDataCopy.discountedPrice
        const docRef = await addDoc(collection(db, "listings"), formDataCopy)
        setLoading(false)
        toast.success("Listing Created Successfully")
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    
    return (
        <div style={{ marginBottom: "500px" }} className="main category">
            <div className="container d-flex flex-column align-items-center justify-content-center mb-4  ">
                <div className="mt-3 w-50 bg-dark text-light p-2 text-center">
                    <h3>CREATE LISTING <AiOutlineFileAdd /></h3>
                </div>

                <form className="w-50 bg-light p-4" onSubmit={handleSubmit}>
                    <div className="d-flex flex-row mt-4">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                value="rent"
                                onChange={onChangeHandler}
                                defaultChecked
                                name="type"
                                id="type"
                            />
                            <label className="form-check-label" htmlFor="rent">Rent</label>
                        </div>
                        <div className="form-check ms-3">
                            <input
                                className="form-check-input"
                                type="radio"
                                value="sale"
                                onChange={onChangeHandler}
                                name="type"
                                id="type"
                            />
                            <label className="form-check-label" htmlFor="sale">Sale</label>
                        </div>
                    </div>

                    {/*name*/}
                    <div className="mb-3 mt-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" value={name} onChange={onChangeHandler} required aria-describedby="nameHelp" />
                    </div>

                    {/*bedroom*/}
                    <div className="mb-3 mt-4">
                        <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                        <input type="number" className="form-control" id="bedrooms" value={bedrooms} onChange={onChangeHandler} required aria-describedby="nameHelp" />
                    </div>

                    {/*bathroom*/}
                    <div className="mb-3 mt-4">
                        <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                        <input type="number" className="form-control" id="bathrooms" value={bathrooms} onChange={onChangeHandler} required />
                    </div>

                    {/*parking*/}
                    <div className="mb-3 mt-4">
                        <label htmlFor="parking" className="form-label">Parking</label>
                        <div className="d-flex flex-row">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={true}
                                    onChange={onChangeHandler}
                                    name="parking"
                                    id="parking"
                                />
                                <label htmlFor="yes" className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check ms-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={false}
                                    onChange={onChangeHandler}
                                    name="parking"
                                    defaultChecked
                                    id="parking"
                                />
                                <label htmlFor="no" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    {/*furnished*/}
                    <div className="mb-3 mt-4">
                        <label htmlFor="furnished" className="form-label">Furnished</label>
                        <div className="d-flex flex-row">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={true}
                                    onChange={onChangeHandler}
                                    name="furnished"
                                    id="furnished"
                                />
                                <label htmlFor="yes" className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check ms-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={false}
                                    onChange={onChangeHandler}
                                    name="furnished"
                                    defaultChecked
                                    id="furnished"
                                />
                                <label htmlFor="no" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>


                    {/*address*/}
                    <div className="mb-3 ">
                        <label htmlFor="address" className="form-label">Address :</label>
                        <textarea placeholder="Enter Your Address" className="form-control" id="address" value={address} onChange={onChangeHandler} required />
                    </div>

                    {/*geolocation*/}
                    {
                        !geoLocationEnable && (
                            <div className="mb-3">
                                <div className="d-flex flex-row">

                                    <div className="form-check">
                                        <label htmlFor="yes" className="form-label">Latitude :</label>
                                        <input type="number" className="form-control" id="latitude" name="latitude" value={latitude} onChange={onChangeHandler} />
                                    </div>

                                    <div className="form-check">
                                        <label htmlFor="no" className="form-label">Longitude :</label>
                                        <input type="number" className="form-control" id="longitude" name="longitude" value={longitude} onChange={onChangeHandler} />
                                    </div>
                                </div>
                            </div>
                        )}

                    {/*offer*/}
                    <div className="mb-3">
                        <label htmlFor="offer" className="form-label">Offer :</label>
                        <div className="d-flex flex-row">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="true"
                                    onChange={onChangeHandler}
                                    name="offer"
                                    id="offer"
                                />
                                <label htmlFor="yes" className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check ms-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="false"
                                    defaultChecked
                                    onChange={onChangeHandler}
                                    name="offer"
                                    id="offer"
                                />
                                <label htmlFor="no" className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    {/*regular price*/}
                    <div className="mb-3 mt-4">
                        <label htmlFor="name" className="form-label">Regular Price:</label>
                        <div className="d-flex flex-row">
                            <input
                                className="form-control w-50"
                                type="number"
                                value={regularPrice}
                                onChange={onChangeHandler}
                                name="regularPrice"
                                id="regularPrice"
                                required
                            />
                            {type === "rent" && <p className="ms-4 mt-2">$ / Month</p>}
                        </div>
                    </div>
                    {/*discounted price*/}
                    {
                        offer && (
                            <div className="mb-3 mt-4">
                                <label htmlFor="discountedPrice" className="form-label">Discounted Price:</label>
                                <input
                                    className="form-control w-50"
                                    type="number"
                                    value={discountedPrice}
                                    onChange={onChangeHandler}
                                    name="discountedPrice"
                                    id="discountedPrice"
                                    required
                                />
                            </div>

                        )}

                    {/*file images*/}
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Select Images:</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={onChangeHandler}
                            max="6" cd
                            accept=".jpg,.png,.jpeg"
                            multiple
                            name="images"
                            id="images"
                            required
                        />
                    </div>

                    {/*submit button*/}
                    <div className="mb-3">
                        <input
                            disabled={!name || !address || !regularPrice || !images}
                            className="btn btn-primary w-100"
                            type="submit"
                            value="Create-Listing"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}