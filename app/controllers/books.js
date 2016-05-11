'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Book = models.book;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Book.find()
    .then(books => res.json({ books }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => book ? res.json({ book }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let book = Object.assign(req.body.book, {
    _owner: req.currentUser._id,
  });
  Book.create(book)
    .then(book => res.json({ book }))
    .catch(err => next(err));
  };

  const update = (req, res, next) => {
    ///need to search for the record first in order to update
    let search = { _id: req.params.id, _owner: req.currentUser._id };
    Book.findOne(search)
      .then(book => {
        if (!book) {
          return next();
        }

        ///what is delete doing here? its explicitly disallowing any chance
        //of changing _owner
        delete req.body._owner;  // disallow owner reassignment.
        return book.update(req.body.book)
          .then(() => res.sendStatus(200));
      })
      .catch(err => next(err));
  };

  const destroy = (req, res, next) => {
    ///need to search for the record first in order to delete
    let search = { _id: req.params.id, _owner: req.currentUser._id };
    Book.findOne(search)
      .then(book => {
        ///checks to see if it exists and then returns error if it doesnt exist
        if (!book) {
          return next();
        }

        return book.remove()
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
