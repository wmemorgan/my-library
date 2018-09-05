const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DATABASE; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

// Connect to database
// mongo.connect(CONNECTION_STRING, (err, conn) => {
//   if (err) throw err
//   else {
//     db = conn.collection('books')
//     console.log(`Successfully connected to: ${CONNECTION_STRING}`)
//   }
// })

// Add new book
exports.addBook = (req, res) => {

  res.send(`New book added`)
}

// Add book comments
exports.addComment = (req, res) => {

  res.send(`New comment added`)
}

// List all books
exports.listAllBooks = (req, res) => {

  res.send('List all books')
}

// Display book details
exports.displayBook = (req, res) => {

  res.send('Display book details')
}

// Delete selected book
exports.deleteBook = (req, res) => {

  res.send(`delete successful`)
}

// Delete all books
exports.deleteAllBooks = (req, res) => {

  res.send(`complete delete successful`)
}




