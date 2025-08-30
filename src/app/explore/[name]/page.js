'use client'

import CustomersHeader from "@/app/_components/CustomersHeader";
import { useEffect, useState } from "react";
import { use } from 'react';



 const page = (props) => {
    const [restroDetails, setRestroDetails] = useState('')
    const[foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState('')
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const[cartIds, setCartIds] = useState(cartStorage?()=>cartStorage.map((item)=>{
         return item._id;
    }
):[])
console.log("return collected id", cartIds)
    //  const name = props.params.name;
    const [removeCartData,setRemoveCartData]=useState()
    
    useEffect(()=>{
        loadRestoDetails();
    },[])

    const loadRestoDetails = async ()=>{
        const id = props.searchParams.id;
        console.log("ddd", id)
        let response = await fetch(`http://localhost:3000/api/customers/${id}`)
        response = await response.json()
        console.log("response from loadrestdetails",response)
        if(response.success){
            setRestroDetails(response.details)
            setFoodItems(response.fooditems);
        }
    }

    const addToCart = (item)=>{
        let localCartIds=cartIds;
        localCartIds.push(item._id)
        setCartIds(localCartIds)
        console.log("Collection of cart id", localCartIds)
        setCartData(item)
        setRemoveCartData()
    }

     const removeFromCart=(id)=>{
 setRemoveCartData(id);
        var localIds=cartIds.filter(item=>item!=id);
        setCartData()
        setCartIds(localIds)
        
    }

    

  return (
    <>
    <CustomersHeader cartData={cartData}  removeCartData={removeCartData}/>
     <div className="main-serach text-center p-5">
         <div className=" text-center col-lg-8 mx-auto">
           <h1>{restroDetails?.restaurantName}</h1>
    </div>
    </div>

    <div className="container">
        <h3>{restroDetails?.contact}</h3>
        <h4>{restroDetails?.city}</h4>
        <h4>{restroDetails?.email}</h4>
        <h4>{restroDetails?.address}</h4>
    </div>

    <div className="container">

        {/* {Array.length(0)? "Items avails" : "Items Not Avails"} */}
        {
           foodItems && foodItems.map((item, key)=>(
                <div key={key} className="col-lg-12 fooditmdetls">
                    <div className="row">
                        <div className="col-md-10">
                        <h5>{item.foodName}</h5>
                        <p>{item.price}</p>
                        <p><b>info:</b> {item.description}</p>
                         {
                                    cartIds.includes(item._id) ?
                                    
                                    
                                    <button className="ml-3 btn btn-danger"  onClick={()=>removeFromCart(item._id)}>Remove</button>
                                                        :<button type="button" onClick={()=>addToCart(item)} className="btn btn-success">Add to Cart</button>
    
                        }
                        </div>
                        <div className="col-md-2">
                            <img src={item.pathname} alt="food-image"/>
                        </div>
                    </div>
                </div>
            )) 
        }
    </div>
    </>
    
  )
}

export default page;