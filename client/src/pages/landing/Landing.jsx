import React from "react";
import Navbar from "../../components/navbar/Navbar";
// import LandingImage from "../../assets/img/bg1.jpg";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="LandingContainer">
      <Navbar />
      <div className="heroSection">
        {/* <h1></h1> */}
        <h1>Welcome Onboard</h1>
        <p>
          Let's make this onboarding process quick and effortless. Complete your uploads, finish the documentation, and get back to what matters most — your exciting journey ahead!
        </p>
        <button className="cta-button" ><Link to="/signin">Get Started</Link></button>
      </div>
    </div>
  );
};

export default Landing;