const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

mongoose
  .connect(process.env.DB)
  .then(() => console.log('DB connection successful! 😎'))
  .catch(() => console.log('DB connection failed! 😭'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
