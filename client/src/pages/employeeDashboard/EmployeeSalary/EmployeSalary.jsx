import React from "react";
import "./EmployeeSalary.css";
import SideBar from "../../../components/sidebar/SideBar";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const EmployeeSalary = () => {
  // Data for the pie chart
  const payrollData = [
    { name: "Income", value: 5437, color: "#4CAF50" },
    { name: "Taxes", value: 813.5, color: "#FFC107" },
    { name: "Deductions", value: 0, color: "#F44336" },
  ];

  return (
    <div>
    <SideBar />
    <div className="salary-container">
      {/* <h1 className="title">Salary Details</h1> */}

      {/* Salary Overview */}
      <div className="salary-overview">
        <div className="salary-report">
          <h2>Salary Report</h2>
          <p>For September 01 - September 15</p>
          <h3 className="salary-amount">$6,250.00</h3>
          <p>Naga Lakshmi</p>
          <div className="months">
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month) => (
              <button key={month} className="month-btn">
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Year-to-date Payroll */}
        <div className="year-to-date">
          <h2>Year-to-date Payroll</h2>
          <div className="paycard">
            <div className="total-gross">
                <h3>Total Gross Pay</h3>
                <p>Since date: January 2020</p>
                <h3 className="gross-amount">$6,250.00</h3>
            </div>
          <div className="pieclass">
          <PieChart width={250} height={250}>
            <Pie
              data={payrollData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name }) => `${name}`}
            >
              {payrollData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary">
        <h2>Summary</h2>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Pay Date</th>
              <th>Total Gross Pay</th>
              <th>Taxes</th>
              <th>Deductions</th>
              <th>Health Insurance</th>
              <th>Net Amount</th>
              <th>YTD Net</th>
              <th>Payslip</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/16/2020</td>
              <td>$6,250.00</td>
              <td>$813.50</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$5,437.00</td>
              <td>$5,437.00</td>
              <td>
                <a href="#" className="view-link">
                  View
                </a>
              </td>
              <td className="status-paid">Paid</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Details Section */}
      <div className="additional-details">
        <div className="direct-deposit">
          <h3>Direct Deposit</h3>
          <ul>
            <li>80% of each check goes to GOLDMAN SACHS checking X-7845</li>
            <li>100% of the remaining amount goes to BANK OF AMERICA (Arizona) checking X-8893</li>
          </ul>
          <button className="view-btn">View</button>
        </div>

        <div className="paid-time-off">
          <h3>Paid Time-Off Policy</h3>
          <p>Hours used this period: 0.00</p>
          <p>Hours accrued this period: +4.00</p>
          <p>Remaining paid time off balance: 64.00</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmployeeSalary;
