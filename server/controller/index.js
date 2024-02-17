
var model = require('../model');

module.exports.movies = {
  get: function (req,res) {
    model.movies.getAll((error,results) => {
      if (error) {
        console.error('cannot retrieve movies from the database: ', error);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },
  post: function (req,res) {
   model.movies.create(req.body, (err, result) => {
    if (err) {
      console.error('cannot post messages to the database: ', err);
      res.sendStatus(500);
    }
    res.sendStatus(201);
   })
  }
}

