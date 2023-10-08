const Report = require("../models/report");

module.exports.report = async function (req, res) {
  try {
    const status = req.params.status; //get status from params
    let report = await Report.find({ status: status }) //find all reports with given status
      .populate("doctor", "name") //populate report with doctors name to be returned
      .populate("patient", "name"); //populate report with patients name to be returned
    res.status(200).send(report); //send response as report 
  } catch (err) {
    res.status(500).send(err);
  }
};
