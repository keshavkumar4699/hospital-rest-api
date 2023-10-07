const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

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

module.exports.login = async function (req, res) {
  try {
    let doctor = await Doctor.find({
      _id: req.query.id,
    });
    if (doctor.length != 0) {
      let token = jwt.sign(
        { name: doctor[0].name, id: String(doctor[0]._id) },
        process.env.JWT_SECRET, //JWT_SECRET from evnvironment variable
        { expiresIn: "24h" } //JWT expires in 24 hours
      );
      res.status(200).send(token);
    } else {
      res.status(404).send("Doctor not Found!");
    }
  } catch (err) {
    console.log("Doctor donot Exist!", err);
    res.status(500).send(err);
  }
};
