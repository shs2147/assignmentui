// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true); // State variable for tracking form type

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://diplomatic-ambition-production.up.railway.app/userData/login', loginData)
            .then(response => {
                console.log("Respons",response.data);
                if(response.data === "invalid credentials"){
                    setLoginError('Invalid email or password');
                }else {
                    localStorage.setItem("username", JSON.stringify(loginData.userName));
                    navigate("/incident")
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                setLoginError('Invalid email or password');
                alert("Error");
            });
    };

    const toggleForm = () => {
        setIsLoginForm(prevState => !prevState);
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {loginError && <p className="error-message">{loginError}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="userName" name="userName" value={loginData.userName} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
                <div>Don't Have an account ? <Link to={"/signup"} style={{color:"white", textDecoration:"none"}}>Sign up</Link></div>
                <div ><Link to={"/forgetPassword"} style={{color:"white", textDecoration:"none"}} >Forget Password ?</Link></div>
            </form>
        </div>
    );
};

export default LoginForm;
