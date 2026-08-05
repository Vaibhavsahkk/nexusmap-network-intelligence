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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 text-[#C59B27] pointer-events-none z-10">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white/90 border border-[#D4AF37]/30 focus:border-[#C59B27] focus:ring-4 focus:ring-[#D4AF37]/15 text-[#1A1815] placeholder-[#8C847A] text-sm shadow-xl shadow-[#3D3528]/5 transition-all outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-24 text-[#8C847A] hover:text-[#1A1815] p-1 z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1A1815] to-[#3D3528] hover:from-[#2A2621] hover:to-[#4D4333] text-[#E5C158] text-xs font-bold border border-[#D4AF37]/30 shadow-md shadow-[#1A1815]/10 transition-all z-10"
        >
          Search
        </button>
      </div>
    </form>
  );
}
