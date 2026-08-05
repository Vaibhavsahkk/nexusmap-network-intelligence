'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Calendar, Briefcase } from 'lucide-react';

export default function PathDisplay({ pathData }) {
  if (!pathData || !pathData.found) {
    return (
      <div className="glass-card p-12 rounded-3xl text-center text-[#5A544A] border border-[#D4AF37]/20 bg-[#F8F5EE] shadow-lg">
        <h3 className="text-lg font-bold text-[#1A1815] mb-2">No Warm Path Found</h3>
        <p className="text-sm text-[#8C847A] tracking-wide">No connection chain discovered within 5 degrees of separation for this node.</p>
      </div>
    );
  }

  const { people, connections, hops } = pathData;

  return (
    <div className="glass-card px-10 py-12 sm:px-12 sm:py-14 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-8 bg-gradient-to-b from-white to-[#F8F5EE]">
      {/* Path Header */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-6">
        <div className="flex items-center gap-4.5">
          <div className="w-13 h-13 rounded-2xl bg-[#1A1815] flex items-center justify-center text-[#E5C158] font-bold text-xl border border-[#D4AF37]/40 shadow-lg shadow-[#1A1815]/15">
            {hops}
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold text-[#1A1815] tracking-tight">
              Warm Introduction Path ({hops} {hops === 1 ? 'Hop' : 'Hops'})
            </h2>
            <p className="text-xs font-medium text-[#8C847A] tracking-wide">Shortest introduction chain discovered in CognoDB Graph</p>
          </div>
        </div>
        <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase font-mono rounded-full bg-[#D4AF37]/15 text-[#B38612] border border-[#D4AF37]/35 shadow-xs">
          Verified Graph Path
        </span>
      </div>

      {/* Path Step Chain */}
      <div className="relative space-y-6">
        {people.map((person, idx) => {
          const conn = connections[idx];
          const isLast = idx === people.length - 1;

          return (
            <div key={person.id || idx} className="space-y-6">
              {/* Person Node Card */}
              <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/25 flex items-center justify-between hover:border-[#C59B27] transition-all duration-300 bg-white/95 shadow-md hover:shadow-xl">
                <div className="flex items-center gap-4.5">
                  <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shrink-0 shadow-sm">
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
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-extrabold text-base text-[#1A1815] tracking-tight">{person.name}</h4>
                      {idx === 0 && (
                        <span className="px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase font-mono bg-[#0D8A58]/15 text-[#0D8A58] border border-[#0D8A58]/35 rounded-md">
                          YOU (ROOT USER)
                        </span>
                      )}
                      {isLast && (
                        <span className="px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase font-mono bg-[#C59B27]/15 text-[#B38612] border border-[#D4AF37]/35 rounded-md">
                          TARGET NODE
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#5A544A] tracking-wide">{person.title}</p>
                  </div>
                </div>
                <Link
                  href={`/person/${person.id}`}
                  className="text-xs text-[#1A1815] hover:text-[#C59B27] font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl bg-[#F3EFE6] hover:bg-[#EAE4D7] transition-all border border-[#D4AF37]/25 shadow-xs"
                >
                  View Profile
                </Link>
              </div>

              {/* Hop Relationship Edge Card */}
              {!isLast && conn && (
                <div className="flex items-center justify-center my-4">
                  <div className="px-6 py-3 rounded-2xl bg-[#1A1815] border border-[#D4AF37]/40 flex items-center gap-4 text-xs font-semibold text-[#E5C158] shadow-xl shadow-[#1A1815]/15 tracking-wide">
                    <div className="flex items-center gap-1.5 text-[#E5C158]">
                      <Zap className="w-4 h-4 text-[#E5C158]" />
                      <span>Strength {conn.strength}/10</span>
                    </div>
                    <span className="text-[#8C847A]">•</span>
                    <div className="flex items-center gap-1.5 text-white">
                      <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                      <span className="capitalize">{conn.source}</span>
                    </div>
                    <span className="text-[#8C847A]">•</span>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>Since {conn.since}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#E5C158] ml-1" />
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
