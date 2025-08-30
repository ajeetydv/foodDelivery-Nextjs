'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


 const RestaurantHeader = () => {
    const [details,setDetails]=useState();
       const pathName=usePathname();

  const router = useRouter();
  useEffect(()=>{
    const data =   localStorage.getItem("restraurantUser")
    if(!data && pathName=="/restaurant/dashboard"){
      router.push("/restaurant")

    }

    else{
        setDetails(JSON.parse(data));
    }

  },[])
  const logout = ()=>{
    localStorage.removeItem("restraurantUser");
    router.push("/restaurant")
    
      toast.error('LoggedOut Sucessfully');
  }
  return (
    <>
       <div className='blackpart'>
             <div className='logo-left'>
                <img src='/burger-solid.svg' /> 
             </div>
             <ul className="fdbar-nav">
                 <li><Link href="/"><img src='/home.svg' /></Link></li>           
                 
                 {
                    details ?   
                  
                     <>
                 <li><Link href="/restaurant/dashboard"><img src='/signin.svg' /></Link></li>           
                 <li  onClick={logout}><img src='/logout.svg'/></li>
                 </>
     
                          
                 :  <>
                  <li><Link href="/restaurant"><img src='/key-solid.svg' /> </Link></li>
                   
                 </>    
                     
                  }

             </ul>
       </div>
       
    </>
  )
}

export default RestaurantHeader