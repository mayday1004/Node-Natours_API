const Tour = require('../models/tourModel');

exports.topFiveCheap = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]); //排除'page', 'sort', 'limit', 'fields'項目
    let queryStr = JSON.stringify(queryObj);

    //為query添加條件篩選 : 找出duration>5的
    /* MongoDb用法: {duration:{$gt:5}} */
    // http://localhost:3000/?durantion[gt]=5 => { duration: { 'gt': '5' } } 缺$符
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    //為query添加排序功能: 依照price,ratingsAverage大小排序:升序正數;降序負數
    // http://localhost:3000/api/v1/tours?sort=price,ratingsAverage
    /* Mongoose用法:.sort("price ratingsAverage") */
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    // 為query添加顯示指定內容功能:name、price、difficulty、ratingsAverage、id
    // http://localhost:3000/api/v1/tours?fields=name,price,difficulty,ratingsAverage,id
    /* Mongoose用法:.select("name price difficulty ratingsAverage id") */
    if (req.query.fields) {
      const showFields = req.query.fields.split(',').join(' ');
      query = query.select(showFields);
    } else {
      query = query.select('-__v'); //默認不要顯示__v === Schema中添加select: false,
    }

    // 為query添加分頁功能:1頁10筆內容 1-10 page1; 11-20 page2; 21-30 page3...
    // http://localhost:3000/api/v1/tours?limit=10&page=1
    /* Mongoose用法:.skip((p-1)*limit).limit(10) */
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const totalTours = await Tour.countDocuments(); // 不能用tours.length因為他在執行前
      if (skip >= totalTours) {
        throw new Error('This page does not exist');
      }
    }

    //Execute query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: allTours,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.deleteOne({ _id: req.params.id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
