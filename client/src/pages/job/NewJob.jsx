import React, {useEffect, useState} from "react"
import SideBar from "../../components/sidebar/SideBar"
import {Table, Tag, Button, Input, notification, DatePicker, Radio} from "antd";
import { signup, getAllEmployee, addPosition, getAllPosition } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import store from "../../redux/store";
import "./Job.css"
const {Column} = Table
const {TextArea} = Input
const NewJob = (props)=>{
    const [jobID, setjobID] = useState("");
    const [position, setposition] = useState("")
    const [description, setdescription] = useState("")
    const [date, setdate] = useState("") 
    const [openPosition, setopenPosition] = useState(false)
    const [loading, setLoading] = useState(false);
    const onAddEmployee = async ()=>{
      setLoading(true);
      const data = {
        id: jobID,
        position,
        description,
        date,
        openPosition
      }
      console.log(data);
      try {
        const res = await props.addPosition(data);
        console.log(res)
      } catch (err) {
        console.log(err);
      }
      // let data = {
      //   name: jobID,
      //   email: position,
      //   doj: date,
      //   career: description,
      //   address: empAddress,
      //   trainingRequired: empTraining 
      // }
      // console.log(data)
      // try{
      //   const res = await props.addEmployee(data)
      //   console.log(res)
      // }catch(e){
      //   console.log(e)
      // }
      // setopenPosition(false)
      setLoading(false);
    }
  const close = () => {
    store.dispatch({ type: "SET_ALERT", payload: { message: null } });
  };
  
    
  const openNotification = (err) => {
    notification["error"]({
      message: "Error in newEmployee",
      // description: err.message,
      onClose: close,
    });
  };
  useEffect(() => {
    // if (props.alert_message !== null && props.alert_message!= undefined) {
    //   openNotification(props.alert_message.data);
    //  console.log(props.alert_message.data)
    // }
  }, [props.alert_message]);
  const handleDateChange=(value)=>{
      console.log(value)
      let d = new Date(value)
      console.log(Math.floor(d.getTime()/1000))
      setdate(Math.floor(d.getTime()/1000))
  }
  return(
      <>
      <SideBar/>
      <div className="wrapper">
      <div className="new-employee-container">
        <div className="new-employee-title">
          <h3>ID</h3>
          <Input className="new-employee-input" value={jobID} onChange={(e)=>{
            setjobID(e.target.value)
          }} size="large" placeholder="enter position ID" />
        </div>
        <div className="new-employee-title">
          <h3>Position</h3>
          <Input className="new-employee-input" value={position} onChange={(e)=>{
            setposition(e.target.value)
          }}size="large" placeholder="enter position name" />
        </div>
        <div className="new-employee-title">
          <h3>Description</h3>
          <Input className="new-employee-input" value={description} onChange={(e)=>{
            setdescription(e.target.value)
          }} size="large" placeholder="enter position description" />
        </div>
        <div className="new-employee-title">
          <h3>Date of publishing</h3>
          <DatePicker onChange={handleDateChange} format='DD/MM/YYYY'/>
        </div>
        <div className="new-employee-title">
          <h3>Open Position</h3>
          <Radio.Group buttonStyle="solid" onChange={(e)=>{
            setopenPosition(e.target.value)
          }}>
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </div>
        <Button type="primary" className="emp-button" loading={loading} onClick={onAddEmployee}>Add New Position</Button>
      </div>
      </div>
      </>
  )
}
const mapActionWithProps = {
    signup,
    getAllPosition,
    addPosition
  };
  
  const mapPropsWithState = (state) => ({
    alert_message: state.user.alert_message,
    success_message: state.user.success_message,
    all_position: state.user.all_position,
  });
  
  export default connect(mapPropsWithState, mapActionWithProps)(NewJob);