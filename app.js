const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb'} = process.env;

const app = express();

app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');

app.use((req, res, next) => {
  req.user = {
    _id: '64f3551f29cba9b2c89bcce3',
  };

  next();
});

app.use(userRouter);
app.use(cardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, console.log('running'));
