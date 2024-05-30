Here's a comprehensive and detailed README file that should be understandable for anyone looking to set up and use your real-time bidding platform project:

# Real-Time Bidding Platform

This project is an assignment provided by KGK INFOTECH as part of the selection process for the Backend Developer role. The goal is to create a comprehensive RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and MySQL.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
6. [WebSocket Events](#websocket-events)
7. [Project Structure](#project-structure)
8. [Testing](#testing)
9. [Contact](#contact)

## Introduction

The Real-Time Bidding Platform allows users to participate in live auctions by placing bids on items in real-time. The platform includes user authentication, role-based access control, real-time notifications, and supports advanced CRUD operations.

## Features

- User registration and authentication
- Role-based access control (user and admin roles)
- Real-time bidding using Socket.io
- Real-time notifications for bid updates
- CRUD operations for auction items
- Bid management
- Image upload for auction items
- Pagination, search, and filtering for auction items
- Comprehensive logging and error handling

## Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm (Node package manager)

### Steps

1. Clone the repository:
    
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    

2. Install the dependencies:
    
    npm install
    

3. Create a `.env` file in the root directory and configure the following environment variables:
    
    PORT=4000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=yourusername
    DB_PASSWORD=yourpassword
    DB_NAME=yourdatabase
    JWT_SECRET=yourjwtsecret
    

4. Set up the database by running the provided SQL scripts or migrations (ensure PostgreSQL is running):
    
    npm run db:setup
    

5. Start the server:
    
    npm start
    

## Usage

### Running the Server

To start the server, run:

npm start


The server will be running on `http://localhost:4000`.

### Example API Requests

- **Register a new user:**
    
    curl -X POST http://localhost:4000/users/register -d '{"username":"testuser", "password":"password123", "email":"test@example.com"}' -H "Content-Type: application/json"
    

- **Login a user:**
    
    curl -X POST http://localhost:4000/users/login -d '{"username":"testuser", "password":"password123"}' -H "Content-Type: application/json"
    

- **Get all auction items:**
    
    curl -X GET http://localhost:4000/items
    

## API Endpoints

### Users

- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate a user and return a token
- `GET /users/profile` - Get the profile of the logged-in user

### Items

- `GET /items` - Retrieve all auction items (with pagination)
- `GET /items/:id` - Retrieve a single auction item by ID
- `POST /items` - Create a new auction item (Authenticated users, image upload)
- `PUT /items/:id` - Update an auction item by ID (Authenticated users, only item owners or admins)
- `DELETE /items/:id` - Delete an auction item by ID (Authenticated users, only item owners or admins)

### Bids

- `GET /items/:itemId/bids` - Retrieve all bids for a specific item
- `POST /items/:itemId/bids` - Place a new bid on a specific item (Authenticated users)

### Notifications

- `GET /notifications` - Retrieve notifications for the logged-in user
- `POST /notifications/mark-read` - Mark notifications as read

## WebSocket Events

- **Bidding:**
    - `connection` - Establish a new WebSocket connection
    - `bid` - Place a new bid on an item
    - `update` - Notify all connected clients about a new bid on an item

- **Notifications:**
    - `notify` - Send notifications to users in real-time

## Project Structure
- **/config**: Contains database configuration files(conn.js) to connect  with datbase
- **/controller**:Containes `auctioncontoller.js`,`bidcontroller.js`,`jwtmiddleware.js` and  `usercontroller.js` for performing action to the   
- **/services**: Contains service files such as `sendNotification.js` and `winstonLogger.js` for socket and logging functionalities.
- **/routes**: Contains routes files such as `auctionRoutes.js`  `bidRoutes.js`,`userRoutes`,`notificationRoutes` for socket
- **index.js**: Entry point of the application.
- **.env**: Environment variables configuration.

## Testing

To run the tests, use:

npx jest `path`


This project includes unit and integration tests using jest .

## Contact

For any questions or inquiries, please contact:

- **Email**: hs991009.email@gmail.com
- **GitHub**: [ihimanshusharma33](https://github.com/ihimanshusharma33)
- **Linkdin**:[ihimanshusharma33](https://www.linkedin.com/in/ihimanshusharma33/)