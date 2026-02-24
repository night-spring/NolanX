import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Simplified background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>

        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:imdbId" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
