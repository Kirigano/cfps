const mongoose = require('mongoose');
const {Schema} = mongoose;

const pupilModel = new Schema({
  fName: String,
  mName: String,
  sName: String,
  dateOfBirth: Date,
  gender: String,
  classAdmitted: String,
  dateOfAdmission: Date
});

module.exports = mongoose.model('Pupil', pupilModel);