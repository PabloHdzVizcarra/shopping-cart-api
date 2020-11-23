const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.authenticatedToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    console.log('ERROR: no estas autenticado')
    return res.sendStatus(401)
  }

  jwt.verify(token, config.KEY_JWT, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
    return null
  })
}
