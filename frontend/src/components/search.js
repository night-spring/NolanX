export default function Search(){
    return (
        <div className="w-full max-w-md min-w-[280px]">
        <div className="relative">
            <input
            className="w-full bg-white/10 backdrop-blur-md text-white placeholder:text-amber-200/70 text-base border border-white/20 rounded-xl pl-5 pr-14 py-3 transition-all duration-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 hover:border-white/30 shadow-lg"
            placeholder="Search for cinematic experiences..."
            />
            <button
            className="absolute top-1 right-1 flex items-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2 px-4 border border-transparent text-sm font-semibold text-white transition-all shadow-lg hover:shadow-xl focus:bg-gradient-to-r focus:from-amber-600 focus:to-orange-600 hover:scale-105 duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg>

            Discover
            </button>

        </div>
        </div>
    );
};