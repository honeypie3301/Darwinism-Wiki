import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Tag,
  Sparkles,
  Download,
  ExternalLink,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  Box,
  FileCode,
  CheckCircle2,
  HardDrive
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

const MODRINTH_PROJECT_SLUG = 'darwinism';
const MODRINTH_PROJECT_ID = 'nwRng7jo';
const CACHE_KEY = 'darwinism_modrinth_versions_cache';

const FALLBACK_MODRINTH_VERSIONS: ModrinthVersion[] = [
  {
    id: 'TpuNvlAU',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.4.1',
    version_number: '1.4.1',
    game_versions: ['1.21.8'],
    loaders: ['neoforge'],
    date_published: '2026-05-22T07:15:02.837914Z',
    downloads: 41,
    version_type: 'release',
    changelog: 'Changes\n- Moved static attribute modifiers to the potion effect element instead of handling them in procedures\n- Fixed attribute reset triggering incorrectly when upgrading between tiers\n- Imported to 1.21.8 Neoforge',
    files: [
      {
        id: 'darwinism-1.4.1-neoforge-1.21.8.jar',
        url: 'https://modrinth.com/mod/darwinism/version/TpuNvlAU',
        filename: 'darwinism-1.4.1-neoforge-1.21.8.jar',
        primary: true,
        size: 0,
        hashes: {}
      }
    ]
  },
  {
    id: 'OKYzNSib',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.4.1',
    version_number: '1.4.1',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-05-22T07:14:50.538780Z',
    downloads: 130,
    version_type: 'release',
    changelog: 'Changes\n- Moved static attribute modifiers to the potion effect element instead of handling them in procedures\n- Fixed attribute reset triggering incorrectly when upgrading between tiers',
    files: [
      {
        id: 'darwinism-1.4.1-neoforge-1.21.1.jar',
        url: 'https://modrinth.com/mod/darwinism/version/OKYzNSib',
        filename: 'darwinism-1.4.1-neoforge-1.21.1.jar',
        primary: true,
        size: 0,
        hashes: {}
      }
    ]
  },
  {
    id: 'nArA8l37',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.4.0',
    version_number: '1.4.0',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-04-04T15:21:53.410626Z',
    downloads: 36,
    version_type: 'release',
    changelog: 'New content\n\n- Added Darwinism III, a third tier potion effect with +60 max health via additive attribute modifier and upgraded adaptation logic. Includes Regeneration on application to fill the bonus health.\n\nChanges\n\n- Extracted repeated attribute reset logic into a shared AttributeResetProcedure helper, replacing identical copy-pasted attribute blocks across RespawnSafetyNet, RespawnSafetyNet2, DarwinismEffectExpires, Darwinism2EffectExpires, and LoginSafetyNet. Adding or changing an attribute mutation now only requires editing one file instead of five.\n- Fixed attribute reset triggering incorrectly when upgrading between tiers. DarwinismEffectExpires now only resets if neither tier 2 nor tier 3 is active. Darwinism2EffectExpires now only resets if tier 3 is not active.\n- Added devolution prevention for tier 3. Drinking a lower tier potion while tier 3 is active is now refused. Tier 2 and tier 1 expiry procedures updated to account for tier 3.',
    files: [
      {
        id: 'darwinism-1.4.0-neoforge-1.21.1.jar',
        url: 'https://modrinth.com/mod/darwinism/version/nArA8l37',
        filename: 'darwinism-1.4.0-neoforge-1.21.1.jar',
        primary: true,
        size: 0,
        hashes: {}
      }
    ]
  },
  {
    id: 'obtxeB93',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.3.1',
    version_number: '1.3.1',
    game_versions: ['1.20.1'],
    loaders: ['forge'],
    date_published: '2026-03-10T12:57:10.701240Z',
    downloads: 105,
    version_type: 'beta',
    changelog: 'Backported to 1.20.1\n\n- Changed attributes to flying speed, max health, knockback resistance, step height addition since 1.20 lacks features.',
    files: [
      {
        id: 'potion_of_darwinism-1.3.1-forge-1.20.1.jar',
        url: 'https://modrinth.com/mod/darwinism/version/obtxeB93',
        filename: 'potion_of_darwinism-1.3.1-forge-1.20.1.jar',
        primary: true,
        size: 0,
        hashes: {}
      }
    ]
  },
  {
    id: 'CHmC27hm',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.3.1',
    version_number: '1.3.1',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-03-09T11:32:00.881265Z',
    downloads: 33,
    version_type: 'release',
    changelog: 'The Adrenaline Evolution System\n- Reactive Scaling: Regeneration speed is now determined mathematically, allowing for a smooth power curve.\n- Integrated Metabolism: Regeneration now naturally decays when out of combat.\n- Precision Rounding: Added Math.round() logic to the procedure to ensure the game engine correctly translates the variable into integer potion levels.\n\nCombat & Detection Fixes\n- Universal Trigger: Fixed a critical logic error to ensure adrenaline builds from all damage sources, including Mob attacks, TNT, and Projectiles, rather than just player hits.\n- High-Intensity Gain: Tuned adrenaline gain to +2 per hit, making the evolution feel more responsive during fast-paced fights.\n\nEnvironmental & Attribute Locking\n- Anti-Devolution Protocol: Implemented a hard-lock to prevent a "Darwinism I" potion from overriding the superior "Darwinism II" attribute set.\n- Attribute Persistence Fix: Optimized the "Respawn Safety Net" and effect expiration logic to ensure Safe Fall Distance (3.0), Knockback Resistance (0.0), and Step Height (0.6) correctly reset to vanilla defaults.',
    files: [
      {
        id: 'DFMoafLm',
        url: 'https://cdn.modrinth.com/data/nwRng7jo/versions/CHmC27hm/potion_of_darwinism-1.3.1-neoforge-1.21.1.jar',
        filename: 'potion_of_darwinism-1.3.1-neoforge-1.21.1.jar',
        primary: true,
        size: 46655,
        hashes: {}
      }
    ]
  },
  {
    id: 'MNCW66iM',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.3.0',
    version_number: '1.3.0',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-03-01T07:49:59.563209Z',
    downloads: 27,
    version_type: 'release',
    changelog: 'New Item: Potion of Darwinism II\n- Apex Tier Adaptation: A stronger variant of the original serum with enhanced durations and effect levels.\n\nReactive Evolution (Logic Upgrades)\n- Threat Perception (Blast Shield): Automatically triggers Resistance IV for 5 seconds if Primed TNT, Creepers, or TNT Minecarts are detected within a 6-block radius.\n- Cryo-Insulation: Inherited immunity to freezing in Powder Snow.',
    files: [
      {
        id: '7oF0kfgI',
        url: 'https://cdn.modrinth.com/data/nwRng7jo/versions/MNCW66iM/potion_of_darwinism-1.3.0-neoforge-1.21.1.jar',
        filename: 'potion_of_darwinism-1.3.0-neoforge-1.21.1.jar',
        primary: true,
        size: 42301,
        hashes: {}
      }
    ]
  },
  {
    id: 'Gn4n4LCl',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.2.0',
    version_number: '1.2.0',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-02-25T04:32:24.058882Z',
    downloads: 23,
    version_type: 'release',
    changelog: 'Core Logic Refinement\n- Emergency Stabilization (Priority Fix): Health checks prioritize Health < 2 over Health < 7.\n- Kinetic Jump Discharge: Checks presence of Jump Boost before removing.\n- Network & CPU Optimization: Migrated Base Attribute modifications to Effect Started/Expired triggers.',
    files: [
      {
        id: 'S67GRamt',
        url: 'https://cdn.modrinth.com/data/nwRng7jo/versions/Gn4n4LCl/potion_of_darwinism-1.2.0-neoforge-1.21.1.jar',
        filename: 'potion_of_darwinism-1.2.0-neoforge-1.21.1.jar',
        primary: true,
        size: 28693,
        hashes: {}
      }
    ]
  },
  {
    id: 'qdZpwCpC',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.1.0',
    version_number: '1.1.0',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-02-22T12:21:11.935663Z',
    downloads: 26,
    version_type: 'release',
    changelog: 'New Biological Adaptations\n- Survival Instinct (Haste II)\n- Emergency Stabilization below 1 heart\n- Adrenaline Recovery below 3.5 hearts',
    files: [
      {
        id: 'YKlvX44s',
        url: 'https://cdn.modrinth.com/data/nwRng7jo/versions/qdZpwCpC/potion_of_darwinism-1.1.0-neoforge-1.21.1.jar',
        filename: 'potion_of_darwinism-1.1.0-neoforge-1.21.1.jar',
        primary: true,
        size: 22296,
        hashes: {}
      }
    ]
  },
  {
    id: 'eejh8pNW',
    project_id: MODRINTH_PROJECT_ID,
    name: 'Darwinism 1.0.0',
    version_number: '1.0.0',
    game_versions: ['1.21.1'],
    loaders: ['neoforge'],
    date_published: '2026-02-22T10:00:44.876967Z',
    downloads: 22,
    version_type: 'release',
    changelog: '- Adrenaline Response: Swinging your arms in combat triggers an immediate Strength boost.\n- Bioluminescence: Entering dark areas automatically grants Night Vision.\n- Kinetic Evolution: Sprinting for more than 3 seconds grants a massive Speed burst.',
    files: [
      {
        id: 'qDLr7tVz',
        url: 'https://cdn.modrinth.com/data/nwRng7jo/versions/eejh8pNW/potion_of_darwinism-1.0.0-neoforge-1.21.1.jar',
        filename: 'potion_of_darwinism-1.0.0-neoforge-1.21.1.jar',
        primary: true,
        size: 21395,
        hashes: {}
      }
    ]
  }
];

function formatBytes(bytes: number): string {
  if (!bytes || isNaN(bytes)) return 'JAR';
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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

function renderChangelog(text?: string) {
  if (!text) return <p className="text-xs text-[#5a6b5e] italic">No changelog provided.</p>;

  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs text-[#a3ada3] font-mono leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[#a9d1b0] select-none mt-1">•</span>
              <span>{content}</span>
            </div>
          );
        }

        if (trimmed.endsWith(':') || trimmed.toLowerCase() === 'new content' || trimmed.toLowerCase() === 'changes') {
          return (
            <div key={idx} className="font-bold text-[#e0e7e0] font-serif uppercase tracking-wider pt-2 pb-0.5 text-[11px] border-b border-[#1c241e]">
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [loaderFilter, setLoaderFilter] = useState<'all' | 'neoforge' | 'forge'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleChangelog = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchVersions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.modrinth.com/v2/project/${MODRINTH_PROJECT_SLUG}/version`, {
        headers: {
          'User-Agent': 'DarwinismWiki/1.0 (https://github.com/honeypie3301/Darwinism-Wiki)'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ModrinthVersion[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setModrinthVersions(data);
        setIsLive(true);
        setLastUpdated(new Date());
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data
          }));
        } catch {
          // Ignore localStorage errors
        }
      }
    } catch {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed.data)) {
            setModrinthVersions(parsed.data);
            setLastUpdated(new Date(parsed.timestamp));
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

  const filteredModrinth = useMemo(() => {
    return modrinthVersions.filter(v => {
      if (loaderFilter !== 'all') {
        const hasLoader = v.loaders.some(l => l.toLowerCase() === loaderFilter);
        if (!hasLoader) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesVer = v.version_number.toLowerCase().includes(q);
        const matchesChangelog = (v.changelog || '').toLowerCase().includes(q);
        const matchesGame = v.game_versions.some(gv => gv.includes(q));
        if (!matchesName && !matchesVer && !matchesChangelog && !matchesGame) return false;
      }
      return true;
    });
  }, [modrinthVersions, loaderFilter, searchQuery]);

  return (
    <UpdatedFrame id="dw_versions_modrinth" isUpdated={true}>
      <div className="space-y-8 py-2 select-text">
        {/* Header Overview Card */}
        <div className="p-5 bg-[#0f1210] border border-[#1c241e] rounded-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#e0e7e0] tracking-wide">
                  Version Archive &amp; Release Log
                </h2>
                {isLive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    LIVE MODRINTH
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1d1b14] text-amber-300 border border-amber-800/60">
                    SNAPSHOT CACHE
                  </span>
                )}
              </div>
              <p className="text-xs text-[#829285] font-mono leading-relaxed max-w-2xl">
                Synchronized live with the Modrinth API for Darwinism ({MODRINTH_PROJECT_ID}).
                {lastUpdated && (
                  <span className="text-[#5a6b5e] ml-2">
                    • Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={fetchVersions}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141a15] hover:bg-[#1c241e] border border-[#2a362d] text-[#a9d1b0] text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Syncing...' : 'Refresh API'}</span>
              </button>
              <a
                href={`https://modrinth.com/mod/${MODRINTH_PROJECT_SLUG}/versions`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122618] hover:bg-[#193522] border border-[#2a5436] text-[#81caa9] text-xs font-mono transition-colors"
              >
                <span>Modrinth Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#1c241e]">
            <div className="bg-[#0a0d0b] border border-[#172019] rounded-lg p-3">
              <div className="text-[10px] font-mono text-[#5a6b5e] uppercase tracking-wider">Public Builds</div>
              <div className="text-lg font-bold font-mono text-[#e0e7e0] mt-0.5">{modrinthVersions.length}</div>
            </div>
            <div className="bg-[#0a0d0b] border border-[#172019] rounded-lg p-3">
              <div className="text-[10px] font-mono text-[#5a6b5e] uppercase tracking-wider">Target Version</div>
              <div className="text-lg font-bold font-mono text-[#a9d1b0] mt-0.5">1.21.1 / 1.21.8</div>
            </div>
            <div className="bg-[#0a0d0b] border border-[#172019] rounded-lg p-3">
              <div className="text-[10px] font-mono text-[#5a6b5e] uppercase tracking-wider">Latest Release</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                v{modrinthVersions[0]?.version_number || '1.4.1'}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0c0f0d] p-3 border border-[#18201a] rounded-xl">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Loaders' },
              { id: 'neoforge', label: 'NeoForge' },
              { id: 'forge', label: 'Forge' }
            ].map(loader => (
              <button
                key={loader.id}
                onClick={() => setLoaderFilter(loader.id as typeof loaderFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                  loaderFilter === loader.id
                    ? 'bg-[#19281d] text-[#a9d1b0] border-[#2e4835]'
                    : 'bg-transparent text-[#829285] border-transparent hover:text-[#c9d1c9]'
                }`}
              >
                {loader.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-[#5a6b5e] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search versions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080a08] border border-[#1c241e] rounded-lg py-1.5 pl-8.5 pr-3 text-xs font-mono text-[#e0e7e0] placeholder:text-[#4e5d51] focus:outline-none focus:border-[#709978]"
            />
          </div>
        </div>

        {/* Version Timeline */}
        <div className="relative border-l-2 border-[#1e261f] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-6">
          {filteredModrinth.map((v, idx) => {
            const isLatest = idx === 0 && loaderFilter === 'all' && !searchQuery.trim();
            const isExpanded = expandedIds[v.id] ?? isLatest;
            const primaryFile = v.files.find(f => f.primary) || v.files[0];

            return (
              <div key={v.id} className="relative">
                <span
                  className={`absolute -left-[31px] sm:-left-[39px] top-6 w-3 h-3 rounded-full border-2 ${
                    isLatest
                      ? 'bg-[#709978] border-[#a9d1b0] shadow-[0_0_10px_#709978]'
                      : 'bg-[#111612] border-[#303d33]'
                  }`}
                />

                <div className="p-5 bg-[#0f1210] border border-[#1c241e] hover:border-[#2a362d] rounded-xl transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#19201a] pb-3.5">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#e0e7e0]">
                          {v.name}
                        </h3>
                        {isLatest && (
                          <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#152e1e] text-[#a9d1b0] border border-[#2d5a3b] rounded">
                            LATEST RELEASE
                          </span>
                        )}
                        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase rounded border bg-[#121c15] text-[#81caa9] border-[#213e2a]">
                          {v.version_type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#7a8a7d]">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#5a6b5e]" />
                          v{v.version_number}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#5a6b5e]" />
                          {formatDate(v.date_published)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3 text-[#5a6b5e]" />
                          {v.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {v.loaders.map(loader => (
                        <span
                          key={loader}
                          className="px-2 py-1 text-[10px] font-mono font-bold uppercase rounded bg-[#151b16] text-[#a9d1b0] border border-[#263329] flex items-center gap-1"
                        >
                          <Box className="w-2.5 h-2.5 text-[#709978]" />
                          {loader}
                        </span>
                      ))}
                      {v.game_versions.map(gv => (
                        <span
                          key={gv}
                          className="px-2 py-1 text-[10px] font-mono rounded bg-[#111512] text-[#8fa093] border border-[#1f2922]"
                        >
                          MC {gv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => toggleChangelog(v.id)}
                      className="flex items-center justify-between w-full text-left text-xs font-mono text-[#a9d1b0] hover:text-[#e0e7e0] transition-colors cursor-pointer py-1"
                    >
                      <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[11px]">
                        <FileCode className="w-3.5 h-3.5 text-[#709978]" />
                        Release Changelog
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="bg-[#090b09] border border-[#161c17] rounded-lg p-3.5 mt-1">
                        {renderChangelog(v.changelog)}
                      </div>
                    )}
                  </div>

                  {primaryFile && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[#161d17] text-[11px] font-mono">
                      <div className="flex items-center gap-2 text-[#6e7e71] truncate">
                        <HardDrive className="w-3.5 h-3.5 shrink-0 text-[#5a6b5e]" />
                        <span className="truncate">{primaryFile.filename}</span>
                        <span className="text-[#4a594d] shrink-0">({formatBytes(primaryFile.size)})</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://modrinth.com/mod/${MODRINTH_PROJECT_SLUG}/version/${v.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#141a15] hover:bg-[#1c241e] border border-[#232f25] text-[#8fa093] hover:text-[#e0e7e0] transition-colors flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <a
                          href={primaryFile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#152e1e] hover:bg-[#1c3e28] border border-[#2d5a3b] text-[#a9d1b0] transition-colors flex items-center gap-1 font-semibold"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download JAR</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredModrinth.length === 0 && (
          <div className="text-center py-12 bg-[#0f1210] border border-[#1c241e] rounded-xl space-y-2">
            <Sparkles className="w-8 h-8 text-[#5a6b5e] mx-auto" />
            <p className="text-sm font-serif text-[#a3ada3]">No matching release versions found.</p>
          </div>
        )}
      </div>
    </UpdatedFrame>
  );
}
