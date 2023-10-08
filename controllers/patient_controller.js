const Patient = require("../models/patient");
const Report = require("../models/report");
const Doctor = require("../models/doctor");

//to register new patient
module.exports.register = async function (req, res) {
  try {
    //find patient with given phone
    let patient = await Patient.find({ phone: req.body.phone });
    //create patient if it doesn't exist
    if (patient.length != 0) { //if patient found with given phone
      res.status(409).send("Patient exists!", "/n", patient); 
    } else { //if patient is not found create one
      await Patient.create(req.body);
      res.status(200).send("Patient created!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//to create patient report
module.exports.create_report = async function (req, res) {
  try {
    let doctor = await Doctor.find({ _id: req.query.id }); //find doctor with id passed in query
    if (doctor.length != 0) { //if doctor is found
      let patient = await Patient.find({ _id: req.params.id }); //find patient with id passed in params
      if (patient.length != 0) { //if patient is found
        let report_data = {
          patient: req.params.id,
          doctor: req.query.id,
          status: req.body.status,
          date: req.body.date,
        }; //setup report data in this variable for creating new report
        const report = await Report.create(report_data);
        await Patient.updateOne({ $push: { reports: report } }); //push report created into patient's reports
        res.status(200).send("Report created");
      } else { //if patient is not found
        res.status(404).send("Patient donot Exist!"); 
      }
    } else { //if doctor is not found
      res.status(404).send("Doctor donot Exist!");
    }
  } catch (err) {
    console.log("error encountered", err);
  }
};

//fetch all reports of patient
module.exports.all_reports = async function (req, res) {
  try {
    let patient = await Patient.find({ _id: req.params.id }) //find patient with id passed in params
      .sort({ createdAt: -1 }) //sort according to date of creaetion
      .populate("reports"); // populate it with reports
    if (patient.length != 0) { //if patient is found
      res.status(200).send(patient[0].reports); //return reports
    } else { //if patient is not found
      res.status(404).send("Patient donot Exist!");
    }
  } catch (err) {
    console.log("error encountered", err);
  }
};
