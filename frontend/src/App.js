import './App.css';
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Show 50 movies per page

  const fetchMovies = () => {
    setLoading(true);
    setError(null);

    const backendUrl = 'http://127.0.0.1:8000/movies/'; // Default backend URL

    fetch(`${backendUrl}`)
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

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movies.slice(startIndex, endIndex);
  }, [movies, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Simplified background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Welcome message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Discover Your Next Favorite Film
          </h2>
          <p className="text-amber-200/80 text-sm">
            Explore our curated collection of {movies.length} cinematic masterpieces
          </p>
        </div>

        {loading && <LoadingPage />}

        {error && <ErrorPage error={error} onRetry={fetchMovies} />}

        {!loading && !error && (
          <>
            <MovieGrid movies={paginatedMovies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
