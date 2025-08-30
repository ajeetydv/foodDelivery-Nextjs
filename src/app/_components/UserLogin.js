import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

 const UserLogin = (props) => {

    const router = useRouter();
     const [sdata, setSdata] = useState({
            email:"",
            password:"",
           
        })
    
        // lets tackle our handleInput
      const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setSdata({
          ...sdata,
          [name]: value,
        });
      };

    const handleLogin = async(e)=>{
      e.preventDefault()
       console.log("data from local", sdata)
       let response = await fetch('http://localhost:3000/api/user/login',{
        method:'POST',
        body:JSON.stringify({...sdata})
       })

       response =  await response.json()
       if(response.success){
        alert("Login Ho gaya")
        const {result} = response
        delete result.password
        localStorage.setItem('user', JSON.stringify(result))
        if(props?.redirect?.order){
        router.push('/order')
        }
        else{
           router.push('/')
        }
      }

       else{
        alert("Galat creds")
       }

    }
  return (
    <>
     <form onSubmit={handleLogin}>
        

      <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                 name="email"
                value={sdata.email}
                onChange={handleInput}
              />
              
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={sdata.password}
                onChange={handleInput}
              />
              

            </div>

           

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

    </>
  )
}

 export default UserLogin