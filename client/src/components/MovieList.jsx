
import React from 'react';
// import movieListItems from './Movies.jsx';

var MovieList =({ movies, searchMade,toggleWatched }) => {

  //when no movie by that name found, return a message "Sorry, no movie is found"
  if (movies.length === 0 && searchMade) {
    return <h5>Sorry, no movie is found.</h5>
  }

  //if toggle the watch button, the button turn green. otherwise the button is gray

  const ButtonColor = (watchstatus) => (

      { backgroundColor: watchstatus === 'Watched' ? 'lightgreen' : 'lightgrey',}

  );

  return (
    <div>
        {movies.map((movie) => (
          <li key= {movie.title}>{ movie.title }
          <button onClick={() => toggleWatched(movie)} style={ButtonColor(movie.watchstatus)}>
            {movie.watchstatus}</button></li>
        ))}
    </div>
  )
}
export default MovieList;