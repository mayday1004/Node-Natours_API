const Review = require('../models/reviewModel');
const APIquery = require('../utils/APIquery');
const AppError = require('../utils/appError');
const trycatch = require('../utils/trycatch');

exports.getAllReviews = trycatch(async (req, res) => {
  //Execute query
  const execQuery = new APIquery(Review, req.query).sort().fields().page();
  const reviews = await execQuery.foundQuery;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: reviews,
  });
});

exports.getReview = trycatch(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: review,
  });
});

//review / rating / createdAt / ref to tour / ref to user

exports.setTourUserIds = trycatch(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.createReview = trycatch(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newReview,
  });
});

exports.updateReview = trycatch(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: review,
  });
});

exports.deleteReview = trycatch(async (req, res, next) => {
  const review = await Review.deleteOne({ _id: req.params.id });

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
