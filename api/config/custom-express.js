var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = () => {
  var app = express();

  const corsOptions = {
    exposedHeaders: ['Authorization', 'x-access-token'],
  };

  app.use(cors(corsOptions));
  app.options('*', cors());

  app.use(bodyParser.json());
  app.set('secret', 'q!w@e#r$t%y');

  consign()
    .include('models')
    .then('api')
    .then('controllers/auth.js')
    .then('controllers')
    .into(app);

  return app;
}