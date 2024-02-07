# Webapp

## Description
This project aims to create APIs for user management and health checks. It includes endpoints for user creation, retrieval, and updating, as well as a health check endpoint for verifying the database connection.

## Instructions to Run the App
1. Connect SSH agent to GitHub account.
2. Clone the repository: `git clone <ssh>`.
3. Checkout to the main branch: `git checkout main`.
4. Pull the upstream main: `git pull upstream main`.
5. Push to the forked main: `git push origin main`.
6. Install dependencies: `npm install`.
7. Start the server: `npm start`.
8. Endpoints:
   
    - `/healthz`: to check for database connection.

    - `/v1/users/self`: to add, update, and get user data.

        - Endpoint: `/api/users/{user_id}`
        - Method: GET
        - Description: Get user details.
        - Request Header:
            ```
            Authorization: Basic {base64EncodedCredentials}
            ```
        - Status: 200 OK
        - Response Body:
            ```json
            {
                "id": "uuid",
                "username": "example@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "account_created": "timestamp",
                "account_updated": "timestamp"
            }
            ```
        - Error Responses:
            - Status: 401 Unauthorized (if username and password not matched)
            - Status: 404 Not Found (if the user is not found)

        - Endpoint: `/api/users/{user_id}`
        - Method: PUT
        - Description: Update user details.
        - Request Header:
            ```
            Authorization: Basic {base64EncodedCredentials}
            ```
        - Request Body:
            ```json
            {
              "first_name": "Jane",
              "last_name": "Doe",
              "password": "new_password"
            }
            ```
        - Success: Status: 200 OK
        - Error Response:
            - Status: 400 Bad Request (if trying to change the username or providing payload by cookies)
            - Status: 401 Unauthorized (if username and password not matched)

    - Health Check API: Check Health
        - Endpoint: `/healthz`
        - Method: GET
        - Description: Check the health of the API.
        - Response: Status: 200 OK
        - Error Responses:
            - Status: 503 Service Unavailable (if the database connection fails)
            - Status: 405 Method Not Allowed (if the API is called with any method except GET)
            - Status: 404 Not Found (if the path parameter is not `/healthz`)
            - Status: 400 Bad Request (if a payload is passed)

## Workflow
The provided GitHub Actions workflow named "Compile Check" ensures that the code compiles successfully before merging pull requests. It runs on every pull request and checks if the build is successful. If the build fails, it exits with an exit code of 1, causing the workflow to fail.

## Resources Referred
- For Sequelize model designs, hooks, CRUD operations: [Sequelize Documentation](https://sequelize.org/docs/v6/getting-started/)
- For writing GitHub Actions workflows, syntax reference: [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Getting started with GitHub Actions workflow: [GitHub Actions Quickstart](https://docs.github.com/en/actions/quickstart)