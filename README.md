# Express.js API Server

This is a simple Express.js API server that provides CRUD functionality for managing users. It allows you to create, retrieve, update, and delete user records.

## Prerequisites

- Node.js (v12 or above)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

   `git clone https://github.com/CSIS-3380-001/crud-api.git`

2. Navigate to the project directory:

    `cd crud-api`

3. Install the dependencies:

    `npm install`

4. Start the server:

    `npm start`

The server will start running on http://localhost:3000.

## API Endpoints
The following API endpoints are available:

`GET /getusers` : Get all users.
`GET /getuser/:username` : Get a specific user by username.
`POST /newuser` : Create a new user.
`PUT /user/:username` : Update a user by username.
`DELETE /user/:username` : Delete a user by username.

## Testing
To run the test cases, use the following command:

`npm run tests`

The tests are written using the Jest framework and utilize the Supertest library for making HTTP requests to the API.
