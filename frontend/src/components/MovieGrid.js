import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = React.memo(({ movies, onMovieClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.imdb_id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
});

export default MovieGrid;