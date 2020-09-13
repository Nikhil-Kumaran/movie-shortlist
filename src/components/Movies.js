import React, { useEffect, useState } from 'react';
import MovieHeader from './MoviesHeader';
import { GENRES } from '../utils/constants';
import MoviesList from './MoviesList';
import './Movies.less';

const parseLocalStorage = () => {
  if (localStorage.getItem('myMovies') !== null) {
    return JSON.parse(localStorage.getItem('myMovies'));
  }
  return [];
};

const Movies = () => {
  const [moviesLists, setMoviesLists] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMyMovies(parseLocalStorage(myMovies));

    setLoading(true);

    Promise.all(
      GENRES.map(async (genre) => {
        return {
          movies: (
            await (
              await fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${genre}`)
            ).json()
          ).Search,
          genre,
        };
      }),
    )
      .then((res) => {
        setLoading(false);
        setMoviesLists(res);
      })
      .catch((error) => {
        setLoading(false);
        console.log('error occured while fetching', error);
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
          movies={myMovies}
          type="myList"
          handleRemoveFromList={handleRemoveFromList}
        />
        {moviesLists.map((moviesList) => (
          <MoviesList
            type="genre"
            key={moviesList.genre}
            title={moviesList.genre}
            movies={moviesList.movies}
            handleAddToList={handleAddToList}
            loading={loading}
          />
        ))}
      </div>
    </>
  );
};

export default Movies;
