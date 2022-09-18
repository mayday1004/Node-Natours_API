const Tour = require('../models/tourModel');
const APIquery = require('../utils/APIquery');
const trycatch = require('../utils/trycatch');

exports.topFiveCheap = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = trycatch(async (req, res) => {
  //Execute query
  const buildQuery = new APIquery(Tour.find(), req.query).filter().sort().fields().page();
  const tours = await buildQuery.foundQuery;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
});

exports.getTour = trycatch(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

exports.createTour = trycatch(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newTour,
  });
});

exports.updateTour = trycatch(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

exports.deleteTour = trycatch(async (req, res) => {
  await Tour.deleteOne({ _id: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTourStats = trycatch(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        totalTours: { $sum: 1 },
        totalRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: stats,
  });
});

exports.getMonthlyPlan = trycatch(async (req, res) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        totalTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { totalTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: plan.length,
    data: {
      plan,
    },
  });
});
