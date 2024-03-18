import React, { useState } from 'react'
import "./LoginSection.css"

function LoginSection(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div>
            <div className="welcome">
                <h1>Welcome Back.</h1>
                <p>Please enter your details</p>
            </div>
            <div className="login-container">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"/>
                        <button type="submit">Sign In</button>
                    </form>
                    <button className="signup-button" onClick={() => props.onFormSwitch("signup")}>Don't have an account? Sign up</button>
                </div>
            </div>
        </div>

    );

}

export default LoginSection;