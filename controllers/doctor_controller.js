const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

module.exports.register = async function (req, res) {
  try {
    //find all doctors with given phone or email
    let doctors = await Doctor.find({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });

    //check if doctor exists or not
    if (doctors.length != 0) { //if doctor exists
      res.status(409).send("Doctor exists!");
    } else { //if doctor is not found
      const doctor = await Doctor.create(req.body); //create doctor with passed parameters
      res.status(200).send(doctor);
    }
  } catch (err) {
    res.status(500).send(err);//if error encountered
  }
};

module.exports.login = async function (req, res) {
  try {
    let doctor = await Doctor.find({
      _id: req.params.id,
    }); //find doctor with id passed in params
    // if doctor is found
    if (doctor.length != 0) {
      let token = jwt.sign(
        { name: doctor[0].name, id: String(doctor[0]._id) }, //set variables in jwt token
        process.env.JWT_SECRET, //JWT_SECRET from evnvironment variable
        { expiresIn: "24h" } //JWT expires in 24 hours
      );
      res.status(200).send(token);
    } else { 
      res.status(404).send("Doctor not Found!"); //if doctor is not found
    }
  } catch (err) {
    console.log("Doctor donot Exist!", err); 
    res.status(500).send(err); //if error encountered
  }
};
