'use client'
import { use } from 'react';

import RestaurantHeader from '@/app/_components/RestaurantHeader';
import { useRouter } from 'next/navigation';
import   { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

 const EditFoodItems =  (props) => {
    // console.log(props.params.id);
    
    const [foodName, setFoodName] = useState('')
    const [price, setPrice] = useState('')
    const [pathname, setPathname] = useState('')
    const [description, setDescription] = useState('')
    const[error, setError] = useState(false)
     const router = useRouter();

    const pfdata = {foodName, price, pathname, description}

    useEffect(()=>{
        handleLoadFoodItem();
    },[])

    const handleLoadFoodItem = async()=>{
       let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+props.params.id)
       response = await response.json();
       if(response.success){
        console.log(response.result)
        setFoodName(response.result.foodName),
        setPrice(response.result.price),
        setPathname(response.result.pathname),
        setDescription(response.result.description)
       }
    }

    const handleFoodItemUpdate = async(evt)=>{
     evt.preventDefault()
     console.log("data from local", pfdata)
     
     if(!foodName || !price || !pathname || !description){
      setError(true)
      return false
     }

     else{
      setError(false)
     }
      let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,{
            method:'PUT',
            body:JSON.stringify({foodName,price,img_path:pathname,description})
        });
        response = await response.json();
        if(response.success){
            router.push('/restaurant/dashboard')
        }else{
            alert("data is not updated please try again")
        }

    }
  return (
    <>
      <RestaurantHeader/>
<div className="inner-parts mt-5">
      <div className="container">
    <h1 className="mt-3 mb-3">Edit Food Items</h1>
    <form onSubmit={handleFoodItemUpdate}>
        <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Food Item Name"
                value={foodName}
                onChange={(evt)=>setFoodName(evt.target.value)}
              />
              {
               error && !foodName && <span className='inp-err'>Food Items Can't be left Blank</span>
              }
              
       </div>

       <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Price"
                value={price}
                onChange={(evt)=>setPrice(evt.target.value)}
              />

              {
               error && !price && <span className='inp-err'>Price Can't be left Blank</span>
              }
              
       </div>

       <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Image Path"
                value={pathname}
                onChange={(evt)=>setPathname(evt.target.value)}
              />
              {
               error && !pathname && <span className='inp-err'>Image Path Can't be left Blank</span>
              }
       </div>

       <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Description"
                value={description}
                onChange={(evt)=>setDescription(evt.target.value)}
              />
              {
               error && !description && <span className='inp-err'>Description Can't be left Blank</span>
              }
       </div>

        <button type="submit" className="btn btn-primary">
              Update
            </button>

              <button type="submit" className="ml-2 btn btn-primary" onClick={()=>router.push(`/restaurant/dashboard/`)}>
              Back
            </button>


    </form>
    </div>
    </div>
    </>
  )
}
export default EditFoodItems