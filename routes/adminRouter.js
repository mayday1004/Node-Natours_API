const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(adminController.getAllUsers).post(adminController.createUser);
router
  .route('/:id')
  .get(adminController.getUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

module.exports = router;
