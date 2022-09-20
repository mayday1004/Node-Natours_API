const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const trycatch = require('../utils/trycatch');
const AppError = require('./../utils/appError');

const signToken = function (id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = trycatch(async (req, res, next) => {
  // 先確認email有沒有被註冊過
  const isExistAc = await User.findOne({ email: req.body.email });

  //! const newUser = await User.create(req.body);  這樣寫很危險，很容易直接串改帳號等級...
  if (isExistAc) {
    return next(new AppError('This account is existed.', 401));
  } else {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    // 註冊時生成JWT令牌，用作未來驗證身分用
    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: newUser,
    });
  }
});

exports.login = trycatch(async (req, res, next) => {
  const { email, password } = req.body;

  //? 1)確認使用者是否輸入email和password
  if (!email || !password) {
    return next(new AppError('please provide email & pasword!', 400));
  }
  //? 2)確認輸入的內容是否存在，如果有錯給錯誤訊息
  const user = await User.findOne({ email }).select('+password'); //! select 方法用於選擇查詢結果中要返回哪些字段

  if (!user || !(await user.comparePassword(password, user.password))) {
    // * 先執行查詢，如果有用戶才會進行比較密碼的動作，否則不會多一個步驟
    return next(new AppError('Incorrect email OR pasword!', 401));
  }

  //? 3)如果都正確發送令牌
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = trycatch(async (req, res, next) => {
  let token;
  // 確認有沒有獲得JWT令牌
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }
  // 驗證JWT令牌是否有效
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // !到這裡為止我們還有兩項安全隱憂需要考慮:1)如果用戶在登入後刪除帳號 2)或是改了密碼那麼舊令牌必須要失效
  //  1)用戶在登入後刪除帳號=>確認資料庫是否還能查到該用戶ID
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('Can not found this AccountID.', 401));
  }
  //  2)確認用戶是否有更改密碼:資料庫內更改密碼的時間(passwordChangedAt)在令牌生成的時間點之後(decoded.iat)代表改過密碼
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please login again.', 401));
  }

  // 這個動作是為了傳遞數據留在後續使用:幫req物件新增一個user項目存了當前User的ID
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // restrictTo('admin','lead-guide'). role='user'
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};
