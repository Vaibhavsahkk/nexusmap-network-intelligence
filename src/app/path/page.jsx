import { findShortestPath } from '@/lib/db/queries/path.js';
import PathDisplay from '@/components/path/PathDisplay.jsx';
import { GitFork, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PathPage({ searchParams }) {
  const { to, from } = await searchParams; // Next.js 15 async searchParams rule
  const targetId = to || 'person-10'; // Default target for demonstration if none provided
  const fromId = from || null;

  let pathData = { found: false };
  try {
    pathData = await findShortestPath(targetId, fromId);
  } catch (err) {
    console.error('Path page error:', err);
  }

  // Pre-configured target shortcut chips for easy evaluation demo
  const sampleTargets = [
    { id: 'person-10', name: 'VP of Eng' },
    { id: 'person-25', name: 'CTO at Stripe' },
    { id: 'person-50', name: 'Senior AI Lead' },
    { id: 'person-85', name: 'Product Director' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-card p-10 rounded-3xl border border-[#D4AF37]/30 text-center space-y-5 bg-gradient-to-b from-white to-[#F8F5EE] shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1815] border border-[#D4AF37]/40 text-[#E5C158] text-xs font-bold shadow-sm">
          <GitFork className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>openCypher shortestPath Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1815]">
          Warm Introduction Path Finder <span className="font-serif-title text-[#C59B27] font-normal italic">⭐</span>
        </h1>
        <p className="text-sm font-medium text-[#5A544A] max-w-xl mx-auto leading-relaxed">
          Discover the shortest, highest-strength warm introduction path between you and any target executive node (bounded strictly to 5 hops).
        </p>

        {/* Demo Target Shortcut Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs font-bold text-[#8C847A] mr-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            Sample Evaluation Targets:
          </span>
          {sampleTargets.map((target) => (
            <Link
              key={target.id}
              href={`/path?to=${target.id}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                targetId === target.id
                  ? 'bg-[#1A1815] text-[#E5C158] border-[#D4AF37]/50 shadow-md shadow-[#1A1815]/10'
                  : 'bg-white text-[#5A544A] border-[#D4AF37]/20 hover:text-[#1A1815] hover:border-[#C59B27]'
              }`}
            >
              {target.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Path Display */}
      <PathDisplay pathData={pathData} />
    </div>
  );
}
