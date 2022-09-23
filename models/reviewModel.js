// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

// 防止用戶對同一個行程重複評論
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/save|^find/i, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// 為tourModel的ratingsQuantity/ratingsAverage兩個fields自動計算
// 這兩個fields分別記錄評論數量，以及平均評分
// 每當評論有增減這兩個fields更動，自動計算數量/平均評分，
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// 也就是說每次create/update/delete評論的情況都要調用calcAverageRatings()
reviewSchema.post(/save|^findOneAnd/, async function (doc) {
  await doc.constructor.calcAverageRatings(doc.tour);
});

reviewSchema.methods.toJSON = function () {
  const sentReviewData = this.toObject();
  delete sentReviewData.__v;
  return sentReviewData;
};

module.exports = mongoose.model('Review', reviewSchema);
