'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

 const CustomersHeader = (props) => {
    const router = useRouter();
   const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
   const[cartNumber, setCartNumber] = useState(cartStorage?.length);
   const[cartItem, setCartItem] = useState(cartStorage);
   
   
   useEffect(()=>{
    
      if(props.cartData){
         console.log(props)
      if (cartNumber){
         if(cartItem[0].resto_id !=props.cartData.resto_id){
             localStorage.removeItem('cart');
             setCartNumber(1)
             setCartItem([props.cartData])
             localStorage.setItem('cart', JSON.stringify([props.cartData]))
             alert("You are taking order from other resto")
             
         }
         
         else{
          let localCartItem = cartItem
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
          setCartItem(localCartItem);
          setCartNumber(cartNumber+1)
          localStorage.setItem('cart', JSON.stringify(localCartItem))
         }
      }
      else{
         setCartNumber(1);
         setCartItem([props.cartData])
       localStorage.setItem('cart', JSON.stringify([props.cartData]))
      }
    
   }

   },[props.cartData])

   useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removeCartData
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem('cart')
            }
        }
    }, [props.removeCartData])

    useEffect(()=>{

        if(props.removeCartData){
            setCartItem([])
            setCartNumber(0);
            localStorage.removeItem('cart');
        }

    },[props.removeCartData])

    const logout = ()=>{
       localStorage.removeItem('user')
       router.push('/')
    }

  return (
    <>
    <div className='blackpart'>
             <div className='logo-left'>
                <img src='/burger-solid.svg' /> 
             </div>

            
              <ul className="fdbar-nav cstm">
                 <li><Link  href="/"><img src='/home.svg' /></Link></li> 
                 { userStorage? 
                 <>
                 
                  <li><Link href="/profile"><img src="/user-circle-solid.svg" /> <b>HI {userStorage?.name}</b></Link></li>
                 <li  onClick={logout}><img src='/power-off-solid.svg' /> <b >LOGOUT</b> </li>  
                 </>
                
                 :<li><Link href="/user"><img src='/power-off-solid.svg' /> <b>LOGIN</b> </Link></li>
                 }
          
                 <li className='cart-mgs'><Link href={cartNumber?"/cart":"#"}><img src='/cart-ic.svg' /><span>{(cartNumber? cartNumber: 0)}</span></Link></li> 
                 <li>
                    <Link href="/" ><img src='/utensils-solid.svg' /> <b> Add Restaurant</b></Link>
                </li>
                <li className='cart-mgs'>
                    <Link href="/deliverypartner" ><img src='/handshake-solid.svg' /> <b>Delivery Partner</b></Link>
                </li> 
             </ul>
    </div>

    </>
  )
}


export default CustomersHeader