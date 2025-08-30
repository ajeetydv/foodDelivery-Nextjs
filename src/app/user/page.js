'use client'

import React, { useState } from 'react'
import CustomersHeader from '../_components/CustomersHeader'
import UserSignUp from '../_components/UserSignUp'
import UserLogin from '../_components/UserLogin'

 const User = (props) => {
   const [login, setLogin] = useState(true)
   console.log("order flag",props)
  return (
    <>
    <CustomersHeader/>
     <div className="mid-comp">
    <div className='container mt-5'>
       {
                      login ?  <UserLogin redirect={props.searchParams}/>  : <UserSignUp redirect={props.searchParams}/>
                  }
   <div className="col-lg-12 mxauto text-center mt-3">
                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                </button>
            </div> 
    
    </div>
    </div>
    </>
  )
}

export default User