import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/img/logo.png"; // Adjust path to your logo

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="nav-left">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="nav-right">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
        <NavLink className="nav-link" to="/signin">
          SignIn
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;