const Doctor = require("../models/doctor");

module.exports.register = async function (req, res) {
  try {
    //find all doctors with given phone or email
    let doctors = await Doctor.find({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });

    //create doctor if it doesn't exist
    if (doctors.length != 0) {
      res.status(409).send("Doctor exists!");
    } else {
      await Doctor.create(req.body);
      res.status(200).send("Doctor created!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.login = function (req, res) {
  console.log(req.query.id);
  console.log(req.params.id);
};