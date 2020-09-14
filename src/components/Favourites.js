import { CloseCircleTwoTone } from '@ant-design/icons';
import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './MoviesList.less';
import React from 'react';
import PropTypes from 'prop-types';

const Favourites = ({ movies, handleRemoveFromList }) => {
  return (
    <section className="movies-list">
      <h1>Favourites</h1>
      <div className="movies">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="card-wrapper">
              <Card
                cover={<Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />}
                actions={[
                  <CloseCircleTwoTone
                    twoToneColor="#d11a2a"
                    style={{ fontSize: 24 }}
                    onClick={() => handleRemoveFromList(movie)}
                  />,
                ]}
              >
                <Meta
                  title={movie.title}
                  description={new Date(movie.release_date).toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                />
              </Card>
            </div>
          ))
        ) : (
          <div className="card-wrapper">Nothing here! Scroll to discover more</div>
        )}
      </div>
    </section>
  );
};

Favourites.propTypes = {
  movies: PropTypes.array.isRequired,
  handleRemoveFromList: PropTypes.func.isRequired,
};

export default Favourites;
