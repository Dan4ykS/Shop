const express = require('express');
const vhost = require('vhost');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const usersApi = require('./routes/usersApi');
const goodsApi = require('./routes/goodsApi');
const reviewsApi = require('./routes/reviewsApi');
const genresApi = require('./routes/genresApi');
const mongoose = require('mongoose');
const config = require('./config/config');
const path = require('path');

const main = express();
const app = express();
const port = process.env.NODE_ENV === 'production' ? 80 : config.PORT;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', usersApi, goodsApi, reviewsApi, genresApi);


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

main.use(vhost('shop.dan4yk.ru', app));

(async () => {
  try {
    await mongoose.connect(config.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    main.listen(port, () => {
      console.log(`Запуск сервера на порту ${port}...`);
    });
  } catch (err) {
    throw err;
  }
})();
