import React, { useState, useEffect } from 'react';
import { Calendar, Tag, Sparkles, Activity, GitCommit, Download, ExternalLink, RefreshCw } from 'lucide-react';

interface ModrinthVersion {
  id: string;
  name: string;
  version_number: string;
  game_versions: string[];
  loaders: string[];
  date_published: string;
  downloads: number;
  changelog?: string;
  files: { url: string; filename: string }[];
}

export default function VersionsView() {
  const [modrinthVersions, setModrinthVersions] = useState<ModrinthVersion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.modrinth.com/v2/project/nwRng7jo/version')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setModrinthVersions(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const staticFallbackVersions = [
    {
      version_number: "v1.2.0",
      name: "Darwinism - Apex Formulations & Sub-Visual Thresholds",
      date_published: "2026-05-10T12:00:00Z",
      game_versions: ["1.20.1", "1.21.1", "1.21.8"],
      loaders: ["neoforge", "forge"],
      changelog: "Added Tier III Apex Darwin's Serum, sub-visual sight threshold engine with dynamic fade-in, damage-scaling regeneration amplification, and Potion of Milk genome stabilizer bottle brewing."
    },
    {
      version_number: "v1.0.0",
      name: "Darwinism - Initial Biological Adaptation Release",
      date_published: "2026-04-01T12:00:00Z",
      game_versions: ["1.20.1", "1.21.1"],
      loaders: ["neoforge"],
      changelog: "Initial release of Darwin's Serum, real-time sprinting locomotion acceleration, water submersion triggers, and thermal protection response systems."
    }
  ];

  const displayList = modrinthVersions.length > 0 ? modrinthVersions : staticFallbackVersions;

  return (
    <div className="space-y-8 py-4 select-text">
      {/* Intro section */}
      <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-slate-100">
            Darwinism Version & Release Logs
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Live changelogs and build archives synchronized directly with Modrinth and CurseForge repositories.
          </p>
        </div>
        <a 
          href="https://modrinth.com/mod/darwinism/versions"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#131c31] text-sky-300 border border-[#253655] hover:bg-[#1d2d47] hover:border-sky-400 transition-all"
        >
          <span>View Modrinth Downloads</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {loading && (
        <div className="p-8 text-center text-xs font-mono text-sky-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Fetching live Darwinism releases from Modrinth...</span>
        </div>
      )}

      {/* Timeline container */}
      <div className="relative pl-6 sm:pl-8 border-l border-[#1e293b]">
        {displayList.map((v, index) => {
          const dateStr = new Date(v.date_published).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <div key={v.version_number + index} className="relative mb-10 last:mb-0">
              {/* Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[#070a13] border-2 border-sky-400 shadow-sm shadow-sky-950/20 z-10">
                <GitCommit className="w-3.5 h-3.5 text-sky-300" />
              </div>

              {/* Version Card */}
              <div className="bg-[#070a13] border border-[#1e293b] rounded-xl p-5 space-y-4 hover:border-sky-500/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="font-serif text-lg font-bold text-slate-100">
                      {v.name || `Darwinism ${v.version_number}`}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#131c31] text-sky-300 border border-[#253655] uppercase">
                      <Tag className="w-2.5 h-2.5" />
                      {v.version_number}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{dateStr}</span>
                  </div>
                </div>

                {/* Compatibility Badges */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                  <span className="text-slate-500 uppercase font-semibold">Minecraft:</span>
                  {v.game_versions.map(gv => (
                    <span key={gv} className="px-2 py-0.5 rounded bg-[#0b101d] text-slate-300 border border-[#1e293b]">
                      {gv}
                    </span>
                  ))}
                  <span className="text-slate-500 uppercase font-semibold ml-2">Loaders:</span>
                  {v.loaders.map(ld => (
                    <span key={ld} className="px-2 py-0.5 rounded bg-[#0b101d] text-sky-300 border border-[#1e293b] uppercase">
                      {ld}
                    </span>
                  ))}
                </div>

                {/* Changelog text */}
                {v.changelog && (
                  <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                    {v.changelog}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
