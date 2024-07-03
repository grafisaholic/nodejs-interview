const BooksModel = require('../models/books');
const AuthorModel = require('../models/authors')

const moment = require('moment')
const ObjectId  = require('mongoose').Types.ObjectId;

module.exports = function () {
  this.index = (req,res) => {
    BooksModel.find({}).populate('author_id', '_id name')
    .then(books => {
      let result = books.map(r => {
        return {
          ...r._doc,
          published_at: moment(r.published_at).format('DD MMM YYYY HH:mm'),
          created_at: moment(r.created_at).add(7, 'hour').format('DD MMM YYYY HH:mm'),
          updated_at: r.updated_at ? moment(r.updated_at).add(7, 'hour').format('DD MMM YYYY HH:mm'): '',
        }
      })

      res.render('books', {
        title: "Books",
        books: result
      })
    })
  }

  this.create = async (req,res) => {
    const authors = await AuthorModel.find().sort({ name : 1 });

    res.render('books/create', {
      title: 'Create Data',
      authors
    })
  }

  this.prosesCreate = (req,res) => {
    const { body } = req;

    BooksModel.create({
      title: body.title,
      isbn: body.isbn,
      published_at: moment.utc(body.published, 'yyyy-MM-DD').toDate(),
      author_id: body.author_id,
    }).then(result => {
      return res.json({
        status: 200,
        message: "Sukses created !"
      })
    })
  }

  this.edit = async (req,res) => {
    const { params } = req;

    const authors = await AuthorModel.find()

    BooksModel.findOne({
      _id: new ObjectId(params.id)
    }).then(book => {
      book = {
        ...book._doc,
        ...{
          published_at: moment(book.published_at).format('yyyy-MM-DD')
        }
      }

      res.render('books/edit', {
        title: "Edit",
        book,
        authors
      })
    })
  }

  this.prosesUpdate = (req,res) => {
    const { body } = req;

    BooksModel.updateOne({
      _id: new ObjectId(body.id)
    },{
      $set: {
        title: body.title,
        isbn: body.isbn,
        published_at: moment.utc(body.published, 'yyyy-MM-DD').toDate(),
        author_id: body.author_id,
        updated_at: moment().utc().toDate()
      }
    }).then(result => {
      return res.json({
        status: 200,
        message: "Sukses updated !"
      })
    })
  }

  this.remove = (req,res) => {
    const { body } = req;

    BooksModel.deleteOne({
      _id: new ObjectId(body.id)
    }).then(result => {
      return res.json({
        status: 200,
        message: "Sukses deleted !"
      })
    })
  }
}