import { searchNetwork } from '@/lib/db/queries/search.js';
import SearchBar from '@/components/search/SearchBar.jsx';
import PersonCard from '@/components/ui/PersonCard.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { Search, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams; // Next.js 15 async searchParams rule
  const query = q || '';

  let results = [];
  if (query.trim()) {
    try {
      results = await searchNetwork(query.trim(), 20);
    } catch (err) {
      console.error('Search page error:', err);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Search Input */}
      <div className="glass-card p-8 rounded-3xl border border-white/10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>4-Tier Multi-Hop Graph Search</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Find Anyone in Your Extended Network
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Ranked strictly by connection degree (1st → 3rd), mutual connection count, and relationship strength.
        </p>

        <div className="pt-2">
          <SearchBar initialQuery={query} placeholder="Try searching 'Priya', 'Stripe', 'React', 'Engineer'..." />
        </div>
      </div>

      {/* Results Header */}
      {query.trim() && (
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-semibold text-slate-300">
            Found <span className="text-cyan-400">{results.length}</span> results for &quot;{query}&quot;
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ranked by Degree & Mutuals</span>
          </div>
        </div>
      )}

      {/* Search Result Grid */}
      {!query.trim() ? (
        <div className="glass-card p-12 rounded-3xl border border-white/5 text-center text-slate-400 space-y-3 max-w-lg mx-auto">
          <Search className="w-10 h-10 text-cyan-500/40 mx-auto" />
          <h3 className="text-base font-semibold text-slate-200">Start Searching Your Graph</h3>
          <p className="text-xs text-slate-400">
            Type any name, title, skill, or company in the search box above to traverse up to 3 hops.
          </p>
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          title={`No graph matches for "${query}"`}
          description="Try searching for another term like 'Engineer', 'React', 'Stripe', or 'Priya'."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}
