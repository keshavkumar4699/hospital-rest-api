# hospital-rest-api
design the server side for a hospital api

set follwing environment variables
PORT
JWT_SECRET

## HOW TO SETUP PROJECT
1. run npm i to install following packages
  dotenv
  express
  mongoose
  nodemon
  jsonwebtoken
2. set port env variable 
  -> set PORT=<port_number>
  -> set JWT_SECRET=<jwt_secret_key>
3. run script to start -> npm start

## FOLDER STRUCTURE
project
│   README.md
│   index.js
|   package.json    
|   LICENSE    
│
└───models
|   │   doctor.js
|   │   patient.js
|   │   report.js
|
└───controllers
|   │   doctor_controller.ejs
|   │   patient_controller.ejs
|   │   report_controller.ejs
|
└───config
|   │   mongoose.ejs
|
└───routes
|   │   doctor_router.js
|   │   index_router.js
|   │   report_router.js
|   │   patient_router.js

## API Routes
-	/doctors/register → with username and password
-	/doctors/login → returns the JWT to be used
-	/patients/register 
-	/patients/:id/create_report
-	/patients/:id/all_reports → List all the reports of a patient oldest to latest
