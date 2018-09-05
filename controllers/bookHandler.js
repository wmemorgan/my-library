const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DATABASE; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

let db

// Connect to database
mongo.connect(CONNECTION_STRING, async (err, conn) => {
  if (err) throw err
  else {
    db = await conn.collection('books')
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
  let { comment } = req.body
  console.log(`new comment: `, comment)
  let id = ObjectId(req.params.id)
  console.log(`input id: `, id)
  db.update({ '_id': id }, { $push: { comments: comment } }, (err, doc) => {
    if (err) {
      console.error(err)
      res.status(500).send('database update attempt failed')
    } else if (doc === null) {
      res.send('comment not added to book')
    } else {
      db.findOne({ '_id': id }, (err, doc) => {
        if (err) throw err
        else if (doc == null) {
          res.send(`no book exists`)
        } else {
          console.log(doc)
          res.json(doc)
        }
      })
    }
  })
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
  let id = ObjectId(req.params.id)
  console.log(`input id: `, id)
  db.findOne({'_id': id }, (err, doc) => {
    if (err) {
      console.error(err)
      res.status(500).send('database query error')
    } else if (doc === null) {
        res.send('no book exists')
    }
    else {
      res.send(doc)
    }
  })  
}

// Delete selected book
exports.deleteBook = (req, res) => {
  let id = ObjectId(req.params.id)
  console.log(`input id: `, id)
  db.findOne({ '_id': id }, (err, doc) => {
    if (err) {
      console.error(err)
      res.status(400).send(`database query error`)
    }
    else if (doc === null) {
      res.status(400).send('no book exists')
    } else {
        db.deleteOne({ _id: id }, (err, doc) => {
          if (err) {
            console.error(err)
            res.send(`database delete attempt failed`)
          } else if (doc == null) {
            res.send('no book exists')
          }
          else {
            console.log(`delete successful`)
            res.send(`delete successful`)
          }
        })
      }
  })
}

// Delete all books
exports.deleteAllBooks = (req, res) => {
  db.remove()
  res.send(`complete delete successful`)
}




