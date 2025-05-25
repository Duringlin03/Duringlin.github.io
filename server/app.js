const express = require('express');
const bodyParser = require('body-parser');
const subjectSuggestRouter = require('./subject-suggest');

const app = express();
app.use(bodyParser.json());

app.use(subjectSuggestRouter);

module.exports = app;