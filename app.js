const express = require('express')
const bodyParser = require('body-parser')
const passport = require("passport");
const nsq = require('nsqjs')

const authRouter = require('./routes/auth');

const app = express();
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const reader = new nsq.Reader('test_login', 'test_login', {
    lookupdHTTPAddresses: 'localhost:4161'
})

app.use('/', authRouter);

reader.connect()

reader.on('message', msg => {
    console.log('Received message [%s]: %s', msg.id, msg.body.toString())
    msg.finish()
  })

app.listen(port, () => {
    console.log(`Server started on port ${port} http://localhost:${port}`);
});


