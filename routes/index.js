const app = require('express').Router();

const AuthorHandler = require('./authors'), Author = new AuthorHandler();
const BooksHandler = require('./books'), Books = new BooksHandler();

app.get('/', (req,res) => res.redirect('/author'))

app.get('/author', Author.index)
app.get('/author/getAll', Author.getAllData)
app.get('/author/create', Author.create)
app.post('/author/create', Author.prosesCreate)
app.get('/author/edit/:id', Author.edit)
app.post('/author/update', Author.prosesEdit)
app.post('/author/delete', Author.delete)

app.get('/books', Books.index)
app.get('/books/create', Books.create)
app.post('/books/create', Books.prosesCreate)
app.get('/books/edit/:id', Books.edit)
app.post('/books/update', Books.prosesUpdate)
app.post('/books/delete', Books.remove)

module.exports = app