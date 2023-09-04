const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const userRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')
const { createUser } = require('./controllers/users')
const { login } = require('./controllers/users')
const { auth } = require('./middlewares/auth')

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env

const app = express()

app.use(express.json())
app.use(helmet())
app.disable('x-powered-by')

app.post('/signin', login)
app.post('/signup', createUser)
app.use(auth)
app.use(cardsRouter)
app.use(userRouter)

app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }))

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Ошибка сервера' });
})

app.listen(PORT, console.log('running'))
