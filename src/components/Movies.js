import React, { useEffect, useState } from 'react';
import MovieHeader from './MoviesHeader';
import MoviesList from './MoviesList';
import './Movies.less';
import { useFetch } from '../utils/useFetch';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import Favourites from './Favourites';

const parseLocalStorage = () => {
  if (localStorage.getItem('myMovies') !== null) {
    return JSON.parse(localStorage.getItem('myMovies'));
  }
  return [];
};

const Movies = () => {
  const [myMovies, setMyMovies] = useState([]);
  const [moviePosters, setMoviePosters] = useState([]);

  message.config({
    maxCount: 1,
  });

  useEffect(() => {
    setMyMovies(parseLocalStorage(myMovies));
  }, []);

  const [genres, genresError, genresIsLoading] = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`,
  );

  useEffect(() => {
    if (genresError && genresError.status_message) {
      message.error(`Error while fetching genres - ${genresError.status_message}`);
    }
  }, [genresError]);

  const handleAddToList = (newMovie) => {
    if (!myMovies.find((movie) => movie.id === newMovie.id)) {
      localStorage.setItem('myMovies', JSON.stringify([...myMovies, newMovie]));
      setMyMovies([...myMovies, newMovie]);
      message.success(`${newMovie.title} added to your favourites`);
    } else {
      message.error(`${newMovie.title} already exists in your favourites`);
    }
  };

  const handleRemoveFromList = (newMovie) => {
    localStorage.setItem(
      'myMovies',
      JSON.stringify(myMovies.filter((movie) => movie.id !== newMovie.id)),
    );
    setMyMovies(myMovies.filter((movie) => movie.id !== newMovie.id));
    message.success(`${newMovie.title} removed from your favourites`);
  };

  const handleSetMoviePosters = (movies) => {
    if (movies) {
      setMoviePosters([
        ...moviePosters,
        ...movies.results.map((movie) => `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`),
      ]);
    }
  };

  if (genresIsLoading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

    return <Spin className="spinner" indicator={antIcon} />;
  }

  return (
    <>
      <MovieHeader moviePosters={moviePosters} />
      <div className="movies-lists">
        <Favourites movies={myMovies} handleRemoveFromList={handleRemoveFromList} />
        {genres &&
          genres.genres &&
          genres.genres
            .slice(0, 9) // Will add pagination later
            .map((genre) => (
              <MoviesList
                key={genre.id}
                genre={genre}
                handleSetMoviePosters={handleSetMoviePosters}
                handleAddToList={handleAddToList}
              />
            ))}
      </div>
    </>
  );
};

export default Movies;
