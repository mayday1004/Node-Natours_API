const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
