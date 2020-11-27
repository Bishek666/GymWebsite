const mongoose = require('mongoose');

const EmpProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  employeeJob: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  social: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EmpProfile = mongoose.model('emp_Profile', EmpProfileSchema);
