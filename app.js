const express = require('express')
const bodyParser = require('body-parser')
const passport = require("passport");

var authRouter = require('./routes/auth');

const app = express();
const port = 3000

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', authRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port} http://localhost:${port}`);
});


