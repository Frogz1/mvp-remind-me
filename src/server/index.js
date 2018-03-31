const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

app.use(jsonParser());

