import React from 'react';

const MovieCard = ({ movie }) => {
  // Debug: log movie object to see what's available
  React.useEffect(() => {
    if (movie) {
      console.log('Movie data:', movie);
    }
  }, [movie]);

  const rating = movie.imdbRatingFloat || (movie.imdbRating ? parseFloat(movie.imdbRating) : 0);
  const starCount = Math.round(rating / 2);

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] border border-slate-700/50 hover:border-amber-400/60 hover:shadow-amber-400/20">
      {/* Movie poster with standard 2:3 aspect ratio */}
      <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        {movie.poster_path ? (
          <>
            <img
              src={movie.poster_path}
              alt={movie.original_title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            {/* Rating badge on poster */}
            {rating > 0 && (
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs font-bold text-white">{movie.imdbRating}</span>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Enhanced film strip effect for fallback */}
            <div className="absolute inset-0 opacity-20">
              <div className="flex space-x-1 h-full">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                ))}
              </div>
            </div>

            {/* Placeholder content */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-2xl flex items-center justify-center mb-4 mx-auto transform group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-amber-200 text-sm font-bold tracking-wider">MOVIE</span>
            </div>
          </>
        )}

        {/* Hover overlay with play button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="bg-amber-400/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Movie info section */}
      <div className="p-5 bg-gradient-to-b from-slate-800/50 to-slate-900/80">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-base font-bold text-white leading-tight line-clamp-2 group-hover:text-amber-300 transition-colors duration-300">
            {movie.original_title}
          </h3>

          {/* Year and Genre */}
          <div className="flex items-center justify-between text-xs">
            {movie.year && movie.year !== 'N/A' && (
              <span className="text-slate-300 font-medium bg-slate-700/50 px-2 py-1 rounded-full">
                {movie.year}
              </span>
            )}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < starCount ? 'text-amber-400' : 'text-slate-600'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>

          {/* IMDb ID */}
          <div className="flex items-center space-x-2 pt-2 border-t border-slate-700/50">
            <span className="text-xs text-slate-400">IMDb:</span>
            <span className="text-xs text-amber-400 font-mono bg-slate-800/50 px-2 py-1 rounded">
              {movie.imdb_id}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </div>
  );
};

export default MovieCard;