const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');

//query
router.route('/top-5-cheap').get(tourController.topFiveCheap, tourController.getAllTours);
//aggregation
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-Plan/:year').get(tourController.getMonthlyPlan);

router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
