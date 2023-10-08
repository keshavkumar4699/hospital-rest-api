# Hospital REST API

A REST API for the doctors of a Hospital where they can keep track of COVID-19 patients for their testing, quarantine and well-being

There are 2 types of USERS

- Doctors (can login)
- Patients

Each time patient visits

- register patient with phone
- if exist create report after checkup

Patient report has field

- created by Doctor
- Status [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]
- date

## how to setup project

Follow given steps to run this project on your local machine

1. clone this repository

```$ git clone https://github.com/keshavkumar4699/hospital-rest-api```

2. Install required dependencies

```$ npm install```

3. Set port env variables

```$ set PORT=<port_number>```

```$ set JWT_SECRET=<jwt_secret_key>```

4. Start application

```$ npm start```

5. Open application in browser

```$ http://localhost:<PORT>```

## Usage

Once you have the application up and running, you can run there APIs in post man with following routes:

- Register Doctor with fields
  - name
  - phone
  - password
  - email

```/doctors/register```

- Login Doctor with query params
  - id
  
```/doctors/login```

- Register Patient with fields
  - name
  - phone
  
```/patients/register```

- Create patient report with query param
  - doctor id
  
`/patients/:id/create_report`

- List all reports of patient
  
```/patients/:id/all_reports```

-List reports by their status
  
```/reports/:status```

## folder structure

```
project
│ README.md
│ index.js
| package.json
| LICENSE
│
└───models
| │ doctor.js
| │ patient.js
| │ report.js
|
└───controllers
| │ doctor_controller.ejs
| │ patient_controller.ejs
| │ report_controller.ejs
|
└───config
| │ mongoose.ejs
|
└───routes
| │ doctor_router.js
| │ index_router.js
| │ report_router.js
| │ patient_router.js
```