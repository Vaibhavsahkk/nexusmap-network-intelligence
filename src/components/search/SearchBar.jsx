'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, X } from 'lucide-react';

export default function SearchBar({ initialQuery = '', placeholder = 'Search 307 nodes by name, skill (e.g. React), or company (e.g. Stripe)...' }) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center w-full">
        <div className="absolute left-5 text-[#C59B27] pointer-events-none z-10 flex items-center justify-center">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-32 py-4.5 rounded-2xl bg-white/95 border border-[#D4AF37]/35 focus:border-[#C59B27] focus:ring-4 focus:ring-[#D4AF37]/20 text-[#1A1815] placeholder-[#8C847A] text-[15px] font-medium leading-relaxed tracking-wide shadow-xl shadow-[#3D3528]/8 transition-all duration-300 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-28 text-[#8C847A] hover:text-[#1A1815] p-1.5 rounded-lg hover:bg-[#F3EFE6] transition-colors z-10"
            title="Clear text"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1A1815] to-[#3D3528] hover:from-[#2A2621] hover:to-[#4D4333] text-[#E5C158] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/40 shadow-md shadow-[#1A1815]/15 transition-all duration-200 z-10"
        >
          Search
        </button>
      </div>
    </form>
  );
}
