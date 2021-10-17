const express = require('express');
const passport = require('passport');
const nsq = require('nsqjs');

const router = express.Router();
const nsqWriter = new nsq.Writer('127.0.0.1', 4150);

const isWriter = function (req) {

  nsqWriter.connect()

  nsqWriter.on('ready', () => {
    const message = { host: req.headers.host , auth_basic: req.headers.authorization}
    nsqWriter.publish('test_login', message, err => {
      if (err) { return console.error(err.message) }
      console.log('basic auth sent message')
      nsqWriter.close()
    })
  })


  nsqWriter.on('closed', () => {
    console.log('Writer closed')
  })

  return true;
}

const midPassport = require('../lib/passport');

router.use(passport.initialize());

router.get('/auth/detail/:id', midPassport.isAuthenticated, async function (req, res, next) {
  const doWrite = await isWriter(req);
  if (doWrite) {
    res.send({
      status: 'OK',
      data: req.params
    })
  }
});

module.exports = router;
