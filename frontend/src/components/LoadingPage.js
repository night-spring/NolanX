import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700/40 animate-pulse">
    {/* Poster placeholder */}
    <div className="w-full aspect-[2/3] bg-gradient-to-b from-slate-700 to-slate-800"></div>
    {/* Info placeholder */}
    <div className="p-3 space-y-2">
      <div className="h-3 bg-slate-700 rounded-full w-4/5"></div>
      <div className="h-2.5 bg-slate-700/60 rounded-full w-2/5"></div>
    </div>
  </div>
);

const LoadingPage = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} style={{ animationDelay: `${i * 40}ms` }}>
        <SkeletonCard />
      </div>
    ))}
  </div>
);

export default LoadingPage;