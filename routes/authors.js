const AuthorModel = require('../models/authors');

const ObjectId = require('mongoose').Types.ObjectId
const moment = require('moment')

module.exports = function () {
  this.index = (req,res) => {
    AuthorModel.find({})
      .then(authors => {
        let result = authors.map(r => {
          return {
            ...r._doc,
            created_at: moment(r.created_at).add(7, 'hour').format('DD MMM YYYY HH:mm'),
            updated_at: r.updated_at ? moment(r.updated_at).add(7, 'hour').format('DD MMM YYYY HH:mm'): '',
          }
        })

        res.render('author', {
          authors: result,
          title: "Author Model"
        })
      })
  }

  this.getAllData = (req,res) => {
    const where = {}

    AuthorModel.find(where)
      .then(authors => {
        let result = authors.map(r => {
          return {
            ...r._doc,
            created_at: moment(r.created_at).add(7, 'hour').format('DD MMM YYYY HH:mm'),
            updated_at: r.updated_at ? moment(r.updated_at).add(7, 'hour').format('DD MMM YYYY HH:mm'): '',
          }
        })

        return res.json({
          status: 200,
          data : result
        })
      })
  }

  this.create = (req,res) => {
    res.render('author/create', {
      title: 'Create Data'
    })
  }

  this.prosesCreate = (req,res) => {
    const { body } = req;

    AuthorModel.create({
      name: body.name,
      email: body.email
    }).then(result => {
      return res.json({
        status: 200,
        message: "Sukses created !"
      })
    })
  }

  this.edit = (req,res) => {
    const { params } = req;

    AuthorModel.findOne({
      _id: new ObjectId(params.id)
    }).then(author => {
      res.render('author/edit', {
        title: "Edit",
        author
      })
    })
  }

  this.prosesEdit = (req,res) => {
    const { body } = req;

    AuthorModel.updateOne({
      _id: new ObjectId(body.id)
    },{
      $set: {
        name: body.name,
        email: body.email,
        updated_at: moment().utc().toDate()
      }
    }).then(result => {
      return res.json({
        status: 200,
        message: "Sukses updated !"
      })
    })
  }

  this.delete = (req,res) => {
    const { body } = req;

    AuthorModel.deleteOne({
      _id: new ObjectId(body.id)
    }).then(result => {
      return res.json({
        status: 200,
        message: "Sukses deleted !"
      })
    })
  }
}