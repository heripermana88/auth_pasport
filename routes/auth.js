var express = require('express');
var passport = require('passport');

var router = express.Router();

const midPassport = require('../lib/passport');

router.use(passport.initialize());

router.get('/auth/detail/:id', midPassport.isAuthenticated, function (req, res, next) {
  res.send({
    status: 'OK',
    data:req.params
  })
});

module.exports = router;
