const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.report = async function (req, res) {
  try {
    const status = req.params.status;
    console.log(status);
    let report = await Report.find({ status: status })
      .populate("doctor", "name")
      .populate("patient", "name");
    res.status(200).send(report);
  } catch (err) {
    res.status(500).send(err);
  }
};
