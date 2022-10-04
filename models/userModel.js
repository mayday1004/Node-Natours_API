const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, "Password can't less than 8 character"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // mongoose:Document.prototype.isModified() 送進來的資料password有異動就會回傳true
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined; // 密碼確認且加密完就不需要這個ㄌ
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

userSchema.methods.comparePassword = async function (originPassword, cryptoPassword) {
  return await bcrypt.compare(originPassword, cryptoPassword); // 驗證原始密碼跟加密後密碼是否相等
};

userSchema.methods.changedPasswordAfter = function (decodedIat) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return decodedIat < changedTimestamp; //更改密碼的時間(passwordChangedAt)在令牌生成的時間點之後(decoded.iat)代表改過密碼
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // 產生一個 32Bytes 長度的亂數資料，並轉成字串
  const resetToken = crypto.randomBytes(32).toString('hex');
  // 將resetToken利用sha256加密，並返回16進製字串，最後存進資料庫
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  //加密後的token期限10分鐘
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.signToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 不想res一些屬性給用戶看到
userSchema.methods.toJSON = function () {
  const sentUserData = this.toObject();
  delete sentUserData.password;
  delete sentUserData.passwordChangedAt;
  delete sentUserData.active;
  delete sentUserData.__v;
  delete sentUserData._id;
  return sentUserData;
};

module.exports = mongoose.model('User', userSchema);
