const express = require('express');
const cors = require('cors');
const usersApi = require('./routes/usersApi');
const mongoose = require('mongoose');
const config = require('./config/config')
const path = require('path');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', usersApi);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(config.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    app.listen(config.PORT, () => {
      console.log('Запуск сервера...');
    });
  } catch (err) {
    throw err;
  }
}

start();
