import React from 'react';
import { Carousel } from 'antd';
import './MoviesHeader.less';
import PropTypes from 'prop-types';

const MoviesHeader = ({ moviePosters }) => {
  return (
    <div className="movie-header">
      <h1>Movie Shortlist</h1>
      <Carousel autoplay dots={false}>
        {moviePosters.map((poster) => (
          <div className="content" key={poster}>
            <img src={poster} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

MoviesHeader.propTypes = {
  moviePosters: PropTypes.array.isRequired,
};

export default MoviesHeader;
