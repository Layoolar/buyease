const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },

});

// const regex =new RegExp(String, 'i') 

// userSchema.statics.findByEmail = function(email) {
//   return this.find({email: regex})
// }

// userSchema.statics.findByPhone = function (phone) {
//   return this.find({ phone: regex})
// }

// userSchema.statics.findByName = function (name) {
//   return this.find({ phone: regex })
// }


const User = mongoose.model("User", userSchema);

module.exports = User;
