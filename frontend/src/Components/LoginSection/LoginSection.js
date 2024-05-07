import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "./LoginSection.css"

function LoginSection(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [incorrect, setIncorrect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("http://localhost:5555/login", {
                email: email,
                password: pass
            },
            { withCredentials: true});
            navigate("/");
            navigate(0);
            setIncorrect(false);
        }
        catch (error) {
            console.log(error);
            setIncorrect(true);
        }

    }

    return (
        <div>
            <div className="welcome">
                <h1>Welcome <br/> Back.</h1>
                <p>Please enter your details.</p>
            </div>
            {incorrect && (
                <div className='wrong-info'>
                    <p id="info-text">Incorrect email or password.</p>
                </div>
            )}
            <div className="login-container">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input className="login-input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input className="login-input" type="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                        <button className="signin-btn" type='submit'>Sign In</button>
                    </form>
                    <button className="signup-button" onClick={() => props.onFormSwitch("signup")}>Don't have an account? <span>Sign up</span></button>
                </div>
            </div>
        </div>

    );

}

export default LoginSection;