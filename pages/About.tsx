import React from 'react';
import { PROFILE, EXPERIENCES, SKILLS } from '../constants';
import { Globe, Flag, TrendingUp, Calendar, Share2 } from 'lucide-react';
import { Button } from '../components/Button';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      
      {/* Channel Header Simple */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-200 dark:border-yt-borderDark pb-8 mb-8">
        <img src={PROFILE.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover shadow-md" />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold text-yt-text dark:text-yt-textDark mb-2">{PROFILE.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm text-yt-meta dark:text-yt-metaDark mb-4">
            <span>@SagarParmarPortfolio</span>
            <span>•</span>
            <span>{PROFILE.subscribers} subscribers</span>
            <span>•</span>
            <span>{PROFILE.videos} videos</span>
          </div>
          <div className="flex justify-center md:justify-start gap-4">
            <Button variant="primary" className="px-6">Subscribe</Button>
            <Button variant="secondary">Download CV</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Description Column */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-yt-text dark:text-yt-textDark mb-4">Description</h2>
            <p className="text-sm leading-relaxed text-yt-text dark:text-yt-textDark whitespace-pre-line">
              {PROFILE.bio}
              <br/><br/>
              Currently specializing in:
              <br/>
              🚀 High-Retention YouTube Editing
              <br/>
              🎨 Motion Graphics & Branding
              <br/>
              🤖 AI Workflow Integration (Gemini, Midjourney, Claude)
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-yt-text dark:text-yt-textDark mb-4">Experience</h2>
            <div className="space-y-6">
              {EXPERIENCES.map(exp => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200 dark:border-yt-borderDark">
                  <div className="text-sm font-bold text-yt-text dark:text-yt-textDark">{exp.role}</div>
                  <div className="text-xs font-medium text-yt-text dark:text-yt-textDark mb-1">{exp.company} • {exp.period}</div>
                  <ul className="list-disc list-inside text-sm text-yt-meta dark:text-yt-metaDark mt-2 space-y-1">
                    {exp.description.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-yt-text dark:text-yt-textDark mb-4">Stats</h2>
            <div className="space-y-3 text-sm text-yt-text dark:text-yt-textDark border-b border-gray-200 dark:border-yt-borderDark pb-6">
              <div className="flex items-center gap-3">
                <Calendar size={20} /> Joined Oct 24, 2016
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp size={20} /> 2,483,192 views
              </div>
              <div className="flex items-center gap-3">
                <Flag size={20} /> {PROFILE.location}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-yt-text dark:text-yt-textDark mb-4">Skills & Tools</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-yt-darkGray rounded text-xs text-yt-text dark:text-yt-textDark border border-gray-200 dark:border-transparent">
                  {skill}
                </span>
              ))}
            </div>
          </section>

           <section>
            <h2 className="text-lg font-bold text-yt-text dark:text-yt-textDark mb-4">Links</h2>
            <div className="space-y-3 text-sm">
              <a href="#" className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline">
                <Globe size={20} /> Portfolio Website
              </a>
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline">
                <Share2 size={20} /> Email Me
              </a>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
