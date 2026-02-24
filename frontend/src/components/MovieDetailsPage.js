import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const MovieDetailsPage = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendUrl = 'http://127.0.0.1:8000/movies/'; // Default backend URL
        const response = await fetch(`${backendUrl}${imdbId}/`);

        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const backendUrl = 'http://127.0.0.1:8000/recommend/'; // Default backend URL
        const response = await fetch(`${backendUrl}${imdbId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data.recommended_movies || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Don't set error state for recommendations, just log it
      }
    };

    if (imdbId) {
      fetchMovieDetails();
      fetchRecommendations();
    }
  }, [imdbId]);

  const rating = movie ? (movie.vote_averageFloat || (movie.vote_average ? parseFloat(movie.vote_average) : 0)) : 0;
  const starCount = Math.round(rating / 2);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-amber-200">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Movie</h2>
          <p className="text-slate-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-slate-400 text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
          <p className="text-slate-300 mb-6">The movie you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Movies</span>
        </button>
      </div>

      {/* Hero section with backdrop */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 mb-8">
        {movie.poster && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.poster}`}
              alt={movie.original_title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

        {/* Movie poster */}
        <div className="absolute bottom-0 left-6 transform translate-y-1/2">
          <div className="w-32 h-48 md:w-40 md:h-60 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl shadow-2xl overflow-hidden border-4 border-slate-800">
            {movie.poster ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                alt={movie.original_title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {movie.original_title}
            </h1>

            {movie.tagline && (
              <p className="text-amber-400 italic text-lg mb-4">"{movie.tagline}"</p>
            )}

            {/* Rating and year */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < starCount ? 'text-amber-400' : 'text-slate-600'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="text-white ml-2">{movie.vote_average}/10</span>
              </div>

              {movie.release_year && (
                <span className="text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full">
                  {movie.release_year}
                </span>
              )}

              {movie.runtime && (
                <span className="text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full">
                  {movie.runtime} min
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.split('|').map((genre, index) => (
                  <span
                    key={index}
                    className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-slate-300 leading-relaxed">{movie.overview}</p>
              </div>
            )}
          </div>

          {/* Side info */}
          <div className="space-y-4">
            {/* IMDb ID */}
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">IMDb ID</h4>
              <p className="text-amber-400 font-mono text-sm bg-slate-900/50 px-3 py-2 rounded">
                {movie.imdb_id}
              </p>
            </div>

            {/* Director */}
            {movie.director && (
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Director</h4>
                <p className="text-white">{movie.director}</p>
              </div>
            )}

            {/* Cast */}
            {movie.cast && (
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Cast</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {movie.cast.split('|').slice(0, 5).join(', ')}
                  {movie.cast.split('|').length > 5 && '...'}
                </p>
              </div>
            )}

            {/* Additional info */}
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Details</h4>
              <div className="space-y-2 text-sm">
                {movie.popularity && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Popularity:</span>
                    <span className="text-white">{movie.popularity.toFixed(1)}</span>
                  </div>
                )}
                {movie.vote_count && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Votes:</span>
                    <span className="text-white">{movie.vote_count.toLocaleString()}</span>
                  </div>
                )}
                {movie.budget && movie.budget > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Budget:</span>
                    <span className="text-white">${movie.budget.toLocaleString()}</span>
                  </div>
                )}
                {movie.revenue && movie.revenue > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Revenue:</span>
                    <span className="text-white">${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              Recommended Movies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recommendations.map(movie => (
                <MovieCard
                  key={movie.imdb_id}
                  movie={movie}
                  onClick={() => navigate(`/movie/${movie.imdb_id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;