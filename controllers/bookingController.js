const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const APIquery = require('../utils/APIquery');
const trycatch = require('../utils/trycatch');
const AppError = require('../utils/appError');

exports.getCurrentUserBooking = trycatch(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    booking: bookings,
  });
});

exports.getAllBookings = trycatch(async (req, res) => {
  //Execute query
  const execQuery = new APIquery(Booking, req.query).sort().fields().page();
  const bookings = await execQuery.foundQuery;

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    booking: bookings,
  });
});

exports.getBooking = trycatch(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    tour: tour,
  });
});

exports.createBooking = trycatch(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    tour: newTour,
  });
});

exports.updateBooking = trycatch(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    tour: tour,
  });
});

exports.deleteBooking = trycatch(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    tour: null,
  });
});
