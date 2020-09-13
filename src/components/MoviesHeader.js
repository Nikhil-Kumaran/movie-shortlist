import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import './MoviesHeader.less';

const MoviesHeader = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=avengers`)
      .then((res) => res.json())
      .then((res) => {
        const urls = res.Search.map((data) => {
          return { url: data.Poster, id: data.imdbID };
        });
        setPosters(urls);
      });
  }, []);

  return (
    <div className="movie-header">
      <h1>Movie List</h1>
      <Carousel autoplay dots={false}>
        {posters.map((poster) => (
          <img key={poster.id} className="content" src={poster.url} />
        ))}
      </Carousel>
    </div>
  );
};

export default MoviesHeader;
