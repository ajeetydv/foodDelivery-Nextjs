'use client'
import { useRouter } from "next/navigation";
import  { useState } from "react";
import { toast } from 'react-toastify';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async(evt)=>{
    evt.preventDefault();
    console.log(email, password)
    if(!email || !password){
        setError(true)
        return(false)
    }
    else{
      setError(false)
    }
     
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method:"POST",
      body:JSON.stringify({email, password, login:true})
    })

    response = await response.json()
    if(response.success){
      const {result} = response;
      delete result.password;
      localStorage.setItem("restraurantUser", JSON.stringify(result))
      toast.success('Logged in Successfully');
      router.push("/restaurant/dashboard")
    }
    
    else{
      toast.error('Logged details wrong');
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
                value={email}
                onChange={(evt)=>setEmail(evt.target.value)}
              />
              {
                error && !email && <span className="inp-err">Email Cant be Left Blank</span>
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
                error && !password && <span className="inp-err">Password Cant be Left Blank</span>
              }
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
       
    </>
  );
};
