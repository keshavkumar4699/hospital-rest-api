const mongoose = require('mongoose');

const doctorSchema  = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String,
    unique: true,
    require: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
},
{
  timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;