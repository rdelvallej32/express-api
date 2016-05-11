'use strict';

const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  ///underscore makes sure it is a private variable so that it is not modified
  ///it also means we are not explicitly setting it or assigning it. It is also
  //saying that you do not need _owner in order to create an example
  _owner: {
    /// type is the object id
    type: mongoose.Schema.Types.ObjectId,
    /// references User
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

exampleSchema.virtual('length').get(function length() {
  ///no fat arrow because of 'this'
  return this.text.length;
});

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;
