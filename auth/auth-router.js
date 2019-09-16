const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 6)
  user.password = hash

  Users.add(user)
    .then(newUser => {
      const token = weNeedAToken(newUser)
      res.status(201).json({
        user: newUser,
        token
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })


});

router.post('/login', (req, res) => {
  let { username, password } = req.body
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = weNeedAToken(user)
        res.status(200).json({
          message: `welcome, ${user.username}`,
          token
        })
      } else {
        res.status(401).json({
          message: 'invalid credentials'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })

});

function weNeedAToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, process.env.JWT, options)
}

module.exports = router;
