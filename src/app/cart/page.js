'use client'
import { useState } from 'react'
import CustomersHeader from '../_components/CustomersHeader'
import { CGST, DELIVERY_CHARGES, SGST, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

const Cart = () => {
    const router = useRouter();
      const [removeCartData,setRemoveCartData]=useState()
      const [cartData, setCartData] = useState('')
       const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
      const[cartIds, setCartIds] = useState(cartStorage?()=>cartStorage.map((item)=>{
         return item._id;
    }
):[])
      
      const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))
    console.log(total)

    const removeFromCart=(id)=>{
 setRemoveCartData(id);
        var localIds=cartIds.filter(item=>item!=id);
        setCartData()
        setCartIds(localIds)
        
    }

    const placeOrder= ()=>{

         if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order')
        }else{
            router.push('/user?order=true')
        }
            
    }
    
  return (
    <>
         <CustomersHeader cartData={cartData}  removeCartData={removeCartData}/>

        <div className="main-serach text-center p-5">
         <div className=" text-center col-lg-8 mx-auto">
           <h1>Cart Page</h1>
    </div>
    </div>

    <div className="container">

        {/* {Array.length(0)? "Items avails" : "Items Not Avails"} */}
        <div className='row'>
        <div className='col-lg-8'>
        {
           cartStorage && cartStorage.map((item, key)=>(
                <div key={key} className="fooditmdetls">
                    <div className="row">
                        <div className="col-md-8">
                        <h5>{item.foodName}</h5>
                        
                        <p><b>info:</b> {item.description}</p>
                        
                                    <>
                                       <button className="ml-0 btn btn-danger"  onClick={()=>removeFromCart(item._id)}>Remove</button>
                                    </>
                       
                        </div>
                        <div className="col-md-2">
                            <p> {item.price}</p>
                        </div>
                        <div className="col-md-2">
                            <img src={item.pathname} alt="food-image"/>
                        </div>
                    </div>
                </div>
            )) 
        }
        </div>

          <div className="col-lg-4 total-wrapper">
               <div className="block-1">
               <div className="col-12">
                    <span>Food Charges : </span>
                    <span>{total}</span>
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
               <div className="col-12 block-2 mt-3">
                    <button className='btn btn-info' onClick={placeOrder}>Order Now</button>
                </div>
            </div>
            </div>
    </div>

    </>
  )
}


export default Cart