'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Calendar, Briefcase } from 'lucide-react';

export default function PathDisplay({ pathData }) {
  if (!pathData || !pathData.found) {
    return (
      <div className="glass-card p-10 rounded-3xl text-center text-[#5A544A] border border-[#D4AF37]/20 bg-[#F8F5EE]">
        No warm connection path found within 5 degrees of separation.
      </div>
    );
  }

  const { people, connections, hops } = pathData;

  return (
    <div className="glass-card p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6 bg-gradient-to-b from-white to-[#F8F5EE]">
      {/* Path Header */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1815] flex items-center justify-center text-[#E5C158] font-bold text-lg border border-[#D4AF37]/40 shadow-lg shadow-[#1A1815]/10">
            {hops}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1A1815]">
              Warm Introduction Path ({hops} {hops === 1 ? 'Hop' : 'Hops'})
            </h2>
            <p className="text-xs font-medium text-[#8C847A]">Shortest introduction chain discovered in CognoDB Graph</p>
          </div>
        </div>
        <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#D4AF37]/15 text-[#B38612] border border-[#D4AF37]/30">
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
              <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 flex items-center justify-between hover:border-[#C59B27] transition-all bg-white/90 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shrink-0 shadow-sm">
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
                      <h4 className="font-bold text-[#1A1815]">{person.name}</h4>
                      {idx === 0 && (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#0D8A58]/15 text-[#0D8A58] border border-[#0D8A58]/30 rounded">
                          YOU (ROOT USER)
                        </span>
                      )}
                      {isLast && (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#C59B27]/15 text-[#B38612] border border-[#D4AF37]/30 rounded">
                          TARGET NODE
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#5A544A]">{person.title}</p>
                  </div>
                </div>
                <Link
                  href={`/person/${person.id}`}
                  className="text-xs text-[#1A1815] hover:text-[#C59B27] font-bold px-3.5 py-2 rounded-xl bg-[#F3EFE6] hover:bg-[#EAE4D7] transition-all border border-[#D4AF37]/20"
                >
                  View Profile
                </Link>
              </div>

              {/* Hop Relationship Edge Card */}
              {!isLast && conn && (
                <div className="flex items-center justify-center my-3">
                  <div className="px-5 py-2.5 rounded-2xl bg-[#1A1815] border border-[#D4AF37]/40 flex items-center gap-3.5 text-xs font-semibold text-[#E5C158] shadow-lg shadow-[#1A1815]/10">
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
