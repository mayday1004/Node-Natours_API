const User = require('../models/userModel');
const trycatch = require('../utils/trycatch');

exports.signup = trycatch(async (req, res) => {
  console.log('signup');
});
