import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading state for initialization
    setLoading(false);
  }, []);

  return (
    <>
      <SideBar />
      {loading === true ? (
        <Spin />
      ) : (
        <div className="empdash">
          <div className="empcontainer">
            <div className="action-buttons">
              <Button
                type="primary"
                className="dashboard-button"
                onClick={() => navigate("/employeesalary")}
              >
                Salary
              </Button>
              <Button
                type="primary"
                className="dashboard-button"
                onClick={() => navigate("/employeeprofile")}
              >
                Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;