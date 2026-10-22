import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Tag, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Archive, 
  ChevronDown, 
  ChevronUp, 
  FileCode, 
  CheckCircle2, 
  HardDrive,
  GitCommit
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export interface ModrinthFile {
  id: string;
  url: string;
  filename: string;
  primary: boolean;
  size: number;
  hashes: {
    sha1?: string;
    sha512?: string;
  };
}

export interface ModrinthVersion {
  id: string;
  project_id: string;
  name: string;
  version_number: string;
  game_versions: string[];
  loaders: string[];
  date_published: string;
  downloads: number;
  version_type: 'release' | 'beta' | 'alpha';
  changelog?: string;
  files: ModrinthFile[];
}

export interface ArchivedVersion {
  version: string;
  tag: string;
  date: string;
  status: 'archived';
  highlights: {
    title: string;
    description: string;
  }[];
}

const ARCHIVED_VERSIONS: ArchivedVersion[] = [
  {
    version: "Darwinism v0.9.0-alpha",
    tag: "prototype-2",
    date: "February 18, 2026",
    status: "archived",
    highlights: [
      {
        title: "Experimental Attribute Modifiers",
        description: "Initial framework implementation evaluating dynamic tick-based attribute scaling vs static MobEffect modifiers on living entities."
      },
      {
        title: "Kinetic Sprint Tracker",
        description: "Early procedural prototype testing player sprint tick thresholds and dynamic movement speed application."
      },
      {
        title: "Brewing Stand Integration",
        description: "Verification tests for NeoForge brewing recipe registry hooks utilizing Nautilus Shell catalysts."
      }
    ]
  },
  {
    version: "Darwinism v0.8.0-alpha",
    tag: "prototype-1",
    date: "February 10, 2026",
    status: "archived",
    highlights: [
      {
        title: "Base Potion Registry",
        description: "Initial registration of Darwinism Tier 1, Splash, Lingering, and Tipped Arrow item definitions."
      },
      {
        title: "Low Health Overdrive",
        description: "First experimental logic for emergency Damage Resistance and Regeneration triggers when health falls below 2 HP."
      }
    ]
  }
];

// Offline snapshot fallback matching official Modrinth releases
const FALLBACK_MODRINTH_VERSIONS: ModrinthVersion[] = [
  {
    id: "TpuNvlAU",
    project_id: "nwRng7jo",
    name: "Darwinism 1.4.1",
    version_number: "1.4.1",
    game_versions: ["1.21.8"],
    loaders: ["neoforge"],
    date_published: "2026-05-22T08:00:00.000Z",
    downloads: 38,
    version_type: "release",
    changelog: "Changes\n* Moved static attribute modifiers to the potion effect element instead of handling them in procedures\n* Fixed attribute reset triggering incorrectly when upgrading between tiers\n* Imported to 1.21.8 NeoForge",
    files: [
      {
        id: "file_141",
        url: "https://cdn.modrinth.com/data/nwRng7jo/versions/TpuNvlAU/darwinism-1.4.1-neoforge-1.21.8.jar",
        filename: "darwinism-1.4.1-neoforge-1.21.8.jar",
        primary: true,
        size: 679101,
        hashes: {}
      }
    ]
  },
  {
    id: "CHmC27hm",
    project_id: "nwRng7jo",
    name: "Darwinism 1.3.1",
    version_number: "1.3.1",
    game_versions: ["1.21.1"],
    loaders: ["neoforge"],
    date_published: "2026-03-09T11:32:00.881Z",
    downloads: 27,
    version_type: "release",
    changelog: "The Adrenaline Evolution System\n* Reactive Scaling: Regeneration level calculated smoothly via Math.round(adrenaline / 3)\n* Integrated Metabolism: Adrenaline decays at 0.05 per tick out of combat\n* Precision Rounding: Potion amplifier values correctly translated into integer levels\n\nCombat & Detection Fixes\n* Universal Trigger: Adrenaline accumulates (+2 per hit, max 15) from all incoming damage sources\n* Anti-Devolution Protocol: Lower tier potions cannot overwrite active higher tier Darwinism attributes\n* Attribute Persistence: Cleanup procedures on respawn reset fall distance, knockback resistance, and step height to vanilla defaults",
    files: [
      {
        id: "DFMoafLm",
        url: "https://cdn.modrinth.com/data/nwRng7jo/versions/CHmC27hm/potion_of_darwinism-1.3.1-neoforge-1.21.1.jar",
        filename: "potion_of_darwinism-1.3.1-neoforge-1.21.1.jar",
        primary: true,
        size: 46655,
        hashes: {}
      }
    ]
  },
  {
    id: "MNCW66iM",
    project_id: "nwRng7jo",
    name: "Darwinism 1.3.0",
    version_number: "1.3.0",
    game_versions: ["1.21.1"],
    loaders: ["neoforge"],
    date_published: "2026-03-01T07:49:59.563Z",
    downloads: 23,
    version_type: "release",
    changelog: "New Item: Potion of Darwinism II & III\n* Added Tier II and Tier III formulations\n* Step height modifier set to 1.0 (walk up full blocks without jumping)\n* Safe fall distance increased and knockback resistance fortified\n* Threat Perception (Blast Shield): Triggers Resistance IV when Primed TNT or Creepers are within 6 blocks\n* Kinetic Evolution: Sprinting longer than 50-60 ticks applies Speed III/IV\n* Permanent DNA Alteration mechanic added for sustained Tier III consumption",
    files: [
      {
        id: "7oF0kfgI",
        url: "https://cdn.modrinth.com/data/nwRng7jo/versions/MNCW66iM/potion_of_darwinism-1.3.0-neoforge-1.21.1.jar",
        filename: "potion_of_darwinism-1.3.0-neoforge-1.21.1.jar",
        primary: true,
        size: 42301,
        hashes: {}
      }
    ]
  },
  {
    id: "Gn4n4LCl",
    project_id: "nwRng7jo",
    name: "Darwinism 1.2.0",
    version_number: "1.2.0",
    game_versions: ["1.21.1"],
    loaders: ["neoforge"],
    date_published: "2026-02-25T04:32:24.058Z",
    downloads: 18,
    version_type: "release",
    changelog: "Core Logic Refinement\n* Emergency Stabilization: Health < 2 HP grants Resistance IV and Regeneration V for 10 seconds\n* Health < 7 HP triggers Regeneration II\n* Kinetic Jump Discharge: Crouching on ground applies Jump Boost\n* Optic Sensitivity: Night Vision triggers when ambient light level <= 3\n* Performance: Migrated base attribute modifiers to effect start and expiration triggers",
    files: [
      {
        id: "S67GRamt",
        url: "https://cdn.modrinth.com/data/nwRng7jo/versions/Gn4n4LCl/potion_of_darwinism-1.2.0-neoforge-1.21.1.jar",
        filename: "potion_of_darwinism-1.2.0-neoforge-1.21.1.jar",
        primary: true,
        size: 28693,
        hashes: {}
      }
    ]
  },
  {
    id: "qdZpwCpC",
    project_id: "nwRng7jo",
    name: "Darwinism 1.1.0",
    version_number: "1.1.0",
    game_versions: ["1.21.1"],
    loaders: ["neoforge"],
    date_published: "2026-02-22T12:21:11.935Z",
    downloads: 20,
    version_type: "release",
    changelog: "New Biological Adaptations\n* Low-health emergency survival thresholds\n* Powder snow temperature stabilization logic\n* Persistent variables for tracking sprint counters across ticks",
    files: [
      {
        id: "YKlvX44s",
        url: "https://cdn.modrinth.com/data/nwRng7jo/versions/qdZpwCpC/potion_of_darwinism-1.1.0-neoforge-1.21.1.jar",
        filename: "potion_of_darwinism-1.1.0-neoforge-1.21.1.jar",
        primary: true,
        size: 22296,
        hashes: {}
      }
    ]
  },
  {
    id: "eejh8pNW",
    project_id: "nwRng7jo",
    name: "Darwinism 1.0.0",
    version_number: "1.0.0",
    game_versions: ["1.21.1"],
    loaders: ["neoforge"],
    date_published: "2026-02-22T10:00:44.876Z",
    downloads: 17,
    version_type: "release",
    changelog: "Initial Release\n* Potion of Darwinism Tier 1 with awkward potion and nautilus shell brewing\n* Night vision ocular response in low light conditions\n* Sprinting speed acceleration\n* Attack damage and burning time attribute modifiers",
    files: [
      {
        id: "qDLr7tVz",
        url: "https://cdn.modrinth.com/data/nwRng7jo/versions/eejh8pNW/potion_of_darwinism-1.0.0-neoforge-1.21.1.jar",
        filename: "potion_of_darwinism-1.0.0-neoforge-1.21.1.jar",
        primary: true,
        size: 21395,
        hashes: {}
      }
    ]
  }
];

function formatBytes(bytes: number): string {
  if (!bytes || isNaN(bytes)) return '0 KB';
  if (bytes < 1024 * 1024) {
    const kb = bytes / 1024;
    return `${kb.toFixed(0)} KB`;
  }
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

// Simple parser for changelog text (markdown bullet points and category headers)
function renderChangelog(text?: string) {
  if (!text) return <p className="text-xs text-slate-500 italic">No changelog provided.</p>;
  
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs text-slate-300 font-mono leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;
        
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-sky-400 select-none mt-0.5">•</span>
              <span>{content}</span>
            </div>
          );
        }
        
        if (
          trimmed.endsWith(':') || 
          trimmed.toLowerCase().includes('changes') || 
          trimmed.toLowerCase().includes('new') ||
          trimmed.toLowerCase().includes('combat') ||
          trimmed.toLowerCase().includes('adrenaline') ||
          trimmed.toLowerCase().includes('attribute')
        ) {
          return (
            <div key={idx} className="font-bold text-slate-100 font-serif uppercase tracking-wider pt-2 pb-0.5 text-[11px] border-b border-[#1e293b]">
              {trimmed}
            </div>
          );
        }
        return <div key={idx}>{trimmed}</div>;
      })}
    </div>
  );
}

export default function VersionsView() {
  const [modrinthVersions, setModrinthVersions] = useState<ModrinthVersion[]>(FALLBACK_MODRINTH_VERSIONS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Filters
  const [activeTab, setActiveTab] = useState<'all' | 'modrinth' | 'archived'>('all');
  const [loaderFilter, setLoaderFilter] = useState<'all' | 'neoforge' | 'forge'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expandable changelogs
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleChangelog = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchVersions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://api.modrinth.com/v2/project/nwRng7jo/version', {
        headers: {
          'User-Agent': 'DarwinismWiki/1.0 (https://github.com/honeypie3301/Darwinism-Wiki)'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ModrinthVersion[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setModrinthVersions(data);
        setIsLive(true);
        try {
          localStorage.setItem('darwinism_modrinth_versions_cache', JSON.stringify({
            timestamp: Date.now(),
            data
          }));
        } catch {
          // Ignore localStorage errors
        }
      }
    } catch {
      // Fallback to cache if available
      try {
        const cached = localStorage.getItem('darwinism_modrinth_versions_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed.data)) {
            setModrinthVersions(parsed.data);
          }
        }
      } catch {
        // Fall back to bundled static snapshot
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  // Filtered Modrinth versions
  const filteredModrinth = useMemo(() => {
    return modrinthVersions.filter(v => {
      // Loader match
      if (loaderFilter !== 'all') {
        const hasLoader = v.loaders.some(l => l.toLowerCase() === loaderFilter);
        if (!hasLoader) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesVer = v.version_number.toLowerCase().includes(q);
        const matchesChangelog = v.changelog?.toLowerCase().includes(q) || false;
        const matchesGv = v.game_versions.some(g => g.toLowerCase().includes(q));
        if (!matchesName && !matchesVer && !matchesChangelog && !matchesGv) return false;
      }

      return true;
    });
  }, [modrinthVersions, loaderFilter, searchQuery]);

  // Filtered archived versions
  const filteredArchived = useMemo(() => {
    return ARCHIVED_VERSIONS.filter(v => {
      if (loaderFilter !== 'all' && loaderFilter !== 'neoforge') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesVer = v.version.toLowerCase().includes(q);
        const matchesTag = v.tag.toLowerCase().includes(q);
        const matchesHighlights = v.highlights.some(h => 
          h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q)
        );
        if (!matchesVer && !matchesTag && !matchesHighlights) return false;
      }
      return true;
    });
  }, [loaderFilter, searchQuery]);

  const totalModrinthCount = modrinthVersions.length;
  const totalArchivedCount = ARCHIVED_VERSIONS.length;

  return (
    <UpdatedFrame id="versions_modrinth_hybrid" isUpdated={true}>
      <div className="space-y-8 py-2 select-text">
        {/* Header Overview Card */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 tracking-wide">
                  Version Archive & Release Log
                </h2>
                {isLive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-sky-950/70 text-sky-300 border border-sky-800">
                    <CheckCircle2 className="w-2.5 h-2.5 text-sky-400" />
                    LIVE MODRINTH
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1a1710] text-amber-300 border border-amber-800/60">
                    SNAPSHOT
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-sans">
                Official release versions synchronized directly with the Modrinth REST API alongside developmental milestone records.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-start md:self-center shrink-0">
              <button
                onClick={fetchVersions}
                disabled={isLoading}
                title="Refresh releases from Modrinth"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-sky-300 border border-[#253655] rounded-lg text-xs font-mono transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Syncing...' : 'Sync Modrinth'}</span>
              </button>

              <a
                href="https://modrinth.com/mod/darwinism/versions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 border border-sky-800/60 rounded-lg text-xs font-mono transition-all"
              >
                <span>Modrinth Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[#1e293b]">
            <div className="p-2.5 bg-[#070a13] border border-[#1e293b] rounded-lg">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Latest Build</span>
              <span className="text-xs font-mono font-bold text-sky-400">
                {modrinthVersions[0]?.version_number || 'v1.4.1'}
              </span>
            </div>

            <div className="p-2.5 bg-[#070a13] border border-[#1e293b] rounded-lg">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Modrinth Releases</span>
              <span className="text-xs font-mono font-bold text-slate-200">
                {totalModrinthCount} builds
              </span>
            </div>

            <div className="p-2.5 bg-[#070a13] border border-[#1e293b] rounded-lg">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Internal Archives</span>
              <span className="text-xs font-mono font-bold text-indigo-300">
                {totalArchivedCount} milestones
              </span>
            </div>

            <div className="p-2.5 bg-[#070a13] border border-[#1e293b] rounded-lg">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Primary Platform</span>
              <span className="text-xs font-mono font-bold text-teal-300">
                NeoForge 1.21.8 / 1.21.1
              </span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-[#070a13] border border-[#1e293b] rounded-xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'all'
                  ? 'bg-sky-950/80 text-sky-300 border border-sky-700/80 font-bold'
                  : 'bg-[#0b101d] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
              }`}
            >
              All Versions ({totalModrinthCount + (loaderFilter === 'all' ? totalArchivedCount : 0)})
            </button>

            <button
              onClick={() => setActiveTab('modrinth')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'modrinth'
                  ? 'bg-sky-950/80 text-sky-300 border border-sky-700/80 font-bold'
                  : 'bg-[#0b101d] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
              }`}
            >
              <HardDrive className="w-3 h-3" />
              Official Releases ({totalModrinthCount})
            </button>

            <button
              onClick={() => setActiveTab('archived')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'archived'
                  ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/70 font-bold'
                  : 'bg-[#0b101d] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
              }`}
            >
              <Archive className="w-3 h-3" />
              Internal Archives ({totalArchivedCount})
            </button>
          </div>

          {/* Secondary Controls: Loader filter + search query */}
          <div className="flex items-center gap-2">
            {/* Loader Filter */}
            <div className="flex items-center gap-1 bg-[#0b101d] border border-[#1e293b] rounded-lg p-0.5 text-[11px] font-mono">
              <button
                onClick={() => setLoaderFilter('all')}
                className={`px-2 py-1 rounded transition-colors ${
                  loaderFilter === 'all' ? 'bg-[#152033] text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Loaders
              </button>
              <button
                onClick={() => setLoaderFilter('neoforge')}
                className={`px-2 py-1 rounded transition-colors ${
                  loaderFilter === 'neoforge' ? 'bg-[#152033] text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NeoForge
              </button>
              <button
                onClick={() => setLoaderFilter('forge')}
                className={`px-2 py-1 rounded transition-colors ${
                  loaderFilter === 'forge' ? 'bg-[#152033] text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Forge
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative flex items-center min-w-[160px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter version / changelog..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b101d] border border-[#1e293b] rounded-lg py-1 pl-8 pr-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-6 sm:pl-8 border-l border-[#1e293b] space-y-10">
          {/* 1. Official Modrinth Releases */}
          {(activeTab === 'all' || activeTab === 'modrinth') && (
            <>
              {filteredModrinth.map((v) => {
                const primaryFile = v.files.find(f => f.primary) || v.files[0];
                const isExpanded = !!expandedIds[v.id];
                const gameVerStr = v.game_versions.join(', ');
                const loaderStr = v.loaders.join(', ');

                return (
                  <div key={v.id} className="relative group">
                    {/* Timeline Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[#070a13] border-2 border-sky-400 shadow-sm shadow-sky-950/20 z-10">
                      <GitCommit className="w-3.5 h-3.5 text-sky-400" />
                    </div>

                    {/* Version Card */}
                    <div className="bg-[#0b101d] border border-[#1e293b] hover:border-sky-500/40 rounded-xl p-5 space-y-4 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                              {v.name}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#131c31] text-sky-300 border border-sky-800 uppercase">
                              <Tag className="w-2.5 h-2.5" />
                              v{v.version_number.replace(/^v/, '')}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0d1728] text-sky-300 border border-[#253655]">
                              {loaderStr.toUpperCase()} • {gameVerStr}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-sky-950/70 text-sky-300 border border-sky-700/80">
                              Official
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-0.5">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(v.date_published)}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-300">
                              <Download className="w-3.5 h-3.5" />
                              {v.downloads.toLocaleString()} downloads
                            </span>
                            {primaryFile && (
                              <span className="flex items-center gap-1.5 text-slate-400">
                                <FileCode className="w-3.5 h-3.5" />
                                {formatBytes(primaryFile.size)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Direct Download Button */}
                        {primaryFile && (
                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <a
                              href={primaryFile.url}
                              download
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#131c31] hover:bg-sky-900/60 text-sky-300 hover:text-sky-200 border border-sky-700/60 rounded-lg text-xs font-mono font-bold transition-all shadow-sm"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download .jar</span>
                            </a>
                            <a
                              href={`https://modrinth.com/mod/darwinism/version/${v.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Inspect on Modrinth"
                              className="p-1.5 bg-[#070a13] hover:bg-[#152033] text-slate-400 hover:text-sky-300 border border-[#1e293b] rounded-lg transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Expandable Changelog Accordion */}
                      {v.changelog && (
                        <div className="pt-2 border-t border-[#1e293b]">
                          <button
                            onClick={() => toggleChangelog(v.id)}
                            className="flex items-center justify-between w-full text-left py-1 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                          >
                            <span className="flex items-center gap-1.5 font-semibold">
                              <FileCode className="w-3.5 h-3.5" />
                              {isExpanded ? 'Hide Release Changelog' : 'View Release Changelog'}
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 p-4 bg-[#070a13] border border-[#1e293b] rounded-lg">
                              {renderChangelog(v.changelog)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* 2. Archived / Milestone Versions */}
          {(activeTab === 'all' || activeTab === 'archived') && (
            <>
              {filteredArchived.map((v) => (
                <div key={v.version} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[#070a13] border-2 border-indigo-400/80 shadow-sm shadow-indigo-950/20 z-10">
                    <Archive className="w-3.5 h-3.5 text-indigo-300" />
                  </div>

                  {/* Version Card */}
                  <div className="bg-[#0b101d] border border-indigo-950/40 hover:border-indigo-800/60 rounded-xl p-5 space-y-4 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                            {v.version}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e1b4b] text-indigo-300 border border-indigo-900/60 uppercase">
                            <Tag className="w-2.5 h-2.5" />
                            {v.tag}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e1b4b]/60 text-indigo-300 border border-indigo-800/40 uppercase">
                            Milestone Archive
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Recorded Milestone: {v.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Developmental Highlights */}
                    <div className="grid gap-3 pt-2">
                      {v.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="p-3.5 bg-[#070a13] border border-[#1e293b] rounded-lg"
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5 p-1 rounded bg-[#0f172a] border border-[#1e293b] shrink-0 h-fit">
                              {hIdx === 0 && <Sparkles className="w-3.5 h-3.5 text-sky-400" />}
                              {hIdx === 1 && <Activity className="w-3.5 h-3.5 text-sky-400" />}
                              {hIdx === 2 && <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />}
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-serif text-xs font-bold text-slate-100">
                                {h.title}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                                {h.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Empty State */}
          {filteredModrinth.length === 0 && filteredArchived.length === 0 && (
            <div className="p-8 text-center bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-2">
              <p className="text-sm text-slate-400 font-mono">No matching versions found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLoaderFilter('all');
                  setActiveTab('all');
                }}
                className="text-xs text-sky-400 hover:underline font-mono"
              >
                Clear active filters
              </button>
            </div>
          )}
        </div>
      </div>
    </UpdatedFrame>
  );
}
