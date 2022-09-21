const nodemailer = require('nodemailer');

//在這裡做寄送email的功能
const sendEmail = async options => {
  // 1) 創建傳輸器
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) 設定mail格式
  const mailOptions = {
    from: 'May Chou <welcome@natours.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) 實際寄出
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
