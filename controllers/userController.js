const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const trycatch = require('../utils/trycatch');

const filterObj = (reqBody, ...allowesFields) => {
  const reqBodyCopy = {};
  Object.keys(reqBody).forEach(el => {
    if (allowesFields.includes(el)) {
      reqBodyCopy[el] = reqBody[el];
    }
  });
  return reqBodyCopy;
};

//因為用戶上傳的圖片不總是我們要的尺寸，所以先將用戶上傳的圖存緩存，等到sharp處理完圖片後才儲存
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

//上傳文件功能
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

//修改上傳圖片的大小形狀
exports.resizeUserPhoto = trycatch(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer) // 調用緩存的圖片
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    //路徑從根目錄開始算
    .toFile(`client/public/images/users/${req.file.filename}`);

  next();
});

// 用戶自己更新自己的資料
exports.updateMe = trycatch(async (req, res, next) => {
  //即使在擁有前端之後，無論“updateMe”頁面中是否有更改密碼的選項，任何用戶仍然可以使用Postman嘗試更改我們不希望他們更改的值（例如密碼或角色）。
  //因此，除了我們允許用戶執行的操作之外，過濾掉所有內容是一項附加的安全功能，以防其他用戶嘗試通過 Postman 或其他類似應用程序執行此操作。
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
  }

  // 2) 只允許用戶去更改非密碼以外的資訊，但我們不想讓用戶嘗試通過 Postman強制改寫role的種類，所以在這一步做一些過濾
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  }).select('-__v');

  const token = updatedUser.signToken();
  res.status(200).json({
    status: 'success',
    token,
    user: updatedUser,
  });
});

// 實際上並沒有要真的將帳號從資料庫移除，而是將帳戶設置成非活動狀態，這樣能在未來的時間點重新激活帳戶
// !這樣做可能會違反一些法律規定，有些國家是禁止以這種方式欺騙用戶
// exports.deleteMe = trycatch(async (req, res) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });

//   res.status(204).json({
//     status: 'success',
//     user: null,
//   });
// });

exports.deleteMe = trycatch(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(204).json({
    status: 'success',
    user: null,
  });
});
