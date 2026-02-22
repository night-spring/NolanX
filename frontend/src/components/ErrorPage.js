import React from 'react';

const ErrorPage = ({ error, onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12 px-4">
      <div className="max-w-lg w-full">
        {/* Cinematic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-red-900 to-slate-800 rounded-2xl -z-10"></div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-400/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400/10 rounded-full"></div>

          {/* Error icon with animation */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-full border-4 border-red-400/30 animate-ping"></div>
          </div>

          {/* Error title with gradient */}
          <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Connection Lost
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto mb-6"></div>

          {/* Error message */}
          <p className="text-red-100 mb-6 leading-relaxed">
            We're having trouble connecting to our cinematic database. The movie magic seems to be on hold for a moment.
          </p>

          {/* Error details in a styled box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-red-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-red-300">Technical Details</span>
            </div>
            <p className="text-xs text-red-200 font-mono bg-black/20 p-2 rounded border">
              {error}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRetry}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Page
            </button>
          </div>

          {/* Footer message */}
          <p className="text-xs text-red-200 mt-6">
            Don't worry, your favorite films are waiting. Please check your connection and try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;