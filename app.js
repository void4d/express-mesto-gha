const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64e6846123a3071b1be5a7ca',
  };

  next();
});

app.use(userRouter);
app.use(cardsRouter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
