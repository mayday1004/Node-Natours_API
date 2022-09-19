const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const trycatch = require('../utils/trycatch');

exports.signup = trycatch(async (req, res) => {
  //! const newUser = await User.create(req.body);  這樣寫很危險，很容易直接串改帳號等級...
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // 註冊時生成JWT令牌，用作未來驗證身分用
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: newUser,
  });
});
