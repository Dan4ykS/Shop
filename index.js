const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usersApi = require('./routes/usersApi');
const goodsApi = require('./routes/goodsApi');
const reviewsApi = require('./routes/reviewsApi');
const generesApi = require('./routes/generesApi');
const mongoose = require('mongoose');
const config = require('./config/config');
const path = require('path');

const app = express();
const port = process.env.NODE_ENV === 'production' ? 80 : config.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', usersApi, goodsApi, reviewsApi, generesApi);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

(async () => {
  try {
    await mongoose.connect(config.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => {
      console.log(`Запуск сервера на порту ${port}...`);
    });
  } catch (err) {
    throw err;
  }
})();
