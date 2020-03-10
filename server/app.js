const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const db = mongoose.connect('mongodb://localhost/cfps');

const port = process.env.PORT || 3000;

const Pupil =  require('./models/pupilModel');
const pupilRouter = require('./routes/pupilsRouter')(Pupil);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use('pupils', pupils);

app.use('/api', pupilRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Christian Family Primary School');
});

app.server = app.listen(port, () => {
  console.log(`Server started on ${port}!`);
});

module.exports = app;