'use client'

import { useState } from "react"
import { Login } from "../_components/Login"
import { Register } from "../_components/Register"
import  RestaurantHeader  from "../_components/RestaurantHeader"


 const restaurant = () => {
  const [login, setLogin] = useState(true)
  return (
    <>
    <RestaurantHeader /> 
    <div className="mid-comp">
       <div className="container">
         <h1 className="mn-hds text-center">Restaurant Login/Signup Page</h1>
         <div className="row">

        
         <div className="col-lg-6 mx-auto text-center">

         </div>
         <div className="col-lg-6 mx-auto text-center">
             {
                login ? <Login/> : <Register/>
            }
            <div className="col-lg-12 mxauto text-center mt-3">
                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                </button>
            </div> 

         </div>
           

            
            </div>    
       </div>
       </div>
    </>
  )
}

export default restaurant