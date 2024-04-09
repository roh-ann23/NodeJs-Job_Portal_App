# NodeJs-Job_Portal_App

A dynamic Job Portal app, built with Node.js, Express.js, and MongoDB, designed to seamlessly connect job seekers with employers. Features user authentication, profile management, job listings, and applications, all within a robust and scalable backend. Streamlines the recruitment process, making job search and posting efficient and accessible.

## Job Portal

Welcome to the repository of our Job Portal, a comprehensive platform designed to bridge the gap between job seekers and employers. Built with Node.js, Express.js, and MongoDB, this portal offers a robust backend solution that facilitates the job search and recruitment process, making it smoother and more accessible for all parties involved.

## Features

Our Job Portal includes the following key features:

- **User Authentication**: Secure signup and login processes for both job seekers and employers.
- **Profile Management**: Users can create and edit their profiles to highlight their professional experience, skills, and educational background.
- **Job Listings**: Employers can post job openings with detailed descriptions, requirements, and application instructions.
- **Job Applications**: Job seekers can easily apply for jobs and track their application status.
- **Search and Filter**: Advanced search functionality that allows users to filter job listings by keyword, status, work type, and more.
- **Notifications**: Real-time notifications for job seekers on new job postings matching their profiles and for employers on receiving applications.

## Technologies

This project is implemented using the following technologies:

- **Backend**: Node.js, Express.js - for building a fast and scalable server-side application.
- **Database**: MongoDB - for storing and managing user data, job postings, and applications efficiently.

## Routes

### Users

The application provides the following routes for users:

- **GET /api/users**: Get all users.
  - Handler: `getAllUser`
- **POST /api/users/signup**: User registration.
  - Handler: `userSignUp`
- **POST /api/users/login**: User login.
  - Handler: `userLogIn`

You can test these routes using Postman or any other API testing tool.

### Jobs

The application provides the following routes for jobs:

- **GET /api/jobs**: Get all jobs.
  - Handler: `getAllJobs`
- **POST /api/jobs**: Create a new job listing.
  - Handler: `createJob`
- **GET /api/jobs/:id**: Get a job by ID.
  - Handler: `getJobById`
- **PUT /api/jobs/:id**: Update a job by ID.
  - Handler: `updateJob`
- **DELETE /api/jobs/:id**: Delete a job by ID.
  - Handler: `deleteJob`

You can test these routes using Postman or any other API testing tool.


## Installation

1. **Install Dependencies**: Run the following command in your terminal to install the required dependencies:

```bash
npm install
```

## Set up MongoDB: 

Make sure you have MongoDB installed on your system. Create a .env file in the root directory of your project and provide your MongoDB connection URI:
 - **1** MONGODB_URI=your_mongodb_connection_uri
   
## Usage
 #### Start the Server:
  * Run the following command to start the server:
    npm start
    
The server will start running on http://localhost:port. Replace port with the port number specified in your environment variables or 3000 by default.

## Postman API Testing Guide

### Making Requests

1. **Create New Request**: Click on the "New" button in the top-left corner and select "Request."

2. **Enter Request Details**: Provide a name for your request and choose the HTTP method (e.g., GET, POST, PUT, DELETE).

3. **Enter Request URL**: Enter the full URL of the API endpoint you want to test. If you're using environment variables, you can use them here (e.g., `{{BASE_URL}}/api/users`).

4. **Add Headers (if necessary)**: If your API requires headers (e.g., authentication tokens), you can add them under the "Headers" tab.

5. **Add Request Body (if necessary)**: For POST, PUT, or PATCH requests, you can add request body parameters under the "Body" tab.

6. **Send Request**: Click on the "Send" button to send the request to the server.

### Viewing Responses

1. **Response Status**: The status of the response (e.g., 200 OK, 404 Not Found) will be displayed along with the response time.

2. **Response Body**: The response body will be displayed below, showing the data returned by the server.

3. **Response Headers**: You can view the response headers under the "Headers" tab.

4. **Response Cookies**: If the response contains cookies, you can view them under the "Cookies" tab.

### Conclusion

Postman is a powerful tool for testing and debugging APIs. With its user-friendly interface and comprehensive features, it's an essential tool for backend developers to ensure the reliability and functionality of their APIs.
