import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isUserLoggedInSelector } from "../auth/authselectors";
import CreatePost from "../blog/CreatePost";
import logo from '../../../assets/blog_3959542.png'

export default function NavigationBar() {
  const isUserLoggedIn = useSelector(isUserLoggedInSelector);

  return (
    <div className="navbar-container">
      <div className="left-container">
        <img
          src={logo}
          alt="logo" style={{height:'3rem' , width:'3rem' , marginTop:'.3rem'}}
        />
      </div>
      {isUserLoggedIn ? (
        <CreatePost />
      ) : (
        <div className="right-container">
          <NavLink to={{ pathname: "/signup" }} className="btn signup-btn">
            Signup
          </NavLink>
          <NavLink to={{ pathname: "/login" }} className="btn login-btn">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
}
