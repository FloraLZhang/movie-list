
import React, { useState } from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
// import movieListItems from './Movies.jsx';
import AddMovie from './AddMovie.jsx';

const App = (props) => {

  const [movies, setMovies] = useState([]);

  //add a state variable to track whether user has searched
  //if user havnt search, movioList do not need to display the message "no movie found"
  const [searchMade,setSearchMade] = useState(false);

  const getSearchMovies = (input) => {
   //filter the searched movies
   //setMovies to the filteredmovies after search
   setSearchMade(true);
   const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(input.toLowerCase()));
   setMovies(filteredMovies);
  }

  const addMovie = (title) => {
    //create a newMovie variable , initiaze with title and watched status :falsed
    const newMovie = {title, watched:false};
    setMovies([...movies, newMovie]);
  }

  //add a toggel function to toggle the status of movie
  const toggleWatched = (moviesToToggle) => {
    setMovies(movie => movies.map(movie => {
      if (movie.title === moviesToToggle.title) {
        return {...movie, watched : !movie.watched}
      }
        return movie;
    }));
  }

  //Add state to track the currentMovieList
  //initiate with null- show the all list - didnt filter watch/to watch
  const [currentList, setCurrentList] = useState(null);

//render the movielist when selct the currentlist
  return (
    <div>
      <h1>MovieList</h1>
      <nav><AddMovie onAdd={addMovie}/></nav>
      <button onClick={() => setCurrentList("watched")}>Watched</button>
      <button onClick={() => setCurrentList("toWatch")}>To Watch</button>
      <nav><Search handleSearch={getSearchMovies} /></nav>
      <MovieList movies={movies.filter(movie => {
        if (currentList === "watched") return movie.watched;
        if (currentList === "toWatch") return !movie.watched;
        return true;
      })}
       searchMade={searchMade} toggleWatched={toggleWatched}/>
  </div>
  )
};

export default App;