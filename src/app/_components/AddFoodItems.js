import React, { useState } from 'react'
import { toast } from 'react-toastify';

 const AddFoodItems = (props) => {
    const [foodName, setFoodName] = useState('')
    const [price, setPrice] = useState('')
    const [pathname, setPathname] = useState('')
    const [description, setDescription] = useState('')
    const[error, setError] = useState(false)

    const pfdata = {foodName, price, pathname, description}

    const handleFoodItem = async(evt)=>{
     evt.preventDefault()
     console.log("data from local", pfdata)
     
     if(!foodName || !price || !pathname || !description){
      setError(true)
      return false
     }

     else{
      setError(false)
     }

     let resto_id ;
       const restroData = JSON.parse(localStorage.getItem("restraurantUser"))
      if(restroData){
         resto_id = restroData._id
      }
     let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method:"POST",
      body:JSON.stringify({foodName, price, pathname, description, resto_id})
     })
     
     response = await response.json();
     if(response.success){
        toast.success('Food Item Added Successfully');
        props.setAddItem(false)
     }

    }
  return (
    <>
    <h1 className="mt-3 mb-3">Add Food Items</h1>
    <form onSubmit={handleFoodItem}>
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
              Submit
            </button>


    </form>
    </>
  )
}
export default AddFoodItems