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
      <div className="glass-card p-10 rounded-3xl border border-[#D4AF37]/30 text-center space-y-5 bg-gradient-to-b from-white to-[#F8F5EE] shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1815] border border-[#D4AF37]/40 text-[#E5C158] text-xs font-bold shadow-sm">
          <Search className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>4-Tier Multi-Hop Graph Search Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1815]">
          Discover Anyone Across Your <span className="font-serif-title text-[#C59B27] font-normal italic">3-Hop Network</span>
        </h1>
        <p className="text-sm font-medium text-[#5A544A] max-w-xl mx-auto">
          Deterministic 4-tier openCypher ranking: Connection Degree (1st → 3rd) $\rightarrow$ Mutual Count $\rightarrow$ Relationship Strength.
        </p>

        <div className="pt-2 max-w-2xl mx-auto">
          <SearchBar initialQuery={query} placeholder="Try searching 'Engineer', 'Stripe', 'React', or 'Priya'..." />
        </div>
      </div>

      {/* Results Header */}
      {query.trim() && (
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-bold text-[#1A1815]">
            Found <span className="text-[#C59B27] font-extrabold">{results.length}</span> executive results for &quot;{query}&quot;
          </h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C847A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Ranked strictly by openCypher degree math</span>
          </div>
        </div>
      )}

      {/* Search Result Grid */}
      {!query.trim() ? (
        <div className="glass-card p-12 rounded-3xl border border-[#D4AF37]/20 text-center text-[#5A544A] space-y-4 max-w-lg mx-auto bg-white/90 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1815] flex items-center justify-center text-[#E5C158] mx-auto border border-[#D4AF37]/40 shadow-sm">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1815]">Explore Your 307 Network Nodes</h3>
          <p className="text-xs text-[#8C847A] leading-relaxed">
            Type any name, job title, skill, or company name above to traverse up to 3 degrees of separation in CognoDB.
          </p>
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          title={`No network matches for "${query}"`}
          description="Try searching for another term like 'Engineer', 'React', 'Stripe', or 'GraphQL'."
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
