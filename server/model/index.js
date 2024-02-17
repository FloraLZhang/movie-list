var db = require('../db');

module.exports.movies = {
  // a function to get all the movies
  getAll: function (callback) {
    db.query("SELECT * FROM movies", (err, results) => {
      if (err) {
        console.error("Fail to retrieve movies")
        callback(err);
      } else {
        console.log(results);
        callback(null, results);
      }
    });
  },

  // insert a movie into the database
  create: function (movie, callback) {
    const query = `INSERT INTO movies(title, watchstatus) VALUES(?, ?)`;
    db.query(query, [movie.title, movie.watchstatus], (err, result) => {
      if (err) {
        console.error("fail to add movie");
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  //update the watch status
  update: function(movie, callback) {
    const query ='UPDATE movies SET watchstatus = ? WHERE id = ?';
    db.query(query, [movie.watchstatus, movie.id],(err,result) =>{
      if(err){
        console.error('Failed to update movie watchstatus:', err);
        callback(err);
      } else {
        callback(null,result);
      }

    })
  }
};

