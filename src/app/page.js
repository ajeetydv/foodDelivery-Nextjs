
'use client'

import { useEffect, useState } from "react"
import CustomersHeader from "./_components/CustomersHeader"
import { useRouter } from "next/navigation"


 const home = () => {
  const [locations, setLocations] = useState('');
  const [selectLocation, setSelectLocation] = useState();
  const [showLocation, setShowLocation] = useState(false);
  const[showRestaurant, setshowRestaurant] = useState('')

  const router = useRouter();
  useEffect(()=>{
     loadLocations();
     loadRestaurants();
  },[])



  const loadLocations = async () =>{
    let response = await fetch("http://localhost:3000/api/customers/locations")
    response = await response.json()
    if(response.success){
         setLocations(response.result);
     
    }
        console.log(response)
  }

  const handleListItems = async (item)=>{
     setSelectLocation(item)
      setShowLocation(false)
      loadRestaurants({location:item})
  }

  const loadRestaurants = async(params)=>{
    let url = "http://localhost:3000/api/customers"
    if(params?.location){
      url=url+"?location="+params.location
      console.log("result of location url",url)
    }
    else if (params?.restaurant){
      url=url+"?restaurant="+params.restaurant
      console.log("result of restraunt url",url)
    }

    // else if (params?.restaurant + params?.location){
    //   console.log("Match nahi hua")
    //   url=url+"?location="+params.location+"&&"+"?restaurant="+params.restaurant;
    //   console.log("url after res",url)
    // }

     let response = await fetch(url)
     response = await response.json()
     console.log("list of restaurant",response)
     if(response.success){
        setshowRestaurant(response.result);
     }
  }

  return (
    <>
      <CustomersHeader/>
       <div className="main-serach text-center p-5">
         <div className=" text-center col-lg-8 mx-auto">
          <div className="row">
              <div className="col-md-2 p-0 position-relative">
                <input type="text" 
                value={selectLocation}
                onClick={() => setShowLocation(true)}
                className="form-control  select-input col" placeholder="Select Place" />
                <ul className="lc-lists">
                  {
                    showLocation && locations.map((item,key)=>
                      (
                     <li onClick={()=>handleListItems(item)} key={key}>{item}</li>
                      ))
                 
                  }
                </ul>
              </div>
              <div className="col-md-10 p-0">
                <input type="text" className="form-control search-input col" 
                placeholder="Enter food or restaurant name" 
                onChange={(evt)=>loadRestaurants({restaurant:evt.target.value})} />
              </div>
          </div>
          </div>
      </div>

      <div className="showrest-infos">
        <div className="container-fluid">
          
            {
              showRestaurant && showRestaurant.map((item, key)=>(
                // <div key={key} className="col-lg-12 crds-set mx-auto" onClick={()=>router.push(`/explore/${item.restaurantName}?id=${item._id}`)}>
                
                 <div key={key} className="col-lg-12 crds-set mx-auto" onClick={()=>router.push('explore/'+item.restaurantName+"?id="+item._id)}>
                <h2>{item.restaurantName}</h2>
                <h3><b>City</b>:{item.city}</h3>
                <h3><b>Contact</b>:{item.contact}</h3>
                <p>About:{item.address}</p>
                </div>
              ))
              
            }

          
        </div>

      </div>

      <div className="mid-comp frnt-pgs">
       <div className="container text-center">
          <img src="./samosa.png" alt="home"/>
          <img src="./rasgulla.png" alt="gulla" className="rghts-itms"/>
            <h1 className="strks">Food Delivery App</h1>
       </div>
      </div>
    </>
  )
}
export default home