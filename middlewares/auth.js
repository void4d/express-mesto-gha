const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secretstring'

function auth(req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' })
  }

  const token = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch {
    res.status(401).send({ message: 'Необходима авторизация' })
  }

  req.user = payload

  next()
}

module.exports = { auth }
