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


### Installation

1. **Install Dependencies**: Run the following command in your terminal to install the required dependencies:

```bash
npm install
```

### Set up MongoDB: 

Make sure you have MongoDB installed on your system. Create a .env file in the root directory of your project and provide your MongoDB connection URI:
 - **1** MONGODB_URI=your_mongodb_connection_uri
   
### Usage
 #### Start the Server:
  * Run the following command to start the server:
    npm start
    
The server will start running on http://localhost:port. Replace port with the port number specified in your environment variables or 3000 by default.
