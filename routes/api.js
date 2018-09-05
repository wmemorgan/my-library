/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

const bookHandler = require('../controllers/bookHandler')

module.exports = function (app) {

  app.route('/api/books')
    .get(bookHandler.listAllBooks)
    
    .post(bookHandler.addBook)
    
    .delete(bookHandler.deleteAllBooks);

  app.route('/api/books/:id')
    .get(bookHandler.displayBook)
    
    .post(bookHandler.addComment)
    
    .delete(bookHandler.deleteBook);
  
};
