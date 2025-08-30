'use client'

import { useRouter } from 'next/navigation';
import  { useState } from 'react'
import { toast } from 'react-toastify';
export const Register = () => {

  const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [c_password,setC_password]=useState('');
    const [restaurantName,setrestaurantName]=useState('');
    const [city,setcity]=useState('');
    const [address,setAddress]=useState('');
    const [contact,setContact]=useState('');
    const router = useRouter();

    const [error,setError]=useState(false);
    const [passwordError,setPasswordError]=useState(false)
    

    const pload = {email,password, c_password, restaurantName, city, address, contact}

    const handleSignup= async(evt)=>{
      evt.preventDefault()
      if(password!==c_password){
          setPasswordError(true)
          return false
      }

      else{
        setPasswordError(false)
      }

      if(!email || !restaurantName || !password || !c_password || !city || !address || !contact){
        setError(true)
        return false
      }

      else{
        setError(false)
      }

      console.log("data in local", pload)

      let response = await fetch("http://localhost:3000/api/restaurant", {
        method:"POST",
        body: JSON.stringify({...pload})
        
      })

      response = await response.json()
     console.log("response after sucess post",response)

     if(response.success){
      
       console.log(response)
       const {result} =response; 
       delete result.password;
       localStorage.setItem("restraurantUser", JSON.stringify(result));
       router.push("/restaurant/dashboard")
        toast.success('Restaurant Created Successfully');
     }

    //  else{
    //   toast.error('Some Issue in Registration');
    //  }
    
    }

  return (
    <>
    <form onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(evt)=>setEmail(evt.target.value)}
              />
              {
                error && !email && <span className='inp-err'>Email Can't be left blank</span>
              }
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(evt)=>setPassword(evt.target.value)}
              />
              {
                passwordError && <span className='inp-err'>Password and Confirm Password not match</span>
              }

              {
                error && !password && <span className='inp-err'>Password Can't be left blank</span>
              }

            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={c_password}
                onChange={(evt)=>setC_password(evt.target.value)}
              />
              {
                passwordError && <span className='inp-err'>Password and Confirm Password not match</span>
              }

              {
                error && !c_password && <span className='inp-err'>Confirm password Can't be left blank</span>
              }
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter restaurant name"
                value={restaurantName}
                onChange={(evt)=>setrestaurantName(evt.target.value)}
              />
              {
                error && !restaurantName && <span className='inp-err'>Restaurant name Can't be left blank</span>
              }
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                value={city}
                onChange={(evt)=>setcity(evt.target.value)}
              />
              {
                error && !city && <span className='inp-err'>City Can't be left blank</span>
              }
            </div>

            <div className="form-group">
              <textarea className="form-control"
                placeholder="Enter full address" value={address}
                onChange={(evt)=>setAddress(evt.target.value)}>
                  
              </textarea>
              {
                error && !address && <span className='inp-err'>Address Can't be left blank</span>
              }
              
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter contact No"
                value={contact}
                onChange={(evt)=>setContact(evt.target.value)}
              />
              {
                error && !contact && <span className='inp-err'>Contact name Can't be left blank</span>
              }
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
    
    </>
  )
}
