import React, { useState } from 'react'
import "./SignupSection.css"

function SignupSection(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className = "signup-container">
      <div className="welcome">
                <h1>Welcome to Resonate.</h1>
                <p>Please enter your details</p>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="text">First Name</label>
                    <input type="text" id="first"/>
                    <label htmlFor="text">Last Name</label>
                    <input type="text" id="last"/>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                    <button type="submit">Sign In</button>
                </form>
                <button onClick={() => props.onFormSwitch("login")}>Already have an account? Log in</button>
            </div>
    </div>
  )
}

export default SignupSection
