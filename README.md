<h3>Book Store Management Application</h3>

This application is prepared based on a case study scenario.

Note: Node.js 20.11.0 is used for development. Some errors may occur in lower versions

Tech Stack: Node.js, Nest.js, Postgresql

<h4> How to ? </h4>
Before starting, create a new database with PostgreSQL.
There is a sample .env file in the project root directory named .env.example. 

Create a new .env file based on this example file. The application will read important information from the .env file.

After cloning the repository, run the command below in the root directory.
<pre>npm install</pre>

For running the application

<pre>npm run start:dev</pre>

You can check the app documentation on swagger via this link => http://localhost:3000/api-docs

Create a YOUR_JWT_SECRET for the JWT token on .env file.
<pre>JWT_SECRET=YOUR_JWT_SECRET</pre>

To start using the application, it is necessary to trigger the endpoint below. This endpoint will add entries to the database for the admin.

<pre> /health/seed </pre>

You can find the user information in the .env.example file.

<pre>
TEST_USER_NAME
TEST_USER_EMAIL
TEST_USER_PASSWORD
TEST_ROLE_TITLE
TEST_ROLE_KEY
TEST_ROLE_DESC
</pre>


