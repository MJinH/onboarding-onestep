import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "./About.css";
import BackgroundImage from "../../assets/img/about.png"; // Adjust the path to your background image

const About = () => {
  return (
    <div
      className="about-container"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        // import Logo from "../../assets/img/logoBlue.png";
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {/* Home Icon */}
      <div className="home-icon">
        <Link to="/">
          <HomeOutlined style={{ fontSize: "24px", color: "#fff" }} />
          <span className="home-text">Home</span>
        </Link>
      </div>

      <div className="about-content">
        <h1>About Our Portal</h1>
        <p>
          The employee onboarding process is often a time-consuming and
          stressful experience for both new hires and HR teams. New employees
          are typically required to navigate through multiple applications,
          submit personal information, fill out numerous forms, and comply with
          various administrative procedures before they can begin their work.
          This can be overwhelming and draining, especially as they are trying
          to familiarize themselves with their new role and work environment.
        </p>
        <p>
          From the HR side, collecting, verifying, and processing this
          information often leads to delays in provisioning access, issuing
          equipment, and preparing essential materials, which slows down the
          employee's integration into the organization.
        </p>
        <p>
          This project seeks to address these pain points by developing an
          integrated Onboarding Portal that simplifies, automates, and
          accelerates the entire onboarding process. The portal is going to be
          designed to reduce the administrative burden on both new employees
          and HR teams by providing a centralized platform for managing all
          onboarding tasks. New hires can update their personal information,
          upload required documents, and complete necessary forms before their
          start date. This allows the HR team to review and verify the
          information in advance, ensuring that all data is accurate and
          complete well before the employee’s first day.
        </p>
      </div>
    </div>
  );
};

export default About;