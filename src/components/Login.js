import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";



const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
     
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({email : credentials.email,password:credentials.password}) 
          });
          const json = await response.json();
          console.log(json);
          if(json.Success){
              //redirect
              localStorage.setItem('token',json.authToken);
              navigate("/");
              props.showAlert("Logged in Successfully","success")
          } else {
            props.showAlert("Invalid cedentials","danger")
          }

    }
  return (
    <>
    <div className='mt-3'>
    <h2>Login to use iNotes</h2>
  
    <form onSubmit = {handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name = "email" value = {credentials.email} onChange = {handleChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name = "password" value = {credentials.password} onChange = {handleChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  </div>
  </>);
  
}

export default Login;
