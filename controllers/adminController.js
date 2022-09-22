const User = require('../models/userModel');
const APIquery = require('../utils/APIquery');
const AppError = require('../utils/appError');
const trycatch = require('../utils/trycatch');

exports.getAllUsers = trycatch(async (req, res) => {
  //Execute query
  const execQuery = new APIquery(User, req.query).sort().fields().page();
  const users = await execQuery.foundQuery;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.getUser = trycatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

//管理員更新所有用戶的資料
exports.updateUser = trycatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.deleteUser = trycatch(async (req, res, next) => {
  const user = await User.deleteOne({ _id: req.params.id });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});