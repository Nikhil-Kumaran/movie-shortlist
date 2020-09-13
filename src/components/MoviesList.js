import React from 'react';
import { Card, Popover, Button } from 'antd';
import './MoviesList.less';

const MoviesList = ({ title, movies, handleAddToList, handleRemoveFromList, type }) => {
  return (
    <section className="movies-list">
      <h1>{title}</h1>
      <div className="movies">
        {movies.length > 0 ? (
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

export default MoviesList;
