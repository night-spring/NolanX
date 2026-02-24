import React from 'react';

const ErrorPage = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      {/* Broken eye emblem */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl animate-pulse"></div>
        <div className="w-24 h-24 flex items-center justify-center relative">
          <svg viewBox="0 0 48 48" className="w-16 h-16">
            {/* Diamond — cracked */}
            <polygon points="24,4 44,24 24,44 4,24" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2"/>
            {/* Crossed out — X */}
            <line x1="12" y1="12" x2="36" y2="36" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <line x1="36" y1="12" x2="12" y2="36" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-black italic tracking-tight text-red-400 mb-1">Connection Failed</h2>
      <p className="text-slate-400 text-sm mb-6 text-center max-w-xs">
        Couldn't reach the backend. Make sure the server is running.
      </p>

      {/* Error detail */}
      {error && (
        <div className="mb-6 w-full max-w-sm bg-slate-800/60 border border-red-500/20 rounded-xl px-4 py-3">
          <p className="text-xs text-red-400 font-mono break-all">{error}</p>
        </div>
      )}

      {/* Retry button */}
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;