const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

// POST /tours/234fad4/reviews
// GET /tours/234fad4/reviews
router.use('/:tourId/reviews', reviewRouter);

//query
router.route('/top-5-cheap').get(tourController.topFiveCheap, tourController.getAllTours);
//aggregation
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-Plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

//取得center半徑distance(英里/公里)的行程
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
// /tours-within?distance=233&center=-118.113491,34.111745&unit=mi
// /tours-within/233/center/34.111745,-118.113491/unit/mi

//取得指定點到旅行目的地的距離
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
// /distances/34.111745,-118.113491/unit/mi

router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
