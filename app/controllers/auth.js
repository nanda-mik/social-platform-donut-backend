const User = require('../models/User')
const HttpStatus = require('http-status-codes')
const activityHelper = require('../utils/activity-helper')

module.exports = {
  authenticateUser: async (req, res, next) => {
    const email = escape(req.body.email)
    const password = escape(req.body.password)
    try {
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.send({ user: user, token: token })
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  },
  logout: (req, res, next) => {
    activityHelper.addActivityToDb(req, res)
    res.status(HttpStatus.OK).json({ success: 'ok' })
  },
  logoutAll: (req, res, next) => {
    activityHelper.addActivityToDb(req, res)
    res.status(HttpStatus.OK).json({ success: 'ok' })
  }
}
