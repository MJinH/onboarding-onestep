import React, {useEffect, useState, useCallback} from "react"
import SideBar from "../../components/sidebar/SideBar"
import {Table, Tag, Upload, Tabs, message, notification, Button, Card } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { signup, getAllUsers,addMultipleEmployee, getPendingEmployee } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import axios from 'axios';
import "./Chat.css"
import Room from "./Room";
const {Column} = Table
const API_GATEWAY_ID = "0csvixoi5c";
const SOCKET_API_GATEWAY_ID = "xcyzsguaqc";
const { TabPane } = Tabs;
const Chat = (props)=>{
    const [users, setUsers] = useState();
    const [curUser, setCurUser] = useState(); 
    const [room, setRoom] = useState(false);
    useEffect(() => {
      if (!props.all_users) {
        props.getAllUsers();
      } else if (!users) {
        setUsers(props.all_users);
      }
    }, [props.all_users, users]);
      
    const openNotification = (err) => {
    //   notification["error"]({
    //     message: "Error in employee",
    //     description: err.message,
    //     onClose: close,
    //   });
    };
  
    useEffect(() => {
      if (props.alert_message !== null && props.alert_message!= undefined) {
        openNotification(props.alert_message.data);
       console.log(props.alert_message.data)
      }
    }, [props.alert_message]);
  
    const roomCreate = useCallback((user) => {
      setCurUser(user);
      setRoom(true);
      console.log(room);
    }, []);
    return(
        <>
        <SideBar/>
        <div className="all-employee-container">
            {/* <div style={{height:"50px"}}>
            <Link to="/new-employee">
            <Button type="primary" className="employee-add">
                Add Employee
            </Button>
            </Link>
            </div> */}
            <Tabs defaultActiveKey="1" style={{width:"50%"}} className="employee-tab">
              <TabPane tab="Users" key="1">
                {users?.map((user) => (
                      <Card title={            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <UserOutlined style={{ marginRight: 8 }} /> 
                      {user.name}
                      </div>} className="user-card" style={{ marginBottom: "1.5rem"}} onClick={() => roomCreate(user)}>{user.role}</Card>
                ))}
              </TabPane>
            </Tabs>
            <Tabs defaultActiveKey="1" style={{width:"50%", marginLeft: "5%"}} className="employee-tab">
              <TabPane tab="Chat" key="2">
                {room && <Room user={curUser} />}
                </TabPane>
            </Tabs>
        </div>
        <div>
        </div>
        </>
    )
}
const mapActionWithProps = {
    signup,
    getAllUsers,
    addMultipleEmployee,
    getPendingEmployee,
  };
  
  const mapPropsWithState = (state) => ({
    alert_message: state.user.alert_message,
    success_message: state.user.success_message,
    all_users: state.user.all_users,
    pending_employee: state.user.pending_employee,
  });
  
  export default connect(mapPropsWithState, mapActionWithProps)(Chat);