import React, { useEffect } from 'react';
import { Card, Spin, Image, message } from 'antd';
import { LoadingOutlined, HeartTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './MoviesList.less';
import { useFetch } from '../utils/useFetch';
import Meta from 'antd/lib/card/Meta';

const MoviesList = ({ genre, handleSetMoviePosters, handleAddToList }) => {
  const [movies, error, isLoading] = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`,
  );

  useEffect(() => {
    handleSetMoviePosters(movies);
  }, [movies]);

  useEffect(() => {
    if (error && error.status_message) {
      message.error(
        `Error while fetching movies for the genre "${genre.name}" - ${error.status_message}`,
      );
    }
  }, [error]);

  const antIcon = <LoadingOutlined spin />;

  return (
    <section className="movies-list">
      <h1>{genre.name}</h1>
      {isLoading ? (
        <Spin indicator={antIcon} />
      ) : (
        <div className="movies">
          {movies &&
            movies.results.map((movie) => (
              <div key={movie.id} className="card-wrapper">
                <Card
                  cover={<Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />}
                  actions={[
                    <HeartTwoTone
                      twoToneColor="#eb2f96"
                      style={{ fontSize: 24 }}
                      onClick={() => handleAddToList(movie)}
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
            ))}
        </div>
      )}
    </section>
  );
};

MoviesList.propTypes = {
  genre: PropTypes.object.isRequired,
  handleSetMoviePosters: PropTypes.func.isRequired,
  handleAddToList: PropTypes.func.isRequired,
};

export default MoviesList;
