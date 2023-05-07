import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
   const navigate = useNavigate()

  return (
    <div>
      <div className='slide-container'>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://assets.architecturaldigest.in/photos/60083e76274aca243711c3a4/16:9/pass/ghaziabad-uttar-pradesh-homes-photos-1366x768.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <h1>category</h1>

      <div  style={{ height:"300px"}} className="container d-flex justify-content-center align-items-center mb-5">

        <div style={{height:"100%"}} className="row  d-flex justify-content-center align-items-center w-60">
          <div className='col-md-5 h-100 w-50'>
            <div  className="img-container">
              <img data-aos="fade-right"  src="https://www.clevergirlfinance.com/wp-content/uploads/2021/05/Buying-a-house-to-rent-out.jpg" alt="Snow" style={{ width: "100%" }} />
              <button onClick={()=>navigate("/category/rent")} className="btn">TO RENT</button>
            </div>
          </div>

          <div className='col-md-5 h-100 w-50'>
            <div className="img-container">
              <img data-aos="fade-left" src="https://cdn.pixabay.com/photo/2019/09/25/13/54/build-a-house-4503738__340.jpg" alt="Snow" style={{ width: "100%" }} />
              <button onClick={()=>navigate("/category/sale")} className="btn">TO SALE</button>
            </div>
          </div>
        </div>

      </div>

    </div>


  )
}

export default HomePage