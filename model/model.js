const mongoose = require('mongoose');
// this is a schema made in mongodb
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   auto: true, // If you want MongoDB to generate the ObjectId automatically
  // },
  // this will show time of filling the form
  createdAt: {
    type: Date,
    default: Date.now
  }
});
//this User is now used for all the CRUD operation
const User = mongoose.model('User', userSchema);

module.exports = User;