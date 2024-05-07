import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignupSection.css";

function SignupSection(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(pass)) {
            setErrorMessage("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        try {
            const data = await axios.post("http://localhost:5555/createUser", {
                first: first,
                last: last,
                password: pass,
                email: email
            }, { withCredentials: true});
            const data2 = await axios.post("http://localhost:5555/login", {
                email: email,
                password: pass
            }, { withCredentials: true});
            navigate("/");
            navigate(0);
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div className="welcome">
                <h1>Welcome to Resonate.</h1>
                <p>Please enter your details.</p>
            </div>
            <div className="signup-container">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="text">First Name</label>
                        <input className="signup-input" type="text" id="first" value={first} onChange={(e) => setFirst(e.target.value)}/>
                        <label htmlFor="text">Last Name</label>
                        <input className="signup-input" type="text" id="last" value={last} onChange={(e) => setLast(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                        <input className="signup-input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input className="signup-input" type="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                        {errorMessage && <p className="error-message">{errorMessage}</p>} 
                        <button className="signup-btn" type="submit">Sign Up</button>
                    </form>
                    <button className="button-login" onClick={() => props.onFormSwitch("login")}>Already have an account? <span>Log in</span></button>
                </div>
            </div>
        </div>
    );
}

export default SignupSection;
