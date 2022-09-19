const User = require('../models/userModel');
const trycatch = require('../utils/trycatch');

exports.getAllUsers = trycatch(async (req, res) => {
  console.log('getAllUsers');
});

exports.getUser = trycatch(async (req, res) => {
  console.log('getUser');
});

exports.createUser = trycatch(async (req, res) => {});

exports.updateUser = trycatch(async (req, res) => {
  console.log('updateUser');
});

exports.deleteUser = trycatch(async (req, res) => {
  console.log('deleteUser');
});
