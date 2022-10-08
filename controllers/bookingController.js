const axios = require('axios');
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

exports.payByPrime = trycatch(async (req, res, next) => {
  const post_data = {
    prime: req.body.prime,
    partner_key: 'partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM',
    merchant_id: 'GlobalTesting_CTBC',
    amount: 1,
    currency: 'TWD',
    details: req.body.name,
    cardholder: {
      phone_number: '+886923456789',
      name: 'jack',
      email: 'example@gmail.com',
    },
    remember: false,
  };

  axios
    .post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
      headers: {
        'x-api-key': 'partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM',
      },
    })
    .then(async response => {
      const newBooking = await Booking.create(req.body);
      return res.json({
        status: 'SUCCESS',
        result: newBooking,
      });
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
  const booking = await Booking.findById(req.params.id).populate('reviews');
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    booking: booking,
  });
});

exports.createBooking = trycatch(async (req, res) => {
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'success',
    booking: newBooking,
  });
});

exports.updateBooking = trycatch(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    booking: booking,
  });
});

exports.deleteBooking = trycatch(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    booking: null,
  });
});
