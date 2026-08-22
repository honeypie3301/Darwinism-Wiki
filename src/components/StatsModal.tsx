import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  RefreshCw, 
  Activity, 
  Users, 
  Terminal, 
  FileText, 
  Eye, 
  Database,
  Dna
} from 'lucide-react';
import { doc, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, hasConfig } from '../lib/firebase';

interface TelemetryLog {
  timestamp: string;
  type: 'unique' | 'repeat';
  slug: string;
  visitorId: string;
  wiki?: string;
}

const DARWINISM_EXCLUSIVE_SLUGS = new Set([
  'serum-overview', 'biological-adaptations', 'serum-tiers'
]);

const BACKWOODS_SLUGS = new Set([
  'sanity', 'version-history', 'achievements', 'mobs', 'blocks', 'commands', 'dimensions', 'terminated', 'entities', 'world-gen'
]);

const BONEMEAL_SLUGS = new Set([
  'fertilizer-tiers', 'growth-rates', 'bonemeal-recipes'
]);

function getLogWikiInfo(log: TelemetryLog) {
  // 1. Explicit wiki tag from modern telemetry calls
  if (log.wiki) {
    const w = log.wiki.toLowerCase();
    if (w.includes('darwin')) {
      return { id: 'darwinism', name: 'DARWINISM', colorClass: 'bg-sky-950/80 text-sky-300 border-sky-700/80' };
    }
    if (w.includes('backwood')) {
      return { id: 'backwoods', name: 'BACKWOODS', colorClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80' };
    }
    if (w.includes('bonemeal')) {
      return { id: 'super_bonemeal', name: 'SUPER_BONEMEAL', colorClass: 'bg-amber-950/80 text-amber-300 border-amber-700/80' };
    }
    return { id: w, name: w.toUpperCase(), colorClass: 'bg-slate-800 text-slate-300 border-slate-700' };
  }

  // 2. Un-tagged legacy logs (where log.wiki is missing):
  if (DARWINISM_EXCLUSIVE_SLUGS.has(log.slug)) {
    return { id: 'darwinism', name: 'DARWINISM', colorClass: 'bg-sky-950/80 text-sky-300 border-sky-700/80' };
  }
  if (BONEMEAL_SLUGS.has(log.slug)) {
    return { id: 'super_bonemeal', name: 'SUPER_BONEMEAL', colorClass: 'bg-amber-950/80 text-amber-300 border-amber-700/80' };
  }
  if (BACKWOODS_SLUGS.has(log.slug)) {
    return { id: 'backwoods', name: 'BACKWOODS', colorClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80' };
  }

  // 3. Un-tagged shared/ambiguous slugs (e.g., 'home', 'items', 'recipes', 'versions'):
  // Since Darwinism Wiki NOW explicitly sends `wiki: 'darwinism'`, any un-tagged log for 'home' comes from Backwoods Wiki.
  return { id: 'backwoods', name: 'BACKWOODS', colorClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80' };
}

interface StatsData {
  uniqueCount: number;
  repeatCount: number;
  totalCount: number;
  pageViews: Record<string, number>;
  logs: TelemetryLog[];
}

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Array<{ slug: string; title: string }>;
}

export default function StatsModal({ isOpen, onClose, articles }: StatsModalProps) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [wikiFilter, setWikiFilter] = useState<'darwinism' | 'all'>('darwinism');

  const filteredLogs = React.useMemo(() => {
    if (!stats?.logs) return [];
    if (wikiFilter === 'all') return stats.logs;
    return stats.logs.filter(log => getLogWikiInfo(log).id === 'darwinism');
  }, [stats?.logs, wikiFilter]);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setError(null);
    setIsSandbox(false);

    let statsUnsubscribe: () => void = () => {};
    let logsUnsubscribe: () => void = () => {};

    const enableSandboxFallback = () => {
      // Fallback to local storage
      const localStatsStr = localStorage.getItem('local_wiki_stats');
      if (localStatsStr) {
        try {
          setStats(JSON.parse(localStatsStr));
          setIsSandbox(true);
        } catch (e) {
          setError('Failed to parse local stats database.');
        }
      } else {
        // Initialize default mock local stats
        const localId = localStorage.getItem('wiki_visitor_id') || 'surv_local';
        const defaultStats = {
          uniqueCount: 12,
          repeatCount: 18,
          totalCount: 30,
          pageViews: { 'home': 12, 'serum-overview': 8, 'items': 6, 'blocks': 4 },
          logs: [
            {
              timestamp: new Date().toISOString(),
              type: 'unique' as const,
              slug: 'home',
              wiki: 'darwinism',
              visitorId: localId.substring(0, 12)
            },
            {
              timestamp: new Date(Date.now() - 600000).toISOString(),
              type: 'repeat' as const,
              slug: 'sanity',
              wiki: 'backwoods',
              visitorId: 'surv_f2910a'
            },
            {
              timestamp: new Date(Date.now() - 1800000).toISOString(),
              type: 'unique' as const,
              slug: 'serum-overview',
              wiki: 'darwinism',
              visitorId: 'surv_f2910a'
            }
          ]
        };
        localStorage.setItem('local_wiki_stats', JSON.stringify(defaultStats));
        setStats(defaultStats);
        setIsSandbox(true);
      }
      setLoading(false);
    };

    if (!hasConfig) {
      enableSandboxFallback();
      return;
    }

    try {
      // 1. Listen to global stats doc
      statsUnsubscribe = onSnapshot(doc(db, 'stats', 'global'), (statsDoc) => {
        if (statsDoc.exists()) {
          const data = statsDoc.data();
          setStats(prev => ({
            uniqueCount: data.uniqueCount || 0,
            repeatCount: data.repeatCount || 0,
            totalCount: data.totalCount || 0,
            pageViews: data.pageViews || {},
            logs: prev?.logs || []
          }));
          setIsSandbox(false);
        } else {
          // Document does not exist yet (first time initialization)
          setStats(prev => ({
            uniqueCount: 0,
            repeatCount: 0,
            totalCount: 0,
            pageViews: {},
            logs: prev?.logs || []
          }));
          setIsSandbox(false);
        }
        setLoading(false);
      }, (err) => {
        console.warn("Error listening to Firestore global stats, enabling local sandbox fallback.", err);
        enableSandboxFallback();
      });

      // 2. Listen to logs query
      const logsQuery = query(
        collection(db, 'telemetry_logs'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      logsUnsubscribe = onSnapshot(logsQuery, (snapshot) => {
        const logs: TelemetryLog[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          let tsStr = new Date().toISOString();
          if (data.timestamp) {
            if (typeof data.timestamp.toDate === 'function') {
              tsStr = data.timestamp.toDate().toISOString();
            } else if (data.timestamp.seconds) {
              tsStr = new Date(data.timestamp.seconds * 1000).toISOString();
            } else {
              tsStr = new Date(data.timestamp).toISOString();
            }
          }
          logs.push({
            timestamp: tsStr,
            type: data.type || 'repeat',
            slug: data.slug || 'home',
            visitorId: data.visitorId || 'unknown',
            wiki: data.wiki || undefined
          });
        });
        setStats(prev => {
          if (!prev) {
            return {
              uniqueCount: 0,
              repeatCount: 0,
              totalCount: 0,
              pageViews: {},
              logs
            };
          }
          return {
            ...prev,
            logs
          };
        });
      }, (err) => {
        console.warn("Error listening to Firestore logs, enabling local sandbox fallback.", err);
        enableSandboxFallback();
      });

    } catch (err) {
      console.warn("Firebase execution error, enabling local sandbox fallback.", err);
      enableSandboxFallback();
    }

    return () => {
      statsUnsubscribe();
      logsUnsubscribe();
    };
  }, [isOpen, retryCount]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    if (isSandbox) {
      const localStatsStr = localStorage.getItem('local_wiki_stats');
      if (localStatsStr) {
        try {
          setStats(JSON.parse(localStatsStr));
        } catch (e) {
          console.error(e);
        }
      }
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const getArticleTitle = (slug: string) => {
    const article = articles.find(a => a.slug === slug);
    if (article) return article.title;
    // Format fallback neatly
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay with blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          id="stats-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-4xl bg-[#070a13] border border-[#1e293b] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] font-mono z-50 text-slate-300"
          id="stats-modal-container"
        >
          {/* Header - Terminal Style */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#0b101d] border-b border-[#1e293b] select-none">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/85" />
                <span className="w-3 h-3 rounded-full bg-amber-500/85" />
                <span className="w-3 h-3 rounded-full bg-sky-400/85" />
              </div>
              <div className="h-4 w-[1px] bg-[#1e293b] mx-1" />
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-sky-300 uppercase flex items-center gap-2">
                  WIKI TELEMETRY TERMINAL v1.0.9
                  {isSandbox && (
                    <span className="text-amber-400 text-[9px] px-1.5 py-0.5 bg-amber-950/40 border border-amber-900/40 rounded font-normal uppercase tracking-normal animate-pulse">
                      SANDBOX MODE
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleManualRefresh}
                disabled={loading || isRefreshing}
                className="p-1.5 text-slate-400 hover:text-sky-300 hover:bg-[#162032] rounded transition-all cursor-pointer disabled:opacity-40"
                title="Synchronize Database Logs"
                id="stats-refresh-btn"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/20 rounded transition-all cursor-pointer"
                id="stats-close-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {loading && !stats ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <Activity className="w-8 h-8 text-sky-400 animate-pulse" />
                <div className="text-xs text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                  Querying server registry files...
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-red-500 border border-red-900/30 bg-red-950/10 rounded-lg p-6">
                <Database className="w-8 h-8 mb-3 text-red-600 animate-bounce" />
                <h4 className="text-sm font-bold uppercase mb-1">Access Protocol Failed</h4>
                <p className="text-xs text-red-400 max-w-md leading-relaxed">{error}</p>
                <button 
                  onClick={() => { setError(null); setRetryCount(prev => prev + 1); }}
                  className="mt-4 px-3 py-1.5 bg-red-950/40 hover:bg-red-950/60 border border-red-800 text-xs rounded transition-all text-red-300"
                >
                  Retry Connection
                </button>
              </div>
            ) : stats ? (
              <>
                {/* 1. Dashboard Numbers (Bento Style Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Total Hits */}
                  <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg relative overflow-hidden group hover:border-[#334155] transition-colors">
                    <div className="absolute top-3 right-3 text-[#1e293b] group-hover:text-sky-950 transition-colors">
                      <Eye className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Total Hits (Impressions)
                    </span>
                    <span className="text-3xl font-extrabold text-slate-100 font-sans">
                      {stats.totalCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-500 block mt-1 uppercase">
                      Global page impressions registered
                    </span>
                  </div>

                  {/* Unique Survivors */}
                  <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg relative overflow-hidden group hover:border-[#334155] transition-colors">
                    <div className="absolute top-3 right-3 text-[#1e293b] group-hover:text-sky-950 transition-colors">
                      <Users className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                      Unique Survivors
                    </span>
                    <span className="text-3xl font-extrabold text-sky-300 font-sans">
                      {stats.uniqueCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-sky-500/70 block mt-1 uppercase">
                      Distinct terminal nodes recorded
                    </span>
                  </div>

                  {/* Returning Operatives */}
                  <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg relative overflow-hidden group hover:border-[#334155] transition-colors">
                    <div className="absolute top-3 right-3 text-[#1e293b] group-hover:text-cyan-950 transition-colors">
                      <Activity className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      Returning Operatives
                    </span>
                    <span className="text-3xl font-extrabold text-cyan-300 font-sans">
                      {stats.repeatCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-cyan-500/70 block mt-1 uppercase">
                      Re-entries from identified nodes
                    </span>
                  </div>
                </div>

                {/* 2. Live Logs layout (Full Width) */}
                <div className="bg-[#0b101d] border border-[#1e293b] rounded-lg p-4 flex flex-col h-[320px] mt-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-3 select-none flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                      </span>
                      <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                        Telemetry Log Trace
                      </span>
                    </div>

                    {/* Wiki Origin Filter Selector */}
                    <div className="flex items-center gap-1 bg-[#070a13] p-0.5 rounded border border-[#1e293b]">
                      <button
                        onClick={() => setWikiFilter('darwinism')}
                        className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded transition-all cursor-pointer ${
                          wikiFilter === 'darwinism'
                            ? 'bg-sky-950 text-sky-300 border border-sky-700/80 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        DARWINISM ONLY
                      </button>
                      <button
                        onClick={() => setWikiFilter('all')}
                        className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded transition-all cursor-pointer ${
                          wikiFilter === 'all'
                            ? 'bg-sky-950 text-sky-300 border border-sky-700/80 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        ALL 3 WIKIS
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-[11px] font-mono scrollbar-thin">
                    {filteredLogs.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 italic">
                        No telemetry logs registered for {wikiFilter === 'darwinism' ? 'Darwinism Wiki' : 'any connected wiki'}.
                      </div>
                    ) : (
                      filteredLogs.map((log, index) => {
                        const date = new Date(log.timestamp);
                        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                        const isNew = log.type === 'unique';
                        const info = getLogWikiInfo(log);

                        return (
                          <div 
                            key={index} 
                            className="border-b border-[#1e293b]/40 pb-1.5 last:border-0 leading-normal flex items-center flex-wrap gap-x-1.5 gap-y-0.5"
                          >
                            <span className="text-slate-500 font-semibold">[{timeStr}]</span>
                            <span className="text-sky-400/90 font-bold uppercase tracking-tight">CONN_IN</span>
                            <span className="text-slate-300 font-bold">{log.visitorId}</span>
                            <span className="text-slate-500">accessed</span>
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border select-none ${info.colorClass}`}>
                              {info.id === 'darwinism' && <Dna className="w-2.5 h-2.5 text-sky-400 shrink-0" />}
                              {info.name}
                            </span>
                            <span className="text-sky-300 hover:underline font-semibold">{getArticleTitle(log.slug)}</span>
                            <span className={`inline-block px-1 rounded text-[9px] uppercase font-bold leading-none py-0.5 ${
                              isNew 
                                ? 'bg-sky-950/90 text-sky-300 border border-sky-700/80' 
                                : 'bg-[#0f172a] text-cyan-400 border border-cyan-900/60'
                            }`}>
                              {isNew ? 'NEW' : 'RET'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Footer Notes */}
                <div className="p-3 bg-[#0b101d] border border-[#1e293b] rounded text-[10px] text-slate-400 leading-relaxed select-none">
                  <span className="text-sky-400 font-bold mr-1">PROTOCOL SUMMARY:</span>{' '}
                  {isSandbox 
                    ? "Sandbox storage active. Since this is hosted as a static page (e.g. GitHub Pages) or the API server is unreachable, visit statistics are tracked and saved securely within your browser's local sandbox storage."
                    : "This terminal presents actual, persistent server-side analytics from the Backwoods database. All visitor sessions are anonymized with generated local hardware keys to satisfy survival privacy parameters."}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-500 italic">
                System awaiting first scan.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
