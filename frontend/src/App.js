import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import MovieGrid from './components/MovieGrid';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            Explore our curated collection of cinematic masterpieces
          </p>
        </div>

        {loading && <LoadingPage />}

        {error && <ErrorPage error={error} onRetry={fetchMovies} />}

        {!loading && !error && <MovieGrid movies={movies} />}
      </main>
    </div>
  );
}

export default App;
