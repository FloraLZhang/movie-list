
import React, { useState, useEffect } from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import axios from 'axios';
// import movieListItems from './Movies.jsx';
import AddMovie from './AddMovie.jsx';

const App = (props) => {

  const [movies, setMovies] = useState([]);

  //add a state variable to track whether user has searched
  //if user havnt search, movioList do not need to display the message "no movie found"
  const [searchMade,setSearchMade] = useState(false);

  //create a state to track the movies displayed. so displaymovies will not alter the original list after search
  const [displayMovies, setDisplayMovies] = useState([]);
  //Add state to track the currentMovieList
  //initiate with null- show the all list - didnt filter watch/to watch
  const [currentList, setCurrentList] = useState(null);

  useEffect(()=>{
    axios.get('/movies')
    .then((response) => {
      setMovies(response.data);
      setDisplayMovies(response.data);
    })
    .catch((error) => console.log('Failed to fetch movies:', error));
  },[]);


  const getSearchMovies = (input) => {
   //filter the searched movies
   //setMovies to the filteredmovies after search
   if (input.trim() === '') {
     // If the search query is empty, reset to the full list and indicate no search was made
     setDisplayMovies(movies);
     //  the "no movies found" message doesn't show when there's no search
     setSearchMade(false);
    } else {
    setSearchMade(true);
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(input.toLowerCase()));
    setDisplayMovies(filteredMovies);
    // Only set searchMade to true if an actual search is performed
  }
};

  const addMovie = (input) => {
    axios.post('/movies', input)
    .then(response => {
      // After add to the db, fetch the updated list
      return axios.get('/movies');
    })
    .then(response => {
      // Update the state with the new list of movies
      setMovies(response.data);
      setDisplayMovies(response.data);
    })
    .catch(error => {
      console.error('Failed to add movie:', error);
    });
  }


  // //add a toggel function to toggle the status of movie
  // const toggleWatched = (moviesToToggle) => {
  //    const updateMovies = movies.map(movie => {
  //     if (movie.title === moviesToToggle.title) {
  //       return {...movie, watched : !movie.watched}
  //     }
  //       return movie;
  //   });
  //   setMovies(updateMovies);
  //   setDisplayMovies(updateMovies);
  // }


  //add a toggel function to toggle the status of movie
  const toggleWatched = (movieToToggle) => {
      // Determine the new watch status based on the current one
  const newWatchStatus = movieToToggle.watchstatus === 'Not Watched' ? 'Watched' : 'Not Watched';

  // Send a PUT request to update the watch status in the database
  axios.put(`/movies/${movieToToggle.id}`, { watchstatus: newWatchStatus })
    .then(response => {
      console.log('Update successful:', response.data);
      // Fetch the updated list of movies or update the state directly
      // For simplicity, we're updating the state directly here
      const updatedMovies = movies.map(movie => {
        if (movie.id === movieToToggle.id) {
          return { ...movie, watchstatus: newWatchStatus };
        }
        return movie;
      });
      setMovies(updatedMovies);
      setDisplayMovies(updatedMovies);
    })
    .catch(error => {
      console.error('Failed to update movie status:', error);
    });
  }


//Filter displaymovies throuth currentlist
  const filteredMovies= displayMovies.filter(movie => {
    if (currentList === 'watched') return movie.watchstatus === 'Watched';
    if (currentList === 'toWatch') return movie.watchstatus === 'Not Watched';
    //oterwise return the full movie list
    return true;
  })

  return (
    <div>
      <h1>MovieList</h1>
      <nav><AddMovie onAdd={addMovie}/></nav>
      <button onClick={() => setCurrentList("watched")}>Watched</button>
      <button onClick={() => setCurrentList("toWatch")}>To Watch</button>
      <nav><Search handleSearch={getSearchMovies} /></nav>
      <MovieList movies={filteredMovies} searchMade={searchMade} toggleWatched={toggleWatched}/>
  </div>
  )
};

export default App;