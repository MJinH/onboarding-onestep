import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Landing from "./pages/landing/Landing";
import E404 from "./pages/error/E404";
import Dashboard from "./pages/dashboard/Dashboard"
import UserDashboard from "./pages/employeeDashboard/Dashboard"
import UserLanding from "./pages/employeeLanding/EmployeeLanding"
import ItDashboard from "./pages/it/Dashboard"
import TrainerDashboard from "./pages/trainer/Dashboard"
import NewEmployee from "./pages/employee/NewEmployee"
import EditEmployee from "./pages/employee/EditEmployee"
import Employee from "./pages/employee/Employee"
import Account from "./pages/account/Account"
import Letter from "./pages/letter/Letter"
import SingleEmployee from "./pages/employee/SingleEmployee"
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import About from "./pages/About/About";
import EmployeeProfile from "./pages/EmployeeProfile/EmployeeProfile";
import Documents from "./pages/documents/documents";
import EmployeeSalary from "./pages/employeeDashboard/EmployeeSalary/EmployeSalary"; 

import api from "./shared/api"; 
import { connect } from "react-redux";
import store from "./redux/store";
import { Alert, Spin } from "antd";
import Offer from './pages/job/Job';
import NewJob from './pages/job/NewJob';
import Chat from './pages/chat/Chat.jsx';

const App = (props)=>{
  const [role, setRole] = useState("admin")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    api();
    (async () => {
      try {
        const role = localStorage.getItem("role");
        setRole(role);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoading(false)
  }, []);

  return(
    <div>
       {props.success_message !== null ? (
          <Alert
            type="success"
            message="Success"
            description={props.success_message}
            showIcon
            closable
            style={{
              position: "absolute",
              zIndex: 100,
              top: 30,
              right: 30,
              width: "300px",
            }}
            onClose={() =>
              store.dispatch({ type: "SUCCESS_DATA", payload: "" })
            }
          />
        ) : (
          ""
        )}
        {loading==true? <Spin/>:
      <Router>
        <Routes>
        {/*  <Route path="/" element={PublicRoute(Landing)} exact />
        */}
          <Route element={<PublicRoute/>}>
            <Route path="/" element={<Landing/>} exact />  
            <Route path="/about" element={<About/>} exact />
            <Route path="/signup" element={<SignUp/>} exact />
            <Route path="/signin" element={<SignIn/>} exact />
            <Route path="/letter/:id" element={<Letter/>} exact />
          </Route>
          {role === "admin"? 
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>} exact />  
            <Route path="/analytics" element={<Employee/>} exact />  
            <Route path="/account" element={<Account/>} exact />
            <Route path="/offer" element={<Offer/>} exact />  
            <Route path="/new-job" element={<NewJob/>} exact/>
            <Route path="/chat" element={<Chat/>} exact/>
            <Route path="/employee/:id" element={<SingleEmployee/>} exact />  
            <Route path="/pending-employee/:id" element={<EditEmployee/>} exact />  
            <Route path="/new-employee" element={<NewEmployee/>} exact/>
          </Route>
          :
          <>
            {role === "it"?
              <>
                <Route element={<PrivateRoute/>}>
                  <Route path="/dashboard" element={<ItDashboard/>} exact />             
                </Route>
              </>
              :
              <>
              {role==="trainer"?
               <>
                <Route element={<PrivateRoute/>}>
                  <Route path="/dashboard" element={<TrainerDashboard/>} exact />             
                </Route>
              </>
              :
              <Route element={<PrivateRoute />}>
                <Route path="/salary/:id" element={<EmployeeSalary />} exact />
                <Route path="/landing/:id" element={<UserLanding />} exact />
                <Route path="/documents/:id" element={<Documents />} exact />
                {/* <Route
                  path="/employeesalary"
                  element={<EmployeeSalary />} // Employee Salary Route
                  exact
                /> */}
                <Route
                  path="/employeeprofile"
                  element={<EmployeeProfile />} // Employee Profile Route
                  exact
                />
              </Route>
              }
              </>
            }
          </>
          }
          <Route path="*" element={<E404/>} />
        </Routes>
      </Router>
        }
    </div>
  )
}


const mapPropsWithState = (state) => ({
  success_message: state.user.success_message,
  error_message: state.user.error_message,
});

export default connect(mapPropsWithState)(App);
