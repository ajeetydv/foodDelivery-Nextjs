'use client'
import React, { useEffect, useState } from 'react'
import CustomersHeader from '../_components/CustomersHeader'

const Profile = () => {
    const [myOrders, setMyOrders] = useState('')
    useEffect(()=>{
         getMyOrders();
    },[])
    const getMyOrders = async()=>{
        const userStorage = JSON.parse(localStorage.getItem('user'))
        let response = await fetch("http://localhost:3000/api/order?id="+userStorage._id)

        response = await response.json()
        if(response.success){
            const {result} = response
        delete result.password;
            setMyOrders(response.result)
            
        }


    }
            console.log("response from my order", myOrders)


  return (
    <>
    <CustomersHeader/>
    <div className="main-serach text-center p-5">
         <div className=" text-center col-lg-8 mx-auto">
           <h1>Profile Page</h1>
    </div>
    </div>

     <div className="container">
        {
            myOrders?.length>0?  myOrders?.map((item, id)=>

                <div className='col-12 mb-4 card-dark text-black' key={id}>
                    <h3><b>Order From Restaurant:-</b> {item.data.restaurantName}</h3>
                     <h4><b>Order Total:-</b> {item.amount}</h4>
                     <h4><b>Address:-</b> {item.data.address}</h4>
                     <h5><b>Order Status:-</b> {item.status}</h5>
                    </div>
            ):<h3 className='text-center'>No Orders Done</h3>
        }
     </div>


    
    </>
  )
}

export default Profile