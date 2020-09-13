import React, { useEffect, useState } from 'react';
import MovieHeader from './MoviesHeader';
import { GENRES } from '../utils/constants';
import MoviesList from './MoviesList';
import './Movies.less';

const Movies = () => {
  const [moviesLists, setMoviesLists] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('myMovies')).length > 0) {
      setMyMovies(JSON.parse(localStorage.getItem('myMovies')));
    }

    Promise.all(
      GENRES.map(async (genre) => {
        return {
          movies: (
            await (
              await fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${genre}`)
            ).json()
          ).Search,
          genre: genre,
        };
      }),
    ).then((res) => {
      console.log(res);
      setMoviesLists(res);
    });
  }, []);

  const handleAddToList = (newMovie) => {
    if (!myMovies.find((movie) => movie.imdbID === newMovie.imdbID)) {
      localStorage.setItem('myMovies', JSON.stringify([...myMovies, newMovie]));
      setMyMovies([...myMovies, newMovie]);
    }
  };

  const handleRemoveFromList = (newMovie) => {
    localStorage.setItem(
      'myMovies',
      JSON.stringify(myMovies.filter((movie) => movie.imdbID !== newMovie.imdbID)),
    );
    setMyMovies(myMovies.filter((movie) => movie.imdbID !== newMovie.imdbID));
  };

  return (
    <>
      <MovieHeader />
      <div className="movies-lists">
        <MoviesList
          title="My List"
          movies={myMovies.length === 0 ? JSON.parse(localStorage.getItem('myMovies')) : myMovies}
          type="myList"
          handleRemoveFromList={handleRemoveFromList}
        />
        {moviesLists.map((moviesList) => (
          <MoviesList
            key={moviesList.genre}
            title={moviesList.genre}
            movies={moviesList.movies}
            handleAddToList={handleAddToList}
          />
        ))}
      </div>
    </>
  );
};

export default Movies;
