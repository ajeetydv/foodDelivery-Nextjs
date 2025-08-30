import { useRouter } from 'next/navigation'
import  { useEffect, useState } from 'react'

const UserSignUp = (props) => {
   
    const router = useRouter();
    const [sdata, setSdata] = useState({
        email:"",
        name:"",
        password:"",
        c_password:"",
        city:"",
        address:"",
        contact:""

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

    const handleSignup = async(evt)=>{
       evt.preventDefault();
       console.log("data from local", sdata)

       let response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            body: JSON.stringify({...sdata})
        })
        response = await response.json();

       if(response.success){
        const {result} = response;
        delete result.password;
        localStorage.setItem('user', JSON.stringify(result))
       if(props?.redirect?.order){
        router.push('/order')
        }
        else{
           router.push('/')
        }
        console.log("data after sucess",response.result);

       }
    }
  return (
    <>
     <form onSubmit={handleSignup}>
        <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your name"
                name="name"
                value={sdata.name}
                onChange={handleInput}
              />
              
            </div>

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

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="c_password"
                value={sdata.c_password}
                onChange={handleInput}
              />
              
            </div>

            

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                name="city"
                value={sdata.city}
                onChange={handleInput}
              />
              
            </div>

            <div className="form-group">
              <textarea className="form-control"
                placeholder="Enter full address"
                name="address"
                value={sdata.address}
                onChange={handleInput}>
                  
              </textarea>
              
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter contact No"
                name="contact"
                value={sdata.contact}
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

export default UserSignUp