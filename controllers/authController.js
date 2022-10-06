const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const trycatch = require('../utils/trycatch');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/nodemailer');

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
    });

    // 註冊時生成JWT令牌，用作未來驗證身分用

    const token = newUser.signToken();
    res.status(201).json({
      status: 'success',
      token,
      user: newUser.toJSON(),
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
  const token = user.signToken();
  res.status(200).json({
    status: 'success',
    token,
    user: user.toJSON(),
  });
});

exports.protect = trycatch(async (req, res, next) => {
  let token;
  // 確認有沒有獲得JWT令牌
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
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

exports.forgotPassword = trycatch(async (req, res, next) => {
  // 1) 根據用戶提供的Email來確認資料庫是不是真的有這個帳號
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) 生成改密碼email上的連結隨機碼，隨機碼為原始token，同時加密的token則存在資料庫裡
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateModifiedOnly: true }); // 保存用戶更新而不跳過驗證步驟並且僅驗證修改的字段的單線解決方案：

  // 3) Send it to user's email
  const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: 
											${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateModifiedOnly: true });

    return next(new AppError('There was an error sending the email. Try again later!'), 500);
  }
});

exports.resetPassword = trycatch(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    // 1) 確認用戶email的隨機碼Token經過加密與資料庫存的加密隨機碼一致
    passwordResetToken: hashedToken,
    // 2) 且隨機碼期限在10分鐘以內
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Update changedPasswordAt property before user.save
  // 4) Log the user in, send JWT

  const token = user.signToken();
  res.status(200).json({
    status: 'success',
    token,
    user: user.toJSON(),
  });
});

exports.logout = (req, res) => {
  req.user = null;
  res.status(200).json({ status: 'success', token: null, user: null });
};

// 用戶自己更新自己的密碼
exports.updatePassword = trycatch(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) 讓用戶再次輸入當前密碼，確認無誤才放行更改密碼
  if (!(await user.comparePassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  const token = user.signToken();
  res.status(200).json({
    status: 'success',
    token,
    user: user.toJSON(),
  });
});
