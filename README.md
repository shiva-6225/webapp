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

## Integration Testing

Integration tests are written using Jest to ensure that APIs function correctly by interacting with a MySQL server. These tests cover scenarios such as creating, updating, and retrieving user data. The database configuration variables are stored securely using GitHub Secrets and accessed via Sequelize for database connections.

### Running Integration Tests

To execute integration tests, run the following command:

```bash
npm test
```

## Setup

1. Clone the repository.
2. Set up the necessary credentials and configurations for GCP and GitHub Secrets.
3. Modify any configurations as needed for your environment.
4. Execute Terraform to provision the infrastructure.
5. Run integration tests to verify functionality.

# Packer Template: WebApp Image Provisioning

This Packer template automates the creation of a custom image for a web application deployment on Google Cloud Platform (GCP). The image is preconfigured with necessary dependencies, services, and application setup to streamline the deployment process.

## Prerequisites

Before using this Packer template, ensure you have the following prerequisites installed and configured:

- Packer
- Google Cloud SDK (gcloud)
- Access to a GCP project with necessary permissions
- SSH Key Pair for authentication

## Variables

The Packer template uses the following variables:

- `project_id`: GCP project ID where the image will be created.
- `gcp_region`: GCP region where the instance will be launched.
- `gcp_zone`: GCP zone where the instance will be launched.
- `gcp_profile`: GCP profile to use for authentication.
- `source_image`: Source image for the base instance.
- `ssh_username`: SSH username for connecting to the instance.
- `MYSQL_USERNAME`: MySQL username for database setup.
- `MYSQL_SERVER_URL`: MySQL server URL for database setup.
- `MYSQL_PASSWORD`: MySQL password for database setup.
- `MYSQL_DATABASE`: MySQL database name.
- `MYSQL_PORT`: MySQL port number.
- `project_path`: Path to the project files to be copied to the instance.
- `auth_file`: Path to the authentication file for GCP.

## Provisioners

The Packer template utilizes the following provisioners:

1. **Shell Provisioner (install-dependencies.sh):**
   - Installs dependencies required for the web application.

2. **Shell Provisioner (configure_services.sh):**
   - Configures services and sets environment variables for MySQL database.

3. **File Provisioner:**
   - Copies project files to the instance.

4. **File Provisioner:**
   - Copies systemd service configuration file to the instance.

5. **Shell Provisioner (setupApp.sh):**
   - Sets up the web application using environment variables.

6. **Shell Provisioner (startService.sh):**
   - Starts the web application service on the instance.

## Usage

1. Configure the required variables in the Packer template.
2. Run Packer build to create the custom image:

   ```bash
   packer build <packer_template_file>


## Resources Referred
- For Sequelize model designs, hooks, CRUD operations: [Sequelize Documentation](https://sequelize.org/docs/v6/getting-started/)
- For writing GitHub Actions workflows, syntax reference: [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Getting started with GitHub Actions workflow: [GitHub Actions Quickstart](https://docs.github.com/en/actions/quickstart)
- Writing integration tests in Jest: https://jestjs.io/docs/getting-started
