import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

 const FooditemList = () => {

    const[foodinfo, setFoodinfo] = useState()
    const router = useRouter();

    useEffect(()=>{
        loadFooditems();
    },[])

    const loadFooditems = async()=>{
        const restaurantData = JSON.parse( localStorage.getItem("restraurantUser"))
        const resto_id = restaurantData._id;
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`, {
            method:"GET",

        })

        response = await response.json();
        if(response.success){
            console.log("result on sucess",response.result)
            setFoodinfo(response.result);
        }

        else{
            console.log("food items not available");
        }
    }

    const deleteFooditems = async (id)=>{
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
            method:"DELETE",

        })

        response = await response.json();
        if(response.success){
                loadFooditems();
                toast.error('Deleted Food Items'); 
        }

        else{
                toast.error('Network Issue'); 
        }

    }

  return (
    <>

     {/* {foodinfo.length? "Food Availabe":"Not Available"}  */}

    <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Food Name</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Image</th>
      <th scope="col">Actions</th>

    </tr>
  </thead>
  <tbody>

  

    {
       foodinfo &&  foodinfo.map((item, key)=>(
           <tr key={key}>
      <th>{key+1}</th>
      <td>{item.foodName}</td>
      <td>{item.price}</td>
      <td>{item.description}</td>
      <td><img src={item.pathname}  style={{width:40}}/></td>
      <td>
        <button  className="btn btn-danger mr-2" onClick={()=>deleteFooditems(item._id)}>Delete</button>
        <button  className="btn btn-success" onClick={()=>router.push(`/restaurant/dashboard/${item._id}`)}>Edit</button>
      </td>
      

    </tr>
       )) 
    }
    
    
  </tbody>
</table>
    
    </>
  )
}

export default FooditemList