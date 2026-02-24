import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API_BASE_URL from '../config';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import MovieGrid from './MovieGrid';
import Pagination from './Pagination';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Show 50 movies per page

  const fetchMovies = () => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/movies/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return movies;
    const q = searchQuery.toLowerCase();
    return movies.filter(m =>
      m.original_title?.toLowerCase().includes(q)
    );
  }, [movies, searchQuery]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.imdb_id}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-28 md:pt-24 pb-5 px-4 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto text-center relative z-10">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest">AI-Powered Recommendations</span>
          </div>

          <h2 className="text-xl md:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
            Discover Your{' '}
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
              Next Obsession
            </span>
          </h2>

          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto mb-4">
            {searchQuery
              ? <><span className="text-amber-400 font-semibold">{filteredMovies.length}</span> result{filteredMovies.length !== 1 ? 's' : ''} for <span className="text-amber-300">"{searchQuery}"</span></>
              : <>Browse <span className="text-amber-400 font-semibold">{movies.length.toLocaleString()}</span> films — click any to get instant AI recommendations</>}
          </p>

          {/* Stats row */}
          {!searchQuery && movies.length > 0 && (
            <div className="flex justify-center gap-6 md:gap-10 text-center">
              {[
                { value: movies.length.toLocaleString(), label: 'Films' },
                { value: 'AI', label: 'Recommendations' },
                { value: '∞', label: 'Discoveries' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-base md:text-lg font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{value}</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 md:px-4 pb-12 relative z-10">
        {loading && <LoadingPage />}

        {error && <ErrorPage error={error} onRetry={fetchMovies} />}

        {!loading && !error && (
          <>
            {paginatedMovies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <svg className="w-14 h-14 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-bold text-white">No results for "{searchQuery}"</h3>
                <p className="text-slate-500 text-sm">Try a different title or clear the search.</p>
              </div>
            ) : (
              <>
                <MovieGrid movies={paginatedMovies} onMovieClick={handleMovieClick} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;