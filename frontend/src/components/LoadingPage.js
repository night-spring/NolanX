import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12 px-4">
      <div className="max-w-lg w-full">
        {/* Cinematic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 rounded-2xl -z-10"></div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400/10 rounded-full"></div>

          {/* Loading icon with enhanced animation */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            {/* Multiple pulsing rings */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-400/30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border-2 border-orange-400/20 animate-ping animation-delay-300"></div>
          </div>

          {/* Loading title with gradient */}
          <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Loading Cinematic Experiences
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto mb-6"></div>

          {/* Loading message */}
          <p className="text-amber-100 mb-6 leading-relaxed">
            Curating the perfect movie recommendations from our extensive collection...
          </p>

          {/* Loading progress indicator */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce animation-delay-200"></div>
          </div>

          {/* Fun fact or tip */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <p className="text-sm text-amber-300 font-medium">🎬 Movie Magic</p>
            <p className="text-xs text-amber-200 mt-1">
              Did you know? The first movie theater opened in 1895, and cinema has been captivating audiences ever since.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;