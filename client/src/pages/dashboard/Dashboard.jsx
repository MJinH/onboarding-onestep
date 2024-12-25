import React, { useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Edit, Delete, Home as HomeIcon } from "@mui/icons-material";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([
    {
      id: "1234",
      fullName: "Naga Lakshmi",
      position: "Software Development Engineer",
      email: "nagalakshmigurrala17@gmail.com",
      hiringLead: "Sammy Stone",
      documents: "Browse all",
      workflow: 1,
    },
    {
      id: "3476",
      fullName: "Thanuja",
      position: "SDE 2",
      email: "thanuja.mudududla@sjsu.edu",
      hiringLead: "Sammy Stone",
      documents: "Browse all",
      workflow: 2,
    },
    {
      id: "8955",
      fullName: "Jinhyuk",
      position: "Senior PHP Developer",
      email: "jinhyuk@gmail.com",
      hiringLead: "Jim Neutron",
      documents: "Browse all",
      workflow: 3,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedStage, setSelectedStage] = useState(1);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isBrowsingDocuments, setIsBrowsingDocuments] = useState(false);

  const [documentStatuses, setDocumentStatuses] = useState({
    1234: {
      "Employment Contract": "Pending",
      "Offer Letter": "Download",
      "Employee Handbook": "Pending",
      "Form I-9 (Employment Eligibility Verification)": "Pending",
      "Form W-4 (Tax Withholding)": "Pending",
      "Direct Deposit Form": "Pending",
      "Emergency Contact Information": "Pending",
      "Non-Disclosure Agreement (NDA)": "Pending",
      "Non-Compete Agreement": "Pending",
    },
    3476: {
      "Employment Contract": "Download",
      "Offer Letter": "Pending",
      "Employee Handbook": "Download",
      "Form I-9 (Employment Eligibility Verification)": "Pending",
      "Form W-4 (Tax Withholding)": "Pending",
      "Direct Deposit Form": "Pending",
      "Emergency Contact Information": "Pending",
      "Non-Disclosure Agreement (NDA)": "Pending",
      "Non-Compete Agreement": "Pending",
    },
    8955: {
      "Employment Contract": "Pending",
      "Offer Letter": "Pending",
      "Employee Handbook": "Download",
      "Form I-9 (Employment Eligibility Verification)": "Pending",
      "Form W-4 (Tax Withholding)": "Pending",
      "Direct Deposit Form": "Pending",
      "Emergency Contact Information": "Pending",
      "Non-Disclosure Agreement (NDA)": "Pending",
      "Non-Compete Agreement": "Pending",
    },
  });

  // Sample documents list
  const documentsList = [
    "Employment Contract",
    "Offer Letter",
    "Employee Handbook",
    "Form I-9 (Employment Eligibility Verification)",
    "Form W-4 (Tax Withholding)",
    "Direct Deposit Form",
    "Emergency Contact Information",
    "Non-Disclosure Agreement (NDA)",
    "Non-Compete Agreement",
  ];

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  const handleEdit = (id, currentStage) => {
    setSelectedEmployeeId(id);
    setSelectedStage(currentStage);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveWorkflow = () => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === selectedEmployeeId
          ? { ...employee, workflow: selectedStage }
          : employee
      )
    );
    setOpenDialog(false);
  };

  const renderWorkflow = (employee) => {
    const stages = ["Pre-Onboarding", "Onboarding", "Complete"];
    const progress = (employee.workflow / stages.length) * 100;

    return (
      <div className="workflow-container">
        <LinearProgress variant="determinate" value={progress} className="progress-bar" />
        <div className="workflow-stages">
          {stages.map((label, index) => (
            <Typography
              key={index}
              variant="caption"
              className={`workflow-stage ${
                index + 1 === employee.workflow ? "active-stage" : ""
              }`}
            >
              {label}
            </Typography>
          ))}
        </div>
      </div>
    );
  };

  const handleBrowseDocuments = (employee) => {
    setCurrentEmployee(employee);
    setIsBrowsingDocuments(true);
  };

  const handleBreadcrumbClick = () => {
    setIsBrowsingDocuments(false);
    setCurrentEmployee(null);
  };

  const handleDownload = (documentName) => {
    const link = document.createElement("a");
    link.href = "https://onboarding-files-cs272.s3.us-west-1.amazonaws.com/upload/1.pdf"; // Replace with actual PDF URL
    link.download = `${documentName}.pdf`;
    link.click();
  };

  return (
    <>
      <SideBar />
      <div className="dashboard-container">
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
          <Link
            href="#"
            onClick={handleBreadcrumbClick}
            style={{ textDecoration: "none" }}
            variant="h5" className="header-text" 
          >
            Employees
          </Link>
          {isBrowsingDocuments && (
            <Typography color="textPrimary" variant="h5" className="header-text" >
              {currentEmployee?.fullName}'s Documents
            </Typography>
          )}
        </Breadcrumbs>

        {/* Conditionally render content */}
        {!isBrowsingDocuments ? (
          <TableContainer className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID #</strong></TableCell>
                  <TableCell><strong>Full Name</strong></TableCell>
                  <TableCell><strong>Position</strong></TableCell>
                  <TableCell><strong>E-Mail</strong></TableCell>
                  <TableCell><strong>Hiring Lead</strong></TableCell>
                  <TableCell><strong>Documents</strong></TableCell>
                  <TableCell><strong>Onboarding Workflow</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.fullName}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.hiringLead}</TableCell>
                    <TableCell>
                      <a href="#" className="documents-link"  onClick={() => handleBrowseDocuments(employee)}>
                        <Typography
                          variant="body2"
                          style={{
                            color: "#1976d2",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          {employee.documents}
                        </Typography>
                      </a>
                    </TableCell>
                    <TableCell>{renderWorkflow(employee)}</TableCell>
                    <TableCell>
                      <div className="action-icons">
                        <Tooltip title="Edit" arrow>
                          <IconButton size="small" onClick={() => handleEdit(employee.id, employee.workflow)}>
                            <Edit className="action-icon" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(employee.id)}
                          >
                            <Delete className="action-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Document Name</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentsList.map((doc) => (
                  <TableRow key={doc}>
                    <TableCell>{doc}</TableCell>
                    <TableCell>
                      {documentStatuses[currentEmployee.id]?.[doc] === "Pending" ? (
                        <Typography style={{ color: "red", fontWeight: 600 }}>
                          Pending
                        </Typography>
                      ) : (
                        <Typography
                          style={{
                            color: "#1976d2",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                          onClick={() => handleDownload(doc)}
                        >
                          Download
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: "#e6f7ff", fontSize: "15px", fontWeight: 600 }}>
          Edit Onboarding Status
        </DialogTitle>
        <DialogContent style={{ padding: "20px" }}>
          <RadioGroup
            value={selectedStage}
            onChange={(e) => setSelectedStage(parseInt(e.target.value))}
          >
            <FormControlLabel value={1} control={<Radio />} label="Pre-Onboarding" />
            <FormControlLabel value={2} control={<Radio />} label="Onboarding" />
            <FormControlLabel value={3} control={<Radio />} label="Complete" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveWorkflow} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;