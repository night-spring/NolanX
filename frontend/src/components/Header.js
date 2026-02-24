import React from 'react';
import { Link } from 'react-router-dom';
import Search from './search';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 px-4 pt-3 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <Link to="/" className="flex items-center space-x-2 group">
        {/* Anime-style logo mark */}
        <div className="relative w-9 h-9 flex-shrink-0">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer sharp diamond */}
            <polygon points="18,2 34,18 18,34 2,18" fill="url(#logoGrad)" opacity="0.15"/>
            {/* Inner sharp diamond outline */}
            <polygon points="18,2 34,18 18,34 2,18" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none"/>
            {/* Horizontal slash — anime eye */}
            <line x1="6" y1="18" x2="30" y2="18" stroke="url(#logoGrad)" strokeWidth="1.5"/>
            {/* Vertical slit pupil */}
            <ellipse cx="18" cy="18" rx="3" ry="7" fill="url(#logoGrad)"/>
            {/* Top flare */}
            <line x1="18" y1="2" x2="18" y2="11" stroke="#fbbf24" strokeWidth="1" opacity="0.8"/>
            {/* Bottom flare */}
            <line x1="18" y1="25" x2="18" y2="34" stroke="#f97316" strokeWidth="1" opacity="0.8"/>
            <defs>
              <linearGradient id="logoGrad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fbbf24"/>
                <stop offset="100%" stopColor="#f97316"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 bg-clip-text text-transparent transition-opacity group-hover:opacity-80" style={{ fontStyle: 'italic', letterSpacing: '-0.03em' }}>
          NolanX
        </h1>
      </Link>
      <div className="w-full md:w-96 lg:w-[30rem]">
        <Search/>
      </div>
    </div>
  );
};

export default Header;