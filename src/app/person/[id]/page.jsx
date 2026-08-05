import { getPersonProfile } from '@/lib/db/queries/person.js';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GitFork, Briefcase, GraduationCap, Award, MapPin, Linkedin, Twitter, Mail } from 'lucide-react';
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

  const { person, connectionDegree, workHistory, skills, education, location } = profile;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Banner & Info */}
      <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-2xl shrink-0">
            <Image
              src={person.avatar}
              alt={person.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">{person.name}</h1>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {formatDegreeLabel(connectionDegree)}
              </span>
            </div>

            <p className="text-sm font-medium text-cyan-400">{person.title}</p>
            {location && (
              <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{location}</span>
              </p>
            )}
            <p className="text-xs text-slate-300 pt-2 leading-relaxed max-w-xl">{person.bio}</p>

            {/* Social & Contact Links */}
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-3">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
                  title={person.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {person.linkedinUrl && (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {person.twitterHandle && (
                <a
                  href={`https://twitter.com/${person.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}

              <Link
                href={`/path?to=${person.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-all shadow-lg shadow-cyan-500/10 ml-auto"
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>Warm Intro Path</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Sections: Work, Skills, Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Experience */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400 border-b border-white/5 pb-3">
            <Briefcase className="w-5 h-5" />
            <h3 className="font-semibold text-slate-100">Work Experience</h3>
          </div>
          {workHistory.length === 0 ? (
            <p className="text-xs text-slate-500">No employment history available.</p>
          ) : (
            <div className="space-y-3">
              {workHistory.map((work, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{work.role}</span>
                    {work.current && (
                      <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-mono">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{work.company}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 text-purple-400 border-b border-white/5 pb-3">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold text-slate-100">Graph Skills</h3>
          </div>
          {skills.length === 0 ? (
            <p className="text-xs text-slate-500">No skills attached to this node.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs font-medium flex items-center gap-1.5"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-purple-400 opacity-80 uppercase font-mono">
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
