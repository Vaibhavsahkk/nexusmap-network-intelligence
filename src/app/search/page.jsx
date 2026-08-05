import { searchNetwork } from '@/lib/db/queries/search.js';
import SearchBar from '@/components/search/SearchBar.jsx';
import PersonCard from '@/components/ui/PersonCard.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { Search, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
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
    <div className="space-y-12">
      {/* Header & Search Input */}
      <div className="glass-card px-10 py-16 sm:px-14 sm:py-20 rounded-3xl border border-[#D4AF37]/30 text-center bg-gradient-to-b from-white to-[#F8F5EE] shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#1A1815] border border-[#D4AF37]/40 text-[#E5C158] text-[13px] font-bold shadow-md tracking-wide">
          <Search className="w-4 h-4 text-[#E5C158]" />
          <span>4-Tier Multi-Hop Graph Search Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1815] max-w-3xl mx-auto leading-tight">
          Discover Anyone Across Your <span className="font-serif-title text-[#C59B27] font-normal italic">3-Hop Network</span>
        </h1>
        <p className="text-sm sm:text-base font-medium text-[#5A544A] max-w-xl mx-auto leading-relaxed tracking-wide">
          Deterministic 4-tier openCypher ranking: Connection Degree (1st to 3rd) → Mutual Count → Relationship Strength.
        </p>

        <div className="pt-3 max-w-3xl mx-auto">
          <SearchBar initialQuery={query} placeholder="Try searching 'Engineer', 'Stripe', 'React', or 'Priya'..." />
        </div>
      </div>

      {/* Results Header */}
      {query.trim() && (
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-bold text-[#1A1815] tracking-wide">
            Found <span className="text-[#C59B27] font-extrabold">{results.length}</span> executive results for &quot;{query}&quot;
          </h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C847A] tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Ranked strictly by openCypher degree math</span>
          </div>
        </div>
      )}

      {/* Search Result Grid */}
      {!query.trim() ? (
        <div className="glass-card px-10 py-16 rounded-3xl border border-[#D4AF37]/25 text-center text-[#5A544A] space-y-5 max-w-lg mx-auto bg-white/90 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#1A1815] flex items-center justify-center text-[#E5C158] mx-auto border border-[#D4AF37]/40 shadow-sm">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#1A1815] tracking-tight">Explore Your 307 Network Nodes</h3>
          <p className="text-sm text-[#8C847A] leading-relaxed tracking-wide">
            Type any name, job title, skill, or company name above to traverse up to 3 degrees of separation in CognoDB.
          </p>
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          title={`No network matches for "${query}"`}
          description="Try searching for another term like 'Engineer', 'React', 'Stripe', or 'GraphQL'."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}
