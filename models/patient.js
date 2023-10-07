const mongoose = require('mongoose');

const patientSchema  = new mongoose.Schema({
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
    unique: true,
  },
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Report'
    },
  ]
},
{
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;