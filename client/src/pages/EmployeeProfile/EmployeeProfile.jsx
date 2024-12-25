import React, { useState } from "react";
import "./EmployeeProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../components/sidebar/SideBar";

const EmployeeProfile = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    profilePic: "https://via.placeholder.com/150", // Placeholder image
    email: "nagalakshmigurrala17@gmail.com",
    phoneNumber: "+1 (408)2101159",
    hireDate: "2014-05-17",
    workedFor: "10 years, 2 months",
    location: "United States",
    employmentType: "Full-time",
    manager: "Dieo",
    employeeId: "019326127",
    status: "Active",
    gender: "Female",
    firstName: "Naga Lakshmi",
    middleName: "",
    lastName: "Gurrala",
    socialStatus: "Unmarried",
    dob: "1991-05-17",
    age: "30",
    addressLine1: "817N",
    addressLine2: "San Jose",
    addressLine3: "",
    city: "San Jose",
    state: "CA",
    postalCode: "95112",
    country: "United States",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmployeeDetails((prevDetails) => ({
          ...prevDetails,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Employee details saved:", employeeDetails);
    // Add backend API logic here
  };

  return (
    <>
    <SideBar/>
    <div className="employee-landing-container">
      <div className="profile-header">
        <div className="profile-section">
          
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "100px", color: "#555" }} />
         
         
        </div>
      </div>

      <div className="employee-content">
        <h2>Personal</h2>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={employeeDetails.employeeId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={employeeDetails.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={employeeDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={employeeDetails.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employeeDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={employeeDetails.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Social Status</label>
              <input
                type="text"
                name="socialStatus"
                value={employeeDetails.socialStatus}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={employeeDetails.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={employeeDetails.age}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h3>Address</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Street 1</label>
              <input
                type="text"
                name="addressLine1"
                value={employeeDetails.addressLine1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Street 2</label>
              <input
                type="text"
                name="addressLine2"
                value={employeeDetails.addressLine2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={employeeDetails.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={employeeDetails.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={employeeDetails.postalCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={employeeDetails.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="save-button-container">
          {/* <button className="save-button" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default EmployeeProfile;
