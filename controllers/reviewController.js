const Review = require('../models/reviewModel');
const Tour = require('../models/tourModel');
const APIquery = require('../utils/APIquery');
const AppError = require('../utils/appError');
const trycatch = require('../utils/trycatch');

//review / rating / createdAt / ref to tour / ref to user
exports.setTourUserIds = trycatch(async (req, res, next) => {
  // 1)用postman添加評論才會有req.body.tour/req.body.user的可能
  // 2)真正的情況下用戶登入後只需要在單一旅遊頁面留下review / rating，不會需要自行輸入userID/tourID
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.createReview = trycatch(async (req, res, next) => {
  const foundTour = await Tour.findById(req.body.tour);

  if (!foundTour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newReview.toJSON(),
  });
});

exports.getReview = trycatch(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: review.toJSON(),
  });
});

exports.updateReview = trycatch(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: review.toJSON(),
  });
});

exports.deleteReview = trycatch(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllReviews = trycatch(async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  //Execute query
  const execQuery = new APIquery(Review.find(filter), req.query).sort().fields().page();
  const reviews = await execQuery.foundQuery;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: reviews,
  });
});
