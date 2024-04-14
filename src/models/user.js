const mongoose = require('mongoose')

const User = mongoose.model('User', {
  name: String,
  birthday: String, 
  phone: String,
  email: String,
  password: String, 
  confirmPassword: String,
})

module.exports = User