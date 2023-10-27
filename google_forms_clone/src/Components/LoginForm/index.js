import React from "react";
import G_Logo from "../../images/Google__G__Logo.svg.webp";
import "./index.css";

const Login = () => {
    return (
        <div className="google-login-page">
            <div className="overlap-group-wrapper">
               <img src={G_Logo} alt="G Logo" className="g-logo"/>
               <div className="con">
                <h4 className="sign-in-heading">Sign in with your Account</h4>
                <div className="input-container">
                    <div className="inputBox">
                        <input type="text" required="required" />
                        <span >First Name</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" required="required" />
                        <span >First Name</span>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Login