const Patient = require("../models/patient");
const Report = require("../models/report");
const Doctor = require("../models/doctor");

module.exports.register = async function (req, res) {
  try {
    //find patient with given phone
    let patient = await Patient.find({ phone: req.body.phone });
    //create doctor if it doesn't exist
    if (patient.length != 0) {
      res.status(409).send("Patient exists!", "/n", patient);
    } else {
      await Patient.create(req.body);
      res.status(200).send("Patient created!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.create_report = async function (req, res) {
  try {
    let doctor = await Doctor.find({ _id: req.query.id });
    if (doctor.length != 0) {
      let patient = await Patient.find({ _id: req.params.id });
      if (patient.length != 0) {
        let report_data = {
          patient: req.params.id,
          doctor: req.query.id,
          status: req.body.status,
          date: req.body.date,
        };
        const report = await Report.create(report_data);
        await Patient.updateOne({ $push: { reports: report } });
        res.status(200).send("Report created");
      } else {
        res.status(404).send("Patient donot Exist!");
      }
    } else {
      res.status(404).send("Doctor donot Exist!");
    }
  } catch (err) {
    console.log("error encountered", err);
  }
};

module.exports.all_reports = async function (req, res) {
  try {
    let patient = await Patient.find({ _id: req.params.id })
      .sort({ createdAt: -1 })
      .populate("reports");
    if (patient.length != 0) {
      res.status(200).send(patient[0].reports);
    } else {
      res.status(404).send("Patient donot Exist!");
    }
  } catch (err) {
    console.log("error encountered", err);
  }
};
