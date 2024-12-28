# Employee Onboarding Portal - ONE STEP

The **ONE STEP Onboarding Portal** streamlines and simplifies the onboarding process for new hires and HR teams. It provides a centralized platform where new employees can complete forms, upload documents, and update personal information before their start date, reducing administrative delays.

<img width="470" alt="logo1" src="https://github.com/user-attachments/assets/3492573a-da2b-429f-8fd6-8d193b91a3eb">

## Key Features
- **Pre-emptive Data Collection**: Employees submit information in advance, enabling HR to verify and resolve discrepancies early.
- **Automation**: Automates tasks like issuing welcome kits, provisioning IT equipment, and setting up access credentials.
- **User-Friendly Interface**: Guides new hires step-by-step, with notifications and reminders to reduce stress.
- **Real-Time Progress Tracking**: HR can monitor onboarding status to ensure no tasks are missed.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB
- **Cloud Services**: AWS Lambda
- **CI/CD**: Jenkins

---

## Setup Instructions

### Prerequisites
Before setting up the project, ensure the following are installed on your system:
1. **Node.js** (v14 or later)
2. **MongoDB** (local or cloud instance)
3. **AWS CLI** (configured with access credentials)
4. **Jenkins** (optional for CI/CD pipeline setup)

### Installation Steps

#### Clone the Repository
```bash
git clone https://github.com/your-username/employee-onboarding-portal.git
cd employee-onboarding-portal
```
#### Backend Setup
- Navigate to the `server` folder:
  ```bash
  cd server
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Configure environment variables:
  - Create a `.env` file in the `backend` directory.
  - Add the following:
    ```env
    PORT=3000
    SENDGRID_API_KEY=<Your Sendgrid api string>
    REACT_APP_BACKEND_URL="http://localhost:3000"
    JWT_SECRET=<Your JWT secret string>
    MONGO_URI=<Your MongoDB connection string>
    AWS_REGION=<Your AWS region>
    AWS_ACCESS_KEY_ID=<Your AWS Access Key>
    AWS_SECRET_ACCESS_KEY=<Your AWS Secret Key>
    GOOGLE_CLIENT_ID=<Your Google Client ID>
    ```
- Start the backend server:
  ```bash
  npm start
  ```
#### Frontend Setup
- Navigate to the `frontend` folder:
  ```bash
  cd frontend
- Install dependencies:
  ```bash
  npm install
  ```
- Configure environment variables:
    Create a .env file in the frontend directory.
    Add the backend API URL:
  ```bash
  REACT_APP_API_URL=http://localhost:3000
  ```
- Start the development server:
  ```bash
  npm start
  ```

## Architechture
<img width="714" alt="Screenshot 2024-12-05 at 5 52 27 PM" src="https://github.com/user-attachments/assets/3a97a7b3-e087-45b7-816d-64419ca37d06">

---
## Required Feature Implementation

### **Single Sign-on (SSO) / AD Authentication with SSL/TLS Encryption**  
  We implemented **Google Single Sign-On (SSO)** for both sign-up and sign-in, offering users a seamless and secure authentication experience. The integration ensures that users can log in using their Google credentials, reducing the need to remember multiple passwords and improving security. This implementation uses **SSL/TLS encryption** to protect sensitive data during
 the authentication process, ensuring all communication between the client and server is encrypted and secure.
  <img width="1459" alt="Screenshot 2024-12-05 at 5 08 35 PM" src="https://github.com/user-attachments/assets/22924932-9624-46e5-baff-33b1293a129e">

### **Application / Web Portal for Viewing/Browsing Enterprise Employee Data with SSO Roles**  
  The application supports **two roles**: **Employee** and **Admin**. Each role is associated with a different user interface, ensuring that both employees and administrators have tailored experiences.
  - **Employee Role**: Employees can access their personal data, view their onboarding progress, salary details, upload required documents, and track the completion of their onboarding tasks.
    
  Employee Profile -
  <img width="1459" alt="Screenshot 2024-12-05 at 5 10 46 PM" src="https://github.com/user-attachments/assets/2a451ef6-f3b9-4855-963e-91e09dd297d3">

  Documents Upload Page -
  <img width="1463" alt="Screenshot 2024-12-08 at 7 04 50 PM" src="https://github.com/user-attachments/assets/6ced7a04-5480-4500-b7ce-6bb4818b8dd0">

  Employee Salary Page -
  <img width="1464" alt="Screenshot 2024-12-05 at 5 11 18 PM" src="https://github.com/user-attachments/assets/1e037956-54e3-4db0-b568-cd9f4484a985">
  
  - **Admin Role**: Admin users have access to a more comprehensive dashboard where they can manage employee data, review progress for all users, send notifications, and manage various system settings. They can also send grouped message to employees in our chat page.

  Employees Page - Where Admin can browse list of registered employees and their status.
  <img width="1469" alt="Screenshot 2024-12-05 at 6 14 16 PM" src="https://github.com/user-attachments/assets/c5047078-5135-4f79-94a4-19c81f87f59d">

  Documents Status Per Employee -
  <img width="1469" alt="Screenshot 2024-12-05 at 6 14 28 PM" src="https://github.com/user-attachments/assets/4f77bdeb-5912-45a4-8955-6a42c056c775">

  Job Offering Page - Admin can add open positions in the company.
  <img width="1385" alt="Screenshot 2024-12-08 at 8 25 59 PM" src="https://github.com/user-attachments/assets/6cc7e4f1-c1b2-4d05-8460-484a4cf8b496">

  Chat Page - We have list of all the users on left side and Chat section on right side.
  <img width="1385" alt="Screenshot 2024-12-08 at 8 27 42 PM" src="https://github.com/user-attachments/assets/e9602c5e-9714-4a06-b65c-4fc834339feb">
  
  The UI is dynamically adjusted based on the assigned role, providing relevant features and maintaining a streamlined user experience.

### **GitHub (or Other Repo) Integrated into SSO**  
  We integrated the project repository on **GitHub** (or another version control platform) with the Single Sign-On (SSO) system, ensuring that only authenticated users can access and contribute to the repository. This integration simplifies user management and improves security by tying access to authenticated roles, avoiding the need for separate repository credentials.

### **Jenkins Integrated into SSO and GitHub Repo**  
  The project is set up with **Jenkins** for Continuous Integration/Continuous Deployment (CI/CD). Jenkins is integrated with both the **SSO** and **GitHub repositories**:
  - **Jenkins Pipeline**: Whenever there is a push to the GitHub repository (for example, after a new feature or bug fix is committed), Jenkins automatically triggers a build. This ensures that the latest changes are continuously tested and deployed without manual intervention.
  - **Webhooks**: We used GitHub webhooks to notify Jenkins of any changes in the repository, initiating the build process automatically. This setup allows for real-time monitoring and rapid feedback on code changes, ensuring that the project is always in a deployable state.

  <img width="1467" alt="Screenshot 2024-12-05 at 6 20 20 AM" src="https://github.com/user-attachments/assets/720c7589-e031-4cea-b4a5-6e47850d5cd5">

### **Additional Integrations / Features** 
  The project also includes several advanced features and integrations to enhance security and usability:
  - **Document Repository (AWS S3)**: For secure document storage, we integrated **AWS S3** buckets. This allows employees to upload and store necessary documents, such as IDs, contracts, and tax forms, securely. The data stored in S3 is encrypted, ensuring compliance with industry-standard data protection regulations. S3 also offers scalability, making it easy to handle a large volume of documents as the application grows.
  
  <img width="1462" alt="Screenshot 2024-12-08 at 8 31 38 PM" src="https://github.com/user-attachments/assets/1c27ed54-17b7-4a01-9591-f9b02068243b">

  - **Serverless Functionality (AWS Lambda)**: To minimize server management and optimize cost efficiency, we used **AWS Lambda** for serverless execution. Lambda functions handle specific tasks like sending emails, processing uploaded documents, or triggering workflows, without the need to provision or manage traditional servers. This also improves application performance by enabling on-demand resource scaling. When a user clicks on the user panel on the left, the Room Component is triggered. This component sends a request to the WebSocket API to establish a connection. Once the connection is successfully created, a Lambda function is invoked to save the necessary chat room and user information into DynamoDB. When a user sends a message, a request is sent to the REST API to store the chat message in the database.
  ![Screenshot (1273)](https://github.com/user-attachments/assets/f4ad513e-54e5-494c-9eef-8bd0a7ebc770)
![Screenshot (1274)](https://github.com/user-attachments/assets/b8cfc4f1-3178-4e71-b758-cf9ecfb191b3)
![Screenshot (1275)](https://github.com/user-attachments/assets/b7060eb2-d3dc-4d8f-ab3c-1782ab51a991)
![Screenshot (1276)](https://github.com/user-attachments/assets/c120d705-3d41-4824-aed9-925f714983bd)
![Screenshot (1277)](https://github.com/user-attachments/assets/5eb4b303-e4e3-4793-889a-269b43fc506e)

  - **Database (DynamoDB)**: We used **AWS DynamoDB**, a fully managed NoSQL database, to store and retrieve data in a highly available, scalable manner. DynamoDB is ideal for applications requiring low-latency data access, such as handling real-time onboarding information. With DynamoDB, we can easily scale as the application grows while ensuring fast and reliable access to employee data.

This comprehensive set of features enhances both the user experience and the security of the platform, making it a robust and scalable solution for employee onboarding.

---
## Test Cases & Results

Added authaction.test.js file for functional testing. 
Test case success -
<img width="662" alt="Screenshot 2024-12-08 at 7 40 34 PM" src="https://github.com/user-attachments/assets/d6334866-da2a-4994-8865-2faed318aad3">
