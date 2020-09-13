import React from 'react';
import { Card, Popover, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './MoviesList.less';

const MoviesList = ({ title, movies, handleAddToList, handleRemoveFromList, type, loading }) => {
  if (loading) {
    return (
      <section className="movies-list">
        <h1>{title}</h1>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </section>
    );
  }
  return (
    <section className="movies-list">
      <h1>{title}</h1>
      <div className="movies">
        {movies && movies.length > 0 ? (
          movies.map((movie) => {
            return (
              <div key={movie.imdbID} className="card-wrapper">
                <Popover
                  content={
                    type === 'myList' ? (
                      <Button onClick={() => handleRemoveFromList(movie)}>Remove from List</Button>
                    ) : (
                      <Button onClick={() => handleAddToList(movie)}>Add to List</Button>
                    )
                  }
                  trigger="hover"
                >
                  <Card title={movie.Title}>{movie.Year}</Card>
                </Popover>
              </div>
            );
          })
        ) : (
          <div className="card-wrapper">Nothing here! Scroll to discover more</div>
        )}
      </div>
    </section>
  );
};

MoviesList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  handleAddToList: PropTypes.func,
  handleRemoveFromList: PropTypes.func,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

MoviesList.defaultProps = {
  handleAddToList: () => {},
  handleRemoveFromList: () => {},
  loading: false,
};

export default MoviesList;
