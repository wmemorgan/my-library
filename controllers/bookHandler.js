const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DATABASE; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

// Connect to database
mongo.connect(CONNECTION_STRING, (err, conn) => {
  if (err) throw err
  else {
    db = conn.collection('books')
    console.log(`Successfully connected to: ${CONNECTION_STRING}`)
  }
})

// Add new book
exports.addBook = (req, res) => {
  let { title } = req.body
  if (!title || title == '') {
    res.status(400).send('No book title added')
  } else {
    db.insertOne(
      {
        title: title,
        comments: []
      }, (err, doc) => {
          if (err) {
            console.error(err)
            res.status(500).send(err)
          }
          else {
            res.json(doc.ops[0])
          }
        }
    )} 
}

// Add book comments
exports.addComment = (req, res) => {

  res.send(`New comment added`)
}

// List all books
exports.listAllBooks = (req, res) => {
  db.find()
  .toArray((err, doc) => {
    if (err) {
      console.error(err)
      res.status(500).send(err)
    }
    else {
      // Code inspired by Drinka Ľubomír https://github.com/lubodrinka/Personal-Library/blob/master/routes/api.js
      results = doc.map(d => d={ "_id": d._id, "title": d.title, "commentCount": d.comments.length })
      res.send(results)
    }
  })
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




