import React, { useState } from "react";
import "./document.css";
import SideBar from "../../components/sidebar/SideBar";
import { notification } from "antd";
import axios from "axios";
import AWS from 'aws-sdk';

const API_GATEWAY_ID = "qmz2moy1lg";
console.log(process.env.JWT_SECRET)
const Document = () => {

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  })

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_RESION
  })

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileOptions, setFileOptions] = useState([
    "Employee Contract",
    "Offer Letter",
    "Employee Handbook",
    "Form I-9 (Employment Eligibility Verification)",
    "Form W-4",
    "Direct Deposit Form",
    "Emergency Contact Information",
    "Non-Disclosure Agreement (NDA)",
    "Non-Compete Agreement"
  ]);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setSelectedFileName(e.target.value);
  };


  const testhandle = async() => {
    console.log(selectedFile);
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedFileName) {
      notification["warning"]({
        message: "Please select a document and a file before clicking upload."
      });
      return;
    }
    const params = {
      Body: selectedFile,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: 'upload/' + selectedFile.name
    }

    try {
      myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        console.log(evt)
      })
      .send((err) => {
        if(err) console.log(err);
      })
    } catch (err) {
      console.log(err)
    } 

    // Add the uploaded file to the table with static data
    const newFile = {
      fileName: selectedFileName,
      uploadTime: new Date().toLocaleString(),
      responsible: "Naga Lakshmi",
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    setSelectedFile(null);
    setSelectedFileName(""); // Reset the dropdown
    notification["success"]({ message: "File uploaded successfully!" });
  };

  return (
    <div className="doc-bg">
      <SideBar />
      <div className="document-container">
        <h2>Upload Documents</h2>
        <div className="upload-section">
          <select
            value={selectedFileName}
            onChange={handleFileNameChange}
            className="file-name-dropdown"
          >
            <option value="">Select a document</option>
            {fileOptions.map((fileName, index) => (
              <option key={index} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>

          <label htmlFor="file-upload" className="custom-file-upload">
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />

          <button onClick={handleUpload} className="upload-button">
            Upload
          </button>
        </div>

        <div className="uploaded-files-table">
          <h3>Your Documents</h3>
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Status</th>
                <th>Upload Time</th>
                <th>Responsible</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.fileName}</td>
                  <td className="uploaded">Upload Completed</td>
                  <td>{file.uploadTime}</td>
                  <td>{file.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Document;
