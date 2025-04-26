import React, { useState } from "react";
import "./auth.scss";
import Button from "../../components/button/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signupSelector } from "./authselectors.js";
import { signupMiddleware } from "./authmiddleware.js";
import { ApiStatus } from "../../network/ApiStatus.js";

export default function Signup() {
  const dispatch = useDispatch();
  const { errorMessage, apiStatus } = useSelector(signupSelector);

  const onSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form["username"].value,
      password: form["password"].value,
      email: form["email"].value,
      gender: form["gender"].value?.toUpperCase(),
    };
    dispatch(signupMiddleware(formData));
  };

  return (
    <div className="auth-container">
      <form className="form signup-form" onSubmit={onSignup}  style={{border:'1px solid #7D81E7'}}>
        <input name="username" placeholder="Username" required style={{border:'1px solid #7D81E7', borderRadius:'5px'}}/>
        <input name="email" type="email" placeholder="Email" required style={{border:'1px solid #7D81E7', borderRadius:'5px'}}/>
        <input name="password" placeholder="Password" required style={{border:'1px solid #7D81E7', borderRadius:'5px'}}/>
        <div>
          <label htmlFor="male">Male</label>
          <input name="gender" type="radio" value="male" id="male" required style={{border:'1px solid #7D81E7', borderRadius:'5px'}}/>
        </div>

        <div>
          <label htmlFor="female">Female</label>
          <input
            name="gender"
            type="radio"
            value="female"
            id="female"
            required
            style={{border:'1px solid #7D81E7', borderRadius:'5px'}}
          />
        </div>

        <Button text="Signup" isLoading={apiStatus === ApiStatus.pending} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
