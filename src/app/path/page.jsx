import { findShortestPath } from '@/lib/db/queries/path.js';
import PathDisplay from '@/components/path/PathDisplay.jsx';
import { GitFork, Sparkles, UserCheck } from 'lucide-react';
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
      <div className="glass-card p-8 rounded-3xl border border-white/10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <GitFork className="w-3.5 h-3.5" />
          <span>openCypher shortestPath Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Warm Introduction Path Finder ⭐
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Find the shortest, warmest introduction path between you and any target person in your graph (bounded to 5 hops).
        </p>

        {/* Demo Target Shortcut Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Demo Targets:
          </span>
          {sampleTargets.map((target) => (
            <Link
              key={target.id}
              href={`/path?to=${target.id}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                targetId === target.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-slate-200'
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
