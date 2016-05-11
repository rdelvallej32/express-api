'use strict';

///this is where the promis is being created
const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/express-template';
mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.exports = mongoose;
