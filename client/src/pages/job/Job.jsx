import React, {useEffect, useState} from "react"
import SideBar from "../../components/sidebar/SideBar"
import {Table, Tabs, notification,Button, Modal} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom"
import { signup, getAllPosition, deletePosition } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import xlsx from "xlsx"
import store from "../../redux/store";
import { UploadOutlined } from '@ant-design/icons';
import "./Job.css"
const {Column} = Table
const { TabPane } = Tabs;
const Offer = (props)=>{
    const [positionData, setPositionData] = useState([]);
    
    useEffect(() => {
        if(props.all_position == null) {
          props.getAllPosition()
        } else {
          setPositionData(props.all_position.documents)
        }
      }, [props.all_position])
   
    const close = () => {
        store.dispatch({ type: "SET_ALERT", payload: { message: null } });
      };
    
      
    const openNotification = (err) => {
      notification["error"]({
        message: "Error in employee",
        // description: err.message,
        onClose: close,
      });
    };
  
    const handleDelete = (record) => {
        Modal.confirm({
          title: "Are you sure you want to delete this position?",
          content: `Position: ${record.position}`,
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk: () => {
            console.log("Deleting record:", record);
            // Call API to delete the record
            props.deletePosition({id: record.id}); // Replace with your delete action
          },
        });
    };
    useEffect(() => {
    //   if (props.alert_message !== null && props.alert_message!= undefined) {
    //     openNotification(props.alert_message.data);
    //    console.log(props.alert_message.data)
    //   }
    }, [props.alert_message]);
    return(
        <>
        <SideBar/>
        <div className="all-employee-container">

            <Tabs defaultActiveKey="1" style={{width:"100%"}} className="employee-tab">
                <TabPane tab="Job Offering" key="1">
                <Table
                    dataSource={positionData}
                    className="employee-table"
                >
                    <Column
                        title="ID"
                        dataIndex="id"
                        key="ID"
                    />
                    <Column
                        title="Position"
                        dataIndex="position"
                        key="Position"
                    />
                    <Column
                        title="Description"
                        dataIndex="description"
                        key="Description"
                    />
                    <Column
                        title="Open/Closed"
                        dataIndex="openPosition"
                        key="Open/Closed"
                    />
                    <Column
                        title="Date"
                        dataIndex="date"
                        key="Date"
                    />
                <Column
                    title="Actions"
                    key="Actions"
                    render={(text, record) => (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                type="link"
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(record)}
                                danger
                            />
                        </div>
                    )}
                />
                </Table>
                </TabPane>
            </Tabs>
            <div style={{height:"50px"}}>
                <Link to="/new-job">
                <Button type="primary" className="employee-add">
                    Add New Position
                </Button>
                </Link>
            </div>
        </div>
        </>
    )
}
const mapActionWithProps = {
    signup,
    getAllPosition,
    deletePosition
  };
  
  const mapPropsWithState = (state) => ({
    alert_message: state.user.alert_message,
    success_message: state.user.success_message,
    all_position: state.user.all_position,
  });
  
  export default connect(mapPropsWithState, mapActionWithProps)(Offer);