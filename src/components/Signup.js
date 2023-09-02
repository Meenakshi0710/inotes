import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handleChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({name : credentials.name,email : credentials.email,password:credentials.password}) 
          });
          const json = await response.json();
          console.log(json);
          if(json.Success){
            //redirect
            localStorage.setItem('token',json.authToken);
            navigate("/");
            props.showAlert("Sign up Successfully","success");
        } else {
            props.showAlert("Invalid details","danger");
        }
          

    }
  return (
  <div className = "container mt-3">
  <h2>Create an account to use iNotes</h2>
      <form onSubmit = {handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name = "name" value = {credentials.name} onChange = {handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name = "email" value = {credentials.email}aria-describedby="emailHelp" onChange = {handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password1" className="form-label">Password</label>
    <input type="password" className="form-control" id="Password1" name = "password" value = {credentials.password} onChange = {handleChange} minLength = {5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="cPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cPassword1" name = "cpassword" onChange = {handleChange} minLength = {5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>);
}

export default Signup;
