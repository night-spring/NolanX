import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [input, setInput] = useState(searchParams.get('q') || '');

    // Keep input in sync if URL changes externally
    useEffect(() => {
        setInput(searchParams.get('q') || '');
    }, [searchParams]);

    const applySearch = (value) => {
        if (location.pathname !== '/') {
            navigate(`/?q=${encodeURIComponent(value)}`);
        } else {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set('q', value);
            } else {
                params.delete('q');
            }
            setSearchParams(params);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        applySearch(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applySearch(input);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <input
                    value={input}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-md text-white placeholder:text-amber-200/70 text-base border border-white/20 rounded-xl pl-5 pr-14 py-3 transition-all duration-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 hover:border-white/30 shadow-lg"
                    placeholder="Search for cinematic experiences..."
                />
                {input && (
                    <button
                        type="button"
                        onClick={() => { setInput(''); applySearch(''); }}
                        className="absolute top-1/2 -translate-y-1/2 right-[4.5rem] text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <button
                    className="absolute top-1 right-1 flex items-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2 px-4 border border-transparent text-sm font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    type="submit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                    Discover
                </button>
            </div>
        </form>
    );
};