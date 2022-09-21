const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIquery = require('../utils/APIquery');
const AppError = require('../utils/appError');
const trycatch = require('../utils/trycatch');

const signToken = function (id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

const filterObj = (reqBody, ...allowesFields) => {
  const reqBodyCopy = {};
  Object.keys(reqBody).forEach(el => {
    if (allowesFields.includes(el)) {
      reqBodyCopy[el] = reqBody[el];
    }
  });
  return reqBodyCopy;
};

// 用戶自己更新自己的資料
exports.updateMe = trycatch(async (req, res, next) => {
  //即使在擁有前端之後，無論“updateMe”頁面中是否有更改密碼的選項，任何用戶仍然可以使用Postman嘗試更改我們不希望他們更改的值（例如密碼或角色）。
  //因此，除了我們允許用戶執行的操作之外，過濾掉所有內容是一項附加的安全功能，以防其他用戶嘗試通過 Postman 或其他類似應用程序執行此操作。
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
  }

  // 2) 只允許用戶去更改非密碼以外的資訊，但我們不想讓用戶嘗試通過 Postman強制改寫role的種類，所以在這一步做一些過濾
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // const token = signToken(req.user._id);

  res.status(200).json({
    status: 'success',
    // token,
    data: updatedUser,
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
