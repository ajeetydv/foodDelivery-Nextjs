'use client'
import { useEffect, useState } from 'react'
import CustomersHeader from '../_components/CustomersHeader'
import { CGST, DELIVERY_CHARGES, SGST, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

const Order = () => {
      const router = useRouter();
      const [useStorage,setUserStorage] = useState( JSON.parse(localStorage.getItem('user')))
      const [removeCartData,setRemoveCartData]=useState(false)
      const [cartData, setCartData] = useState('')
       const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
      const[cartIds, setCartIds] = useState(cartStorage?()=>cartStorage?.map((item)=>{
         return item._id;
    }
):[])
      
      const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))
    console.log(total)

    useEffect(()=>{
            if(!total){
                router.push('/')
            }
       },[total])

    const orderNow = async()=>{
       let user_id = JSON.parse(localStorage.getItem('user'))._id
       let cart = JSON.parse(localStorage.getItem('cart'))
       let foodItemIds = cart.map((item)=>item._id).toString();
       let resto_id = cart[0].resto_id;
       let deliveryBoy_id = "687652943052edc7a7daa6d9";

       let collection = {
         user_id,
         resto_id,
         foodItemIds,
         deliveryBoy_id,
         status:"confirm",
         amount: (total)+DELIVERY_CHARGES+(total*CGST/100)+(total*SGST/100)
        }
       console.log(collection)

       let response = await fetch("http://localhost:3000/api/order",{
        method:"POST",
        body:JSON.stringify(collection)
       })

       response = await response.json()
       if(response.success){
        console.log(response.result)
        alert("order processed successfully")
        setRemoveCartData(true)
        router.push('/profile')
       }

       

    }
    
  return (
    <>
         <CustomersHeader cartData={cartData}  removeCartData={removeCartData}/>

        <div className="main-serach text-center p-5">
         <div className=" text-center col-lg-8 mx-auto">
           <h1>Order Now</h1>
    </div>
    </div>

    <div className="container">

        {/* {Array.length(0)? "Items avails" : "Items Not Avails"} */}
       
        

          <div className="col-lg-12 total-wrapper">
             <div className='row'>
               <div className="col-lg-8 block-1">
                <div className="col-12">
                    <h3>User Details:</h3>
                </div>
               <div className="col-12">
                    <span>UserName : </span>
                    <span>{useStorage.name}</span>
                </div>

                <div className="col-12">
                    <span>Address : </span>
                    <span>{useStorage.address}</span>
                </div>

                <div className="col-12">
                    <span>Contact : </span>
                    <span>{useStorage.contact}</span>
                </div>

                 <div className="col-12 mt-4">
                    <h3>Total Bill:</h3>
                </div>

                <div className="col-12">
                    <span>CGST : </span>
                    <span>{total*CGST/100}</span>
                </div>

                <div className="col-12">
                    <span>SGST : </span>
                    <span>{total*SGST/100}</span>
                </div>
                <div className="col-12">
                    <span>Delivery Charges  : </span>
                    <span>{DELIVERY_CHARGES}</span>
                </div>

            
                <div className="col-12">
                    <span>Total Amount : </span>
                    <span>{total+DELIVERY_CHARGES+(total*CGST/100)+(total*SGST/100)}</span>
                </div>

                 
               </div>
               <div className="col-lg-4 block-2 mt-3">
                 <div className="col-12 mt-4">
                    <h3>PAYMENT MODE</h3>
                </div>

                 <div className="col-12">
                    <span><b>Payment via </b>: </span>
                    <span>CASH ON DELIVERY</span>
                </div>

                <div className="col-12 mt-5">
                    <button className='btn btn-info' onClick={orderNow}>Place Order</button>
                </div>
                
                    
                </div>
            </div>
            </div>
    </div>

    </>
  )
}


export default Order