import { getPersonProfile } from '@/lib/db/queries/person.js';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GitFork, Briefcase, Award, MapPin, Linkedin, Twitter, Mail } from 'lucide-react';
import { formatDegreeLabel } from '@/lib/utils.js';

export const dynamic = 'force-dynamic';

export default async function PersonProfilePage({ params }) {
  const { id } = await params;

  let profile = null;
  try {
    profile = await getPersonProfile(id);
  } catch (err) {
    console.error('Failed to load person profile:', err);
  }

  if (!profile) {
    notFound();
  }

  const { person, connectionDegree, workHistory, skills, location } = profile;

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Profile Banner & Info */}
      <div className="glass-card px-10 py-14 sm:px-12 sm:py-16 rounded-3xl border border-[#D4AF37]/30 relative overflow-hidden space-y-8 bg-gradient-to-b from-white to-[#F8F5EE] shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 bg-[#FAF7F2] shadow-2xl shrink-0">
            <Image
              src={person.avatar}
              alt={person.name}
              fill
              className="object-cover pointer-events-none"
              priority
              unoptimized
            />
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1815] tracking-tight">{person.name}</h1>
              <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase font-mono rounded-full bg-[#1A1815] text-[#E5C158] border border-[#D4AF37]/40 shadow-sm">
                {formatDegreeLabel(connectionDegree)}
              </span>
            </div>

            <p className="text-base font-bold text-[#C59B27] tracking-wide">{person.title}</p>
            {location && (
              <p className="text-xs font-semibold text-[#8C847A] flex items-center justify-center sm:justify-start gap-1.5 tracking-wide">
                <MapPin className="w-4 h-4 text-[#C59B27]" />
                <span>{location}</span>
              </p>
            )}
            <p className="text-sm text-[#5A544A] pt-2 leading-relaxed max-w-xl tracking-wide">{person.bio}</p>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-5">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="p-3 rounded-xl bg-white border border-[#D4AF37]/30 hover:border-[#C59B27] text-[#1A1815] transition-all shadow-sm"
                  title={person.email}
                >
                  <Mail className="w-4.5 h-4.5 text-[#C59B27]" />
                </a>
              )}
              {person.linkedinUrl && (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white border border-[#D4AF37]/30 hover:border-[#C59B27] text-[#1A1815] transition-all shadow-sm"
                >
                  <Linkedin className="w-4.5 h-4.5 text-[#C59B27]" />
                </a>
              )}
              {person.twitterHandle && (
                <a
                  href={`https://twitter.com/${person.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white border border-[#D4AF37]/30 hover:border-[#C59B27] text-[#1A1815] transition-all shadow-sm"
                >
                  <Twitter className="w-4.5 h-4.5 text-[#C59B27]" />
                </a>
              )}

              <Link
                href={`/path?to=${person.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A1815] hover:bg-[#2A2621] text-[#E5C158] text-xs font-bold tracking-wider uppercase border border-[#D4AF37]/40 transition-all shadow-md shadow-[#1A1815]/15 sm:ml-auto"
              >
                <GitFork className="w-4 h-4 text-[#E5C158]" />
                <span>Warm Intro Path</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Sections: Work & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Work Experience */}
        <div className="glass-card p-8 rounded-3xl border border-[#D4AF37]/25 space-y-6 bg-white/95 shadow-xl">
          <div className="flex items-center gap-3 text-[#1A1815] border-b border-[#D4AF37]/20 pb-4">
            <Briefcase className="w-5 h-5 text-[#C59B27]" />
            <h3 className="font-bold text-lg text-[#1A1815] tracking-tight">Work History</h3>
          </div>
          {workHistory.length === 0 ? (
            <p className="text-xs text-[#8C847A] tracking-wide">No employment history available.</p>
          ) : (
            <div className="space-y-4">
              {workHistory.map((work, idx) => (
                <div key={idx} className="p-4.5 rounded-2xl bg-[#F8F5EE] border border-[#D4AF37]/20 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#1A1815] text-sm tracking-tight">{work.role}</span>
                    {work.current && (
                      <span className="px-2.5 py-0.5 text-[10px] bg-[#0D8A58]/15 text-[#0D8A58] rounded-md font-bold uppercase tracking-wider font-mono">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#5A544A] tracking-wide">{work.company}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="glass-card p-8 rounded-3xl border border-[#D4AF37]/25 space-y-6 bg-white/95 shadow-xl">
          <div className="flex items-center gap-3 text-[#1A1815] border-b border-[#D4AF37]/20 pb-4">
            <Award className="w-5 h-5 text-[#7C3AED]" />
            <h3 className="font-bold text-lg text-[#1A1815] tracking-tight">Graph Skills</h3>
          </div>
          {skills.length === 0 ? (
            <p className="text-xs text-[#8C847A] tracking-wide">No skills attached to this node.</p>
          ) : (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/25 text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-[#7C3AED]/80 uppercase font-mono font-extrabold">
                    ({skill.proficiency})
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
