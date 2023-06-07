import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate= useNavigate();
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        fetch("")
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
          
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({email: credentials.email ,password:credentials.password}), 
          });
          const json= await response.json();
          console.log(json);
          if (json.success){
            //save the authtoken & redirect to Home Page
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Logged in successfully","success")
            navigate("/");
          }

          else{

            props.showAlert("Invalid Credentials", "danger");
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="mt-3">
      <h2>Login to NoteSpace</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label mt-3">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange}  value={credentials.email} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="password"/>
  </div>
  
  <button type="submit" className="btn btn-success" >Submit</button>
</form>
    </div>
  )
}

export default Login