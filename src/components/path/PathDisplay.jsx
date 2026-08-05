'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Calendar, Briefcase } from 'lucide-react';

export default function PathDisplay({ pathData }) {
  if (!pathData || !pathData.found) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center text-slate-400 border border-white/5">
        No warm connection path found within 5 degrees of separation.
      </div>
    );
  }

  const { people, connections, hops } = pathData;

  return (
    <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 shadow-2xl space-y-6">
      {/* Path Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
            {hops}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Warm Introduction Path ({hops} {hops === 1 ? 'Hop' : 'Hops'})
            </h2>
            <p className="text-xs text-slate-400">Shortest introduction chain discovered in CognoDB</p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Verified Graph Path
        </span>
      </div>

      {/* Path Step Chain */}
      <div className="relative space-y-4">
        {people.map((person, idx) => {
          const conn = connections[idx]; // connection to NEXT person
          const isLast = idx === people.length - 1;

          return (
            <div key={person.id || idx} className="space-y-4">
              {/* Person Node Card */}
              <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between hover:border-cyan-400/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/50 shrink-0">
                    <Image
                      src={
                        person.avatar ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(person.name)}`
                      }
                      alt={person.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-100">{person.name}</h4>
                      {idx === 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 rounded">
                          YOU
                        </span>
                      )}
                      {isLast && (
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/20 text-purple-300 rounded">
                          TARGET
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{person.title}</p>
                  </div>
                </div>
                <Link
                  href={`/person/${person.id}`}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all border border-cyan-500/20"
                >
                  View Node
                </Link>
              </div>

              {/* Hop Relationship Edge Card */}
              {!isLast && conn && (
                <div className="flex items-center justify-center my-2">
                  <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-3 text-xs text-slate-300 shadow-md">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Strength {conn.strength}/10</span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <div className="flex items-center gap-1.5 text-cyan-400">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span className="capitalize">{conn.source}</span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Since {conn.since}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 ml-1" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
