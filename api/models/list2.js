var mongoose = require('mongoose');

var schema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true,
    text: true
  },
  username: {
    type: String,
    required: true,
    text: true
  }
}, {versionKey: false});

mongoose.model('List2', schema);