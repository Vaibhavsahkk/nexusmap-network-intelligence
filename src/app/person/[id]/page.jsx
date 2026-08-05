import { getPersonProfile } from '@/lib/db/queries/person.js';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GitFork, Briefcase, Award, MapPin, Linkedin, Twitter, Mail } from 'lucide-react';
import { formatDegreeLabel } from '@/lib/utils.js';

export const dynamic = 'force-dynamic';

export default async function PersonProfilePage({ params }) {
  const { id } = await params; // Next.js 15 async params rule

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
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Banner & Info */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 relative overflow-hidden space-y-6 bg-gradient-to-b from-white to-[#F8F5EE] shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 bg-[#FAF7F2] shadow-xl shrink-0">
            <Image
              src={person.avatar}
              alt={person.name}
              fill
              className="object-cover pointer-events-none"
              priority
              unoptimized
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1815]">{person.name}</h1>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1A1815] text-[#E5C158] border border-[#D4AF37]/40 shadow-sm">
                {formatDegreeLabel(connectionDegree)}
              </span>
            </div>

            <p className="text-sm font-bold text-[#C59B27]">{person.title}</p>
            {location && (
              <p className="text-xs font-semibold text-[#8C847A] flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>{location}</span>
              </p>
            )}
            <p className="text-xs text-[#5A544A] pt-2 leading-relaxed max-w-xl">{person.bio}</p>

            {/* Social & Contact Links */}
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-4">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="p-2.5 rounded-xl bg-white border border-[#D4AF37]/30 hover:border-[#C59B27] text-[#1A1815] transition-colors shadow-sm"
                  title={person.email}
                >
                  <Mail className="w-4 h-4 text-[#C59B27]" />
                </a>
              )}
              {person.linkedinUrl && (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#D4AF37]/30 hover:border-[#C59B27] text-[#1A1815] transition-colors shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#C59B27]" />
                </a>
              )}
              {person.twitterHandle && (
                <a
                  href={`https://twitter.com/${person.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#D4AF37]/30 hover:border-[#C59B27] text-[#1A1815] transition-colors shadow-sm"
                >
                  <Twitter className="w-4 h-4 text-[#C59B27]" />
                </a>
              )}

              <Link
                href={`/path?to=${person.id}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1A1815] hover:bg-[#2A2621] text-[#E5C158] text-xs font-bold border border-[#D4AF37]/40 transition-all shadow-md shadow-[#1A1815]/10 ml-auto"
              >
                <GitFork className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Warm Intro Path</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Sections: Work & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Experience */}
        <div className="glass-card p-6 rounded-2xl border border-[#D4AF37]/20 space-y-4 bg-white/90 shadow-md">
          <div className="flex items-center gap-2.5 text-[#1A1815] border-b border-[#D4AF37]/20 pb-3">
            <Briefcase className="w-5 h-5 text-[#C59B27]" />
            <h3 className="font-bold text-[#1A1815]">Work History</h3>
          </div>
          {workHistory.length === 0 ? (
            <p className="text-xs text-[#8C847A]">No employment history available.</p>
          ) : (
            <div className="space-y-3">
              {workHistory.map((work, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F8F5EE] border border-[#D4AF37]/15 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1A1815]">{work.role}</span>
                    {work.current && (
                      <span className="px-2 py-0.5 text-[10px] bg-[#0D8A58]/15 text-[#0D8A58] rounded font-bold">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#5A544A]">{work.company}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="glass-card p-6 rounded-2xl border border-[#D4AF37]/20 space-y-4 bg-white/90 shadow-md">
          <div className="flex items-center gap-2.5 text-[#1A1815] border-b border-[#D4AF37]/20 pb-3">
            <Award className="w-5 h-5 text-[#7C3AED]" />
            <h3 className="font-bold text-[#1A1815]">Graph Skills</h3>
          </div>
          {skills.length === 0 ? (
            <p className="text-xs text-[#8C847A]">No skills attached to this node.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-[#7C3AED]/80 uppercase font-mono font-bold">
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
