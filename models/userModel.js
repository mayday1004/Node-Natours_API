const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
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

module.exports = mongoose.model('User', userSchema);
