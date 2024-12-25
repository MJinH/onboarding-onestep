import React, {useEffect, useState} from "react"
import SideBar from "../../components/sidebar/SideBar"
import {Table, Tag, Upload, Tabs, message, notification,Button, Progress} from "antd";
import {Link} from "react-router-dom"
import { signup, getAllEmployee,addMultipleEmployee, getPendingEmployee } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import xlsx from "xlsx"
import store from "../../redux/store";
import { UploadOutlined } from '@ant-design/icons';
import "./Employee.css"
// const {Column} = Table
// import SideBar from "../../components/sidebar/SideBar";
// import { Table, Progress } from "antd";

const Employee = () => {
  const data = [
    {
      key: "1",
      name: "Thanuja",
      position: "SDE2",
      department: "Technical Department",
      hiringLead: "Sammy Stone",
      offerDate: "05/07/2019",
      acceptDate: "05/08/2019",
      progress: 90,
      tasks: "9/10",
    },
    {
      key: "2",
      name: "JinHyuk",
      position: "Software Development Engineer",
      department: "Technical Department",
      hiringLead: "Sammy Stone",
      offerDate: "05/08/2019",
      acceptDate: "05/09/2019",
      progress: 80,
      tasks: "8/10",
    },
    {
      key: "3",
      name: "Nagalaksmi",
      position: "SDE",
      department: "Technical Department",
      hiringLead: "Sammy Stone",
      offerDate: "05/10/2019",
      acceptDate: "05/12/2019",
      progress: 50,
      tasks: "1/10",
    },
    // Add more rows here as required
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Hiring Lead",
      dataIndex: "hiringLead",
      key: "hiringLead",
    },
    {
      title: "Offer Date",
      dataIndex: "offerDate",
      key: "offerDate",
    },
    {
      title: "Accept Date",
      dataIndex: "acceptDate",
      key: "acceptDate",
    },
    {
      title: "Onboarding Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => <Progress percent={progress} />,
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks",
    },
  ];

  return (
    <div className="dashboard-analytics">
      <SideBar />
      <div className="analytics-content">
        <h1>Analytics</h1>
        <div className="analytics-cards">
          <div className="analytics-card">
            <h2>55</h2>
            <p>Offers to Send</p>
          </div>
          <div className="analytics-card">
            <h2>1</h2>
            <p>Time to Accept (days)</p>
          </div>
          <div className="analytics-card">
            <h2>12</h2>
            <p>Time to Onboard (days)</p>
          </div>
          <div className="analytics-card">
            <h2>5</h2>
            <p>Onboarded</p>
          </div>
          <div className="analytics-card">
            <h2>65%</h2>
            <p>Offer Acceptance Ratio</p>
          </div>
          <div className="analytics-card">
            <h2>11265</h2>
            <p>Applications Received</p>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Employee;
