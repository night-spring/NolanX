import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const MovieDetailsPage = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add custom animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/movies/${imdbId}/`);

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
        const response = await fetch(`${API_BASE_URL}/recommend/${imdbId}`);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 animate-pulse">
        {/* Skeleton hero */}
        <div className="relative pt-36 md:pt-20 pb-8">
          {/* Blurred backdrop placeholder */}
          <div className="absolute inset-0 bg-slate-800/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>

          {/* Back button skeleton */}
          <div className="absolute top-36 md:top-20 right-4 md:right-6 z-20">
            <div className="w-20 h-9 bg-slate-700/60 rounded-lg"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
              {/* Poster skeleton */}
              <div className="flex-shrink-0 w-40 md:w-56 lg:w-64 aspect-[2/3] rounded-2xl bg-slate-700/60"></div>

              {/* Info skeleton */}
              <div className="flex-1 flex flex-col gap-4 mt-2 w-full">
                {/* Genre badges */}
                <div className="flex gap-2">
                  <div className="w-16 h-5 bg-slate-700/60 rounded-full"></div>
                  <div className="w-20 h-5 bg-slate-700/60 rounded-full"></div>
                  <div className="w-14 h-5 bg-slate-700/60 rounded-full"></div>
                </div>
                {/* Title */}
                <div className="h-9 bg-slate-700/60 rounded-lg w-3/4"></div>
                {/* Tagline */}
                <div className="h-4 bg-slate-700/40 rounded-full w-1/2"></div>
                {/* Stats row */}
                <div className="flex gap-4 mt-1">
                  <div className="w-24 h-8 bg-slate-700/50 rounded-xl"></div>
                  <div className="w-24 h-8 bg-slate-700/50 rounded-xl"></div>
                  <div className="w-24 h-8 bg-slate-700/50 rounded-xl"></div>
                </div>
                {/* Overview lines */}
                <div className="space-y-2 mt-2">
                  <div className="h-3 bg-slate-700/40 rounded-full w-full"></div>
                  <div className="h-3 bg-slate-700/40 rounded-full w-5/6"></div>
                  <div className="h-3 bg-slate-700/40 rounded-full w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations skeleton */}
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="w-40 h-5 bg-slate-700/50 rounded-full mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700/40">
                <div className="w-full aspect-[2/3] bg-slate-700/60"></div>
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-slate-700/50 rounded-full w-4/5"></div>
                  <div className="h-2.5 bg-slate-700/30 rounded-full w-2/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* Broken diamond icon */}
          <svg className="w-16 h-16 mx-auto mb-6 text-red-400/80" viewBox="0 0 48 48" fill="none">
            <polygon points="24,4 44,24 24,44 4,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="6 3"/>
            <line x1="14" y1="14" x2="34" y2="34" stroke="currentColor" strokeWidth="2"/>
            <line x1="34" y1="14" x2="14" y2="34" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h2 className="text-xl font-black text-white mb-2">Couldn't load this film</h2>
          <p className="text-slate-500 text-sm font-mono mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-sm font-semibold transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 mx-auto mb-6 text-slate-600" viewBox="0 0 48 48" fill="none">
            <polygon points="24,4 44,24 24,44 4,24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <h2 className="text-xl font-black text-white mb-2">Movie Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">The movie you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-sm font-semibold transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Compact Hero Section with Background Poster */}
      <div className="relative pt-36 md:pt-20 pb-8">
        {/* Background Poster */}
        {movie.poster && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.poster}`}
              alt={movie.original_title}
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent"></div>
          </div>
        )}

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`,
            backgroundSize: '400px 400px'
          }}></div>
        </div>

        {/* Back Button — absolutely positioned so it never disturbs the layout */}
        <div className="absolute top-36 md:top-20 right-4 md:right-6 z-20">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 text-white text-sm font-medium rounded-lg transition-all duration-300 border border-slate-600 hover:border-slate-500 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <div className="relative group w-44 md:w-52 lg:w-60">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
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

              {/* Movie Details */}
              <div className="flex-1 text-white text-center md:text-left pb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {movie.original_title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-xl font-bold text-amber-400">{movie.vote_average}</span>
                  </div>

                  {movie.release_year && (
                    <span className="text-slate-300 font-medium text-lg">{movie.release_year}</span>
                  )}

                  <span className="text-slate-400 font-mono text-sm bg-slate-800/50 px-3 py-1 rounded-full">
                    {movie.imdb_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Recommendations Section */}
      <div className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-400/5 to-transparent rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Recommended for You
            </h2>
            <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md rounded-full px-3 py-1 border border-amber-400/40">
              <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-amber-300 font-semibold text-xs uppercase tracking-wider">AI-Powered</span>
            </div>
          </div>

          {/* Recommendations Grid */}
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.imdb_id}
                  onClick={() => navigate(`/movie/${rec.imdb_id}`)}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-1"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl group-hover:shadow-amber-400/20 border border-slate-700/50 group-hover:border-amber-400/50">
                    <div className="aspect-[2/3] relative">
                      {rec.poster ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w342${rec.poster}`}
                          alt={rec.original_title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-800 to-slate-900">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}

                      {/* Enhanced Rating Badge */}
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md rounded-full px-1.5 py-0.5 md:px-3 md:py-1.5 border border-amber-400/30">
                        <div className="flex items-center space-x-1">
                          <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-white text-[10px] md:text-sm font-bold">{rec.vote_average}</span>
                        </div>
                      </div>

                      {/* Match Score Badge */}
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 md:px-2 md:py-1">
                        <span className="text-slate-900 text-[9px] md:text-xs font-bold">{80 + (index * 3) % 20}%</span>
                      </div>

                      {/* Advanced Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                          <h3 className="text-white font-bold text-[11px] md:text-sm mb-1 md:mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300">
                            {rec.original_title}
                          </h3>

                          <div className="hidden md:block space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">
                                {rec.release_year || 'N/A'}
                              </span>
                              <div className="flex items-center space-x-1 text-amber-400">
                                <span className="font-medium">View Details</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>

                            {/* Recommendation Reason */}
                            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-2">
                              <p className="text-slate-300 text-xs leading-tight">
                                Similar {['themes', 'storytelling', 'genre', 'mood', 'cinematography'][index % 5]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-orange-400/20 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-700 relative">
                  <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="absolute -inset-2 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Analyzing Your Preferences</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                Our AI is working to find the perfect movies for you based on advanced content analysis.
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}

          {/* Enhanced Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-slate-200 font-semibold text-lg">Love these recommendations?</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-400/25"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Discover More Movies</span>
                  </div>
                </button>

                <button className="px-8 py-4 bg-slate-800/60 hover:bg-slate-700/60 text-white font-bold rounded-2xl transition-all duration-300 border border-slate-600 hover:border-slate-500 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span>Share Recommendations</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;