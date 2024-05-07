// src/components/AuthToggle.js
import React from 'react';

const AuthToggle = ({ isLoginForm, toggleForm }) => {

    const buttonStyle = {
        backgroundColor: '#4CAF50', // Green
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '8px',
      };
    
      const hoverStyle = {
        backgroundColor: '#45a049', // Darker Green
      };

    return (
        <button style={buttonStyle}  onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor} onClick={toggleForm}>{isLoginForm ? "Sign Up" : "Login"}</button>
    );
};

export default AuthToggle;
 