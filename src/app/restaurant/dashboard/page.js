
"use client"
import AddFoodItems from "@/app/_components/AddFoodItems"
import FooditemList from "@/app/_components/FooditemList"
import RestaurantHeader from "@/app/_components/RestaurantHeader"
import { useState } from "react"


 const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)
  const[getRestoName ,setGetRestoName] = useState(JSON.parse(localStorage.getItem('restraurantUser')).restaurantName)

  return (
     
    <>
     <RestaurantHeader/>
     <div className="inner-parts mt-5">
      <div className="container">
        <div><button className="btn btn-info mr-3" onClick={()=>setAddItem(true)}>Add Food Items</button> 
        <button className="btn btn-info" onClick={()=>setAddItem(false)}>Dashboard</button></div>
        
        <div className="row">
           <div className="col-lg-12">
            {
              addItem ?
               <AddFoodItems setAddItem = {setAddItem}/> :
               <div className="dsh">
                  <h1 className="mt-3 mb-3">Dashboard </h1>
                  <h4 className="mt-3 mb-3">By Restro: {getRestoName}</h4>
                  <FooditemList/>
               </div>
             }
               
           </div>
        </div>
      </div>
      </div>
      
      </>
  )
}
export default Dashboard