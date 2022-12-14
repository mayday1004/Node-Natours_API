const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// ! 缺少{ mergeParams: true }的話會得不到/:toursId
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router.use(authController.protect);
router.route('/me').get(reviewController.getUserReview);
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports = router;
