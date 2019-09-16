/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(token) {
    jwt.verify(token, process.env.JWT, (err, decodedToken) => {
      if(err) {
        res.status(401).json({
          message: 'leave if you dont have the correct password'
        })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(400).json({
      message: 'Leave if you do not have the magice token'
    })
  }
};
