const prisma = require('../helpers/database')
const config = require('../config/app.config.json')
const jwt = require('jsonwebtoken')

/**
 * Authorize user logged in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const userSession = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, config.jwt.secret)

      const user = await prisma.auth_user.findFirst({
        where: {
          id_user: decoded.id,
          deleted_at: null
        },
        select: {
          id_user: true,
          username: true,
          level: true
        }
      })

      if (user) {
        req.user = {
          id: user.id_user,
          username: user.username,
          level: user.level
        }

        next()
      } else {
        res.status(401).send({ message: 'Not authorized' })
      }
    } catch (error) {
      res.status(401).send({ message: 'Not authorized Error. Token Expired.' })
    }
  }

  if (!token) {
    res.status(401).send({
      message: 'Not authenticated, no token'
    })
  }
}

/**
 * Verify user level is admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.level === 0) {
      next()
    } else {
      res.status(401).send({
        status: false,
        error: "You're not authorized"
      })
    }
  } catch (error) {
    res.status(400).send({
      status: false,
      error
    })
  }
}

module.exports = { userSession, verifyAdmin }
