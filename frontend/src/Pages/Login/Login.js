import React, { useState } from "react";
import LoginSection from "../../Components/LoginSection/LoginSection"
import SignupSection from "../../Components/SignupSection/SignupSection"
import "./Login.css"

function Login() {
    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    
    return (
        <div className="login-signup-container">
            {
                currentForm === "login" ? (
                <LoginSection onFormSwitch={toggleForm} />
                ) : (
                <SignupSection onFormSwitch={toggleForm} />
            )}
        </div>
    );

}

export default Login;