const Patient = require("../models/patient");
const Report = require("../models/report");
const Doctor = require("../models/doctor");

//to register new patient
module.exports.register = async function (req, res) {
  try {
    //find patient with given phone
    let patient = await Patient.find({ phone: req.body.phone });
    //create patient if it doesn't exist
    if (patient.length != 0) {
      //if patient found with given phone
      res.status(409).send(patient);
    } else {
      //if patient is not found create one
      let new_patient = await Patient.create(req.body);
      res.status(200).send(new_patient);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//to create patient report
module.exports.create_report = async function (req, res) {
  try {
    //find doctor with id passed in query
    let doctor = await Doctor.find({ _id: req.query.id });
    //if doctor is found
    if (doctor.length != 0) {
      //find patient with id passed in params
      let patient = await Patient.find({ _id: req.params.id });
      //if patient is found
      if (patient.length != 0) {
        //setup report data in this variable for creating new report
        let report_data = {
          patient: req.params.id,
          doctor: req.query.id,
          status: req.body.status,
        };
        const report = await Report.create(report_data);
        //push report created into patient's reports
        await Patient.updateOne(
          { _id: req.params.id },
          { $push: { reports: report } }
        );
        res.status(200).send(report);
      } else {
        //if patient is not found
        res.status(404).send("Patient donot Exist!");
      }
    } else {
      //if doctor is not found
      res.status(404).send("Doctor donot Exist!");
    }
  } catch (err) {
    console.log("error encountered", err);
  }
};

//fetch all reports of patient
module.exports.all_reports = async function (req, res) {
  try {
    //find patient with id passed in params
    let patient = await Patient.find({ _id: req.params.id })
      //sort according to date of creaetion
      .sort({ createdAt: -1 })
      // populate it with reports
      .populate("reports");
    //if patient is found
    if (patient.length != 0) {
      //return reports
      res.status(200).send(patient[0].reports);
    } else {
      //if patient is not found
      res.status(404).send("Patient donot Exist!");
    }
  } catch (err) {
    console.log("error encountered", err);
  }
};
