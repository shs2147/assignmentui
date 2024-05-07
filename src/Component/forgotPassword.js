import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword(){

    const [loginData, setLoginData] = useState({
        userName: '',
        password: '',
        confirmPassword:''
    });
    const [responseData, setResponseData] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



 

    function handleSubmit(e){
        e.preventDefault();
       
            // Perform the POST request
            axios.post('http://localhost:8080/userData/forgotPassword', loginData)
                .then(response => {
                    // Handle success
                    console.log('Request successful:', response.data);
                    setResponseData(response.data);
                    // Optionally, perform any additional actions after the request is successful
                })
                .catch(error => {
                    // Handle error
                    console.error('Error:', error);
                    // Optionally, perform any additional actions after the request fails
                });
        
    }
    return <div className="form-container">
        <h2>Create New Password</h2>
     
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="userName" value={loginData.userName} onChange={handleChange} placeholder="Email" required />
            </div>
            <div className="form-group">
                <input type="userName" name="password" value={loginData.password} onChange={handleChange} placeholder="Enter Password" required />
            </div>
            <div className="form-group">
                <input type="password" name="confirmPassword" value={loginData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            </div>
            <div className="form-group">
                <button type="submit">Confirm</button>
            </div>
            <div> <Link to={"/"} style={{color:"white", textDecoration:"none"}}>Login</Link></div>
        </form>
        {responseData && (
                <div className="response-container">
                    <h3>Response from Server:</h3>
                    <p>{JSON.stringify(responseData)}</p>
                </div>
            )}
    </div>
}

export default ForgotPassword;