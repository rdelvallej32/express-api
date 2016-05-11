'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Example = models.example;

const authenticate = require('./concerns/authenticate');

///next is a tool for moving you along with whatever you entered for error catching
///same way as saying 'throw an error' in express.

//the purpose its a Get request that displays the entire collection using
//the middleware.
const index = (req, res, next) => {

  Example.find()
  //So it doesn't matter if its plural or singular, but for reading code it is
  //needed to use correct semantics for reading code. In this case, its plural
  //because you are getting all.
    .then(examples => res.json({ examples }))
    ///It catches the error, and then use the 'next' to display it
    .catch(err => next(err));
};

const show = (req, res, next) => {
  //mongoose provides the id
  Example.findById(req.params.id)
  ////this checks to see if the id is real and if not then next sends an error
  ////as a response. It determines what response if it doesnt exist
    .then(example => example ? res.json({ example }) : next())
    ///console log will not do much here, its better to use next so that ajax
    /// knows it is an error
    .catch(err => next(err));
};

const create = (req, res, next) => {
  //the data is coming from the req
  ///Create an object with the request body and then make a key value pair
  //of owner and current user id
  let example = Object.assign(req.body.example, {
    _owner: req.currentUser._id,
  });

  ///then create the object to set it up as 'ready' for the database
  Example.create(example)
    .then(example => res.json({ example }))
    .catch(err => next(err));
};

const update = (req, res, next) => {

  ///need to search for the record first in order to update
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Example.findOne(search)
    .then(example => {
      if (!example) {
        return next();
      }

      ///what is delete doing here?
      delete req.body._owner;  // disallow owner reassignment.
      return example.update(req.body.example)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  ///need to search for the record first in order to delete
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Example.findOne(search)
    .then(example => {
      ///checks to see if it exists and then returns error if it doesnt exist
      if (!example) {
        return next();
      }

      return example.remove()
      ///use terminal handler response that send status to signal 'end'
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });
