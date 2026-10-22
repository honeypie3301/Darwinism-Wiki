/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All descriptions must be factual, technical, and encyclopedic. Do not use storytelling prose.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * In-game mod mechanics and updates only. Never document wiki website changes.
 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  RefreshCw, 
  Activity, 
  Users, 
  Terminal, 
  Eye, 
  Database,
  BarChart3,
  Radio,
  Clock,
  Search,
  CheckCircle2
} from 'lucide-react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  getDocs,
  where,
  collection, 
  increment, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { db, hasConfig } from '../lib/firebase';

interface TelemetryLog {
  timestamp: string;
  type: 'unique' | 'repeat';
  slug: string;
  visitorId: string;
  wiki?: string;
}

interface SearchSummary {
  totalLogs: number;
  uniqueCount: number;
  repeatCount: number;
  matchedNodes: string[];
  newestDate?: string;
  oldestDate?: string;
  topTarget?: { title: string; count: number };
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

const DARWINISM_SLUGS = new Set([
  'home',
  'serum-overview',
  'biological-adaptations',
  'serum-tiers',
  'items',
  'recipes',
  'versions',
  'telemetry-terminal'
]);

function isDarwinismLog(log: TelemetryLog): boolean {
  if (log.wiki) {
    return log.wiki.toLowerCase().includes('darwin');
  }
  return DARWINISM_SLUGS.has(log.slug);
}

export default function StatsModal({ isOpen, onClose, articles }: StatsModalProps) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [logFilter, setLogFilter] = useState<'all' | 'unique' | 'repeat'>('all');
  const [showAllTargets, setShowAllTargets] = useState(false);
  const [isDeviceIgnored, setIsDeviceIgnored] = useState<boolean>(() => {
    return localStorage.getItem('wiki_telemetry_ignore_device') === 'true';
  });
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // User ID database search engine state
  const [searchUserId, setSearchUserId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<TelemetryLog[] | null>(null);
  const [searchSummary, setSearchSummary] = useState<SearchSummary | null>(null);
  const searchCacheRef = useRef<Map<string, TelemetryLog[]>>(new Map());

  const currentVisitorId = useMemo(() => {
    return localStorage.getItem('wiki_visitor_id') || 'unassigned';
  }, [isOpen]);

  const currentVisitorIdShort = currentVisitorId.substring(0, 12);

  const handleStopTracking = () => {
    localStorage.setItem('wiki_telemetry_ignore_device', 'true');
    setIsDeviceIgnored(true);
    setStatusNotice('DEVICE TELEMETRY HALTED');
    setTimeout(() => setStatusNotice(null), 2800);
  };

  const handleResumeTracking = () => {
    localStorage.removeItem('wiki_telemetry_ignore_device');
    setIsDeviceIgnored(false);
    setStatusNotice('DEVICE TELEMETRY ACTIVE');
    setTimeout(() => setStatusNotice(null), 2800);
  };

  // Log terminal open event to telemetry trace stream
  const hasLoggedOpenRef = useRef(false);
  useEffect(() => {
    if (!isOpen) {
      hasLoggedOpenRef.current = false;
      return;
    }
    if (hasLoggedOpenRef.current) return;
    hasLoggedOpenRef.current = true;

    const recordTerminalAccess = async () => {
      try {
        if (localStorage.getItem('wiki_telemetry_ignore_device') === 'true') {
          return;
        }

        let visitorId = localStorage.getItem('wiki_visitor_id');
        if (!visitorId) {
          visitorId = 'surv_' + Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);
          localStorage.setItem('wiki_visitor_id', visitorId);
        }

        if (!hasConfig) {
          const raw = localStorage.getItem('local_wiki_stats');
          const localData: StatsData = raw ? JSON.parse(raw) : {
            uniqueCount: 1,
            repeatCount: 0,
            totalCount: 1,
            pageViews: {},
            logs: []
          };
          localData.totalCount = (localData.totalCount || 0) + 1;
          localData.repeatCount = (localData.repeatCount || 0) + 1;
          localData.pageViews = localData.pageViews || {};
          localData.pageViews['telemetry-terminal'] = (localData.pageViews['telemetry-terminal'] || 0) + 1;
          localData.logs = localData.logs || [];
          localData.logs.unshift({
            timestamp: new Date().toISOString(),
            type: 'repeat',
            slug: 'telemetry-terminal',
            wiki: 'darwinism',
            visitorId: visitorId.substring(0, 12)
          });
          if (localData.logs.length > 50) localData.logs = localData.logs.slice(0, 50);
          localStorage.setItem('local_wiki_stats', JSON.stringify(localData));
          return;
        }

        const statsDocRef = doc(db, 'stats', 'global');
        const statsWrite = setDoc(statsDocRef, {
          totalCount: increment(1),
          repeatCount: increment(1),
          pageViews: {
            'telemetry-terminal': increment(1)
          },
          ['pageViews.telemetry-terminal']: increment(1)
        }, { merge: true });

        const logWrite = addDoc(collection(db, 'telemetry_logs'), {
          timestamp: serverTimestamp(),
          type: 'repeat',
          slug: 'telemetry-terminal',
          wiki: 'darwinism',
          visitorId: visitorId.substring(0, 12)
        });

        await Promise.all([statsWrite, logWrite]);
      } catch (err) {
        console.error('Error logging terminal telemetry event:', err);
      }
    };

    recordTerminalAccess();
  }, [isOpen]);

  // Initial load and Firestore realtime listeners
  useEffect(() => {
    if (!isOpen) return;

    const cachedStats = localStorage.getItem('cached_telemetry_stats') || localStorage.getItem('local_wiki_stats');
    if (cachedStats) {
      try {
        setStats(JSON.parse(cachedStats));
      } catch (e) {
        // Fall back to clean state
      }
    }

    if (!hasConfig) {
      setIsSandbox(true);
      const localStatsStr = localStorage.getItem('local_wiki_stats');
      if (localStatsStr) {
        try {
          setStats(JSON.parse(localStatsStr));
        } catch (e) {
          console.error('Failed to parse local stats', e);
        }
      } else {
        const localId = localStorage.getItem('wiki_visitor_id') || 'surv_local';
        const defaultStats: StatsData = {
          uniqueCount: 1,
          repeatCount: 0,
          totalCount: 1,
          pageViews: {
            home: 1
          },
          logs: [
            {
              timestamp: new Date().toISOString(),
              type: 'unique',
              slug: 'home',
              wiki: 'darwinism',
              visitorId: localId.substring(0, 12)
            }
          ]
        };
        setStats(defaultStats);
        localStorage.setItem('local_wiki_stats', JSON.stringify(defaultStats));
      }
      return;
    }

    setLoading(true);
    setError(null);

    // Listen to global stats (filtering pageViews strictly for Darwinism slugs)
    const statsDocRef = doc(db, 'stats', 'global');
    const unsubStats = onSnapshot(statsDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const rawViews: Record<string, number> = { ...(data.pageViews || {}) };
        Object.keys(data).forEach(key => {
          if (key.startsWith('pageViews.')) {
            const slugKey = key.replace('pageViews.', '');
            rawViews[slugKey] = (rawViews[slugKey] || 0) + (Number(data[key]) || 0);
          }
        });

        const darwinismViews: Record<string, number> = {};
        let darwinismTotalHits = 0;
        Object.entries(rawViews).forEach(([slug, count]) => {
          if (DARWINISM_SLUGS.has(slug)) {
            darwinismViews[slug] = count;
            darwinismTotalHits += count;
          }
        });

        setStats(prev => {
          const nextStats: StatsData = {
            uniqueCount: data.uniqueCount || 0,
            repeatCount: data.repeatCount || 0,
            totalCount: darwinismTotalHits > 0 ? darwinismTotalHits : (data.totalCount || 0),
            pageViews: darwinismViews,
            logs: prev ? prev.logs : []
          };
          localStorage.setItem('cached_telemetry_stats', JSON.stringify(nextStats));
          return nextStats;
        });
        setLoading(false);
      }
    }, (err) => {
      console.warn('Realtime stats listener failed, fallback to local:', err);
      setError('Uplink degraded. Operating in offline telemetry cache.');
      setIsSandbox(true);
      setLoading(false);
    });

    // Listen to telemetry logs (filtering strictly for Darwinism wiki events)
    const logsQuery = query(
      collection(db, 'telemetry_logs'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    const unsubLogs = onSnapshot(logsQuery, (snapshot) => {
      const logs: TelemetryLog[] = [];
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        let ts = new Date().toISOString();
        if (d.timestamp && d.timestamp.toDate) {
          ts = d.timestamp.toDate().toISOString();
        } else if (d.timestamp) {
          ts = String(d.timestamp);
        }

        const entry: TelemetryLog = {
          timestamp: ts,
          type: d.type || 'repeat',
          slug: d.slug || 'unknown',
          visitorId: d.visitorId || 'anonymous',
          wiki: d.wiki
        };

        // Strictly keep logs belonging to Darwinism Wiki
        if (isDarwinismLog(entry)) {
          logs.push(entry);
        }
      });

      setStats(prev => {
        if (!prev) return null;
        const nextStats = { ...prev, logs: logs.slice(0, 50) };
        localStorage.setItem('cached_telemetry_stats', JSON.stringify(nextStats));
        return nextStats;
      });
      setLoading(false);
    }, (err) => {
      console.warn('Logs listener failed:', err);
      setLoading(false);
    });

    return () => {
      unsubStats();
      unsubLogs();
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Article title resolver
  const getArticleTitle = (slug: string): string => {
    if (slug === 'telemetry-terminal' || slug === 'terminal') {
      return 'Telemetry Terminal';
    }
    const found = articles.find(a => a.slug === slug);
    if (found) return found.title;
    return slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  // Node database search handler
  const handleSearchNode = async (term: string) => {
    const q = term.trim().toLowerCase();
    if (!q) {
      setSearchResults(null);
      setSearchSummary(null);
      return;
    }

    if (searchCacheRef.current.has(q)) {
      const cached = searchCacheRef.current.get(q)!;
      computeSearchSummary(cached);
      setSearchResults(cached);
      return;
    }

    setIsSearching(true);
    try {
      if (hasConfig) {
        const prefixes = [q];
        if (!q.startsWith('surv_') && !q.includes('_')) {
          prefixes.push('surv_' + q);
        }

        const found: TelemetryLog[] = [];
        for (const p of prefixes) {
          const logsRef = collection(db, 'telemetry_logs');
          const qRef = query(
            logsRef,
            where('visitorId', '>=', p),
            where('visitorId', '<=', p + '\uf8ff'),
            limit(100)
          );
          const snap = await getDocs(qRef);

          snap.forEach(docSnap => {
            const d = docSnap.data();
            let ts = new Date().toISOString();
            if (d.timestamp && d.timestamp.toDate) {
              ts = d.timestamp.toDate().toISOString();
            } else if (d.timestamp) {
              ts = String(d.timestamp);
            }
            const entry: TelemetryLog = {
              timestamp: ts,
              type: d.type || 'repeat',
              slug: d.slug || 'unknown',
              visitorId: d.visitorId || p,
              wiki: d.wiki
            };
            if (isDarwinismLog(entry)) {
              found.push(entry);
            }
          });
        }

        found.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        searchCacheRef.current.set(q, found);
        computeSearchSummary(found);
        setSearchResults(found);
      } else {
        const localLogs = stats?.logs || [];
        const filtered = localLogs.filter(l => l.visitorId.toLowerCase().includes(q) && isDarwinismLog(l));
        computeSearchSummary(filtered);
        setSearchResults(filtered);
      }
    } catch (err) {
      console.warn('Search query error:', err);
      const localLogs = stats?.logs || [];
      const filtered = localLogs.filter(l => l.visitorId.toLowerCase().includes(q) && isDarwinismLog(l));
      computeSearchSummary(filtered);
      setSearchResults(filtered);
    } finally {
      setIsSearching(false);
    }
  };

  const computeSearchSummary = (logs: TelemetryLog[]) => {
    if (logs.length === 0) {
      setSearchSummary(null);
      return;
    }

    let uniqueCount = 0;
    let repeatCount = 0;
    const targetMap: Record<string, number> = {};
    const nodes = new Set<string>();

    logs.forEach(l => {
      if (l.type === 'unique') uniqueCount++;
      else repeatCount++;
      nodes.add(l.visitorId);
      targetMap[l.slug] = (targetMap[l.slug] || 0) + 1;
    });

    let topSlug = '';
    let topMax = 0;
    Object.entries(targetMap).forEach(([s, count]) => {
      if (count > topMax) {
        topMax = count;
        topSlug = s;
      }
    });

    const dates = logs.map(l => new Date(l.timestamp).getTime()).filter(t => !isNaN(t));
    const oldest = dates.length > 0 ? new Date(Math.min(...dates)).toISOString() : undefined;
    const newest = dates.length > 0 ? new Date(Math.max(...dates)).toISOString() : undefined;

    setSearchSummary({
      totalLogs: logs.length,
      uniqueCount,
      repeatCount,
      matchedNodes: Array.from(nodes),
      oldestDate: oldest,
      newestDate: newest,
      topTarget: topSlug ? { title: getArticleTitle(topSlug), count: topMax } : undefined
    });
  };

  // Trigger search on input change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchNode(searchUserId);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchUserId, stats]);

  // Format relative time helper
  const formatRelativeTime = (timestamp: string): string => {
    const elapsed = Date.now() - new Date(timestamp).getTime();
    if (isNaN(elapsed) || elapsed < 0) return 'just now';
    const s = Math.floor(elapsed / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  };

  // Filtered log records (strictly Darwinism)
  const activeLogList = (searchResults !== null ? searchResults : (stats?.logs || [])).filter(isDarwinismLog);
  const filteredLogs = useMemo(() => {
    return activeLogList.filter(log => {
      if (logFilter === 'unique') return log.type === 'unique';
      if (logFilter === 'repeat') return log.type === 'repeat';
      return true;
    });
  }, [activeLogList, logFilter]);

  // Page view stats sorted across all Darwinism articles & logged targets
  const sortedPageViews = useMemo(() => {
    const rawViews = stats?.pageViews || {};

    // Tally from logs as well in case pageViews is lagging or unindexed
    const logCounts: Record<string, number> = {};
    if (stats?.logs) {
      stats.logs.forEach(l => {
        if (l.slug && DARWINISM_SLUGS.has(l.slug)) {
          logCounts[l.slug] = (logCounts[l.slug] || 0) + 1;
        }
      });
    }

    // Include all known wiki articles so the targets list is always populated
    const targetSlugs = new Set<string>([
      ...articles.map(a => a.slug),
      ...Object.keys(rawViews),
      ...Object.keys(logCounts)
    ]);

    return Array.from(targetSlugs)
      .filter(slug => DARWINISM_SLUGS.has(slug))
      .map(slug => {
        const count = Math.max(rawViews[slug] || 0, logCounts[slug] || 0);
        return {
          slug,
          title: getArticleTitle(slug),
          count
        };
      })
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.title.localeCompare(b.title);
      });
  }, [stats?.pageViews, stats?.logs, articles]);

  const displayedPageViews = showAllTargets ? sortedPageViews : sortedPageViews.slice(0, 7);
  const maxPageView = Math.max(...sortedPageViews.map(p => p.count), 1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm select-text font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#070a13] border border-[#1e293b] rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        >
          {/* Header - Tactical HUD Bar with 3 circles and terminal prompt */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#0b101d] border-b border-[#1e293b] select-none">
            <div className="flex items-center gap-3">
              {/* 3 Circles: Red (double-click stop tracking), Amber (status), Green (double-click resume tracking) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onDoubleClick={handleStopTracking}
                  title="Double-click: Stop tracking (ignore this device)"
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                    isDeviceIgnored 
                      ? 'bg-red-500' 
                      : 'bg-red-500/35 hover:bg-red-500/75'
                  }`}
                />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" title="Telemetry Terminal Node" />
                <button
                  type="button"
                  onDoubleClick={handleResumeTracking}
                  title="Double-click: Resume tracking"
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                    !isDeviceIgnored 
                      ? 'bg-emerald-500' 
                      : 'bg-emerald-500/35 hover:bg-emerald-500/75'
                  }`}
                />
              </div>

              {/* Divider */}
              <div className="h-4 w-[1px] bg-[#1e293b]" />

              {/* Terminal Prompt and Title */}
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px] font-semibold tracking-wider text-slate-200 uppercase">
                  DARWINISM TELEMETRY TERMINAL
                </span>
                {statusNotice && (
                  <span className={`text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                    isDeviceIgnored
                      ? 'text-red-300 bg-red-950/60 border border-red-800/60'
                      : 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/60'
                  }`}>
                    {statusNotice}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mode indicator pill */}
              {isSandbox ? (
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-900/50 bg-amber-950/30 text-amber-400 text-[9px] tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  SANDBOX STORAGE
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-sky-900/50 bg-sky-950/30 text-sky-300 text-[9px] tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  LIVE DATABASE LINK
                </div>
              )}

              <div className="flex items-center gap-1.5 border-l border-[#1e293b] pl-3">
                <button
                  onClick={() => setIsRefreshing(true)}
                  disabled={loading || isRefreshing}
                  className="p-1.5 text-slate-400 hover:text-sky-300 hover:bg-[#152033] rounded transition-colors cursor-pointer disabled:opacity-40"
                  title="Synchronize telemetry logs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors cursor-pointer"
                  title="Close terminal (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
            {loading && !stats ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400 text-xs text-center">
                <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
                <span className="tracking-widest uppercase">INITIALIZING DARWINISM TELEMETRY UPLINK...</span>
              </div>
            ) : stats ? (
              <>
                {/* 1. Global Metrics Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-[#0b101d] border border-[#1e293b] rounded-lg">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] uppercase font-semibold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-sky-400/80" />
                        Total Hits
                      </span>
                      <span className="text-[9px] text-slate-500 px-1.5 py-0.5 rounded border border-[#1e293b] bg-[#070a13]">
                        VIEWS
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
                      {stats.totalCount.toLocaleString()}
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase mt-1 block">Darwinism records</span>
                  </div>

                  <div className="p-3.5 bg-[#0b101d] border border-[#1e293b] rounded-lg">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] uppercase font-semibold text-sky-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                        Unique Nodes
                      </span>
                      <span className="text-[9px] text-sky-300 px-1.5 py-0.5 rounded border border-sky-900/40 bg-sky-950/40">
                        DISTINCT
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-sans tracking-tight">
                      {stats.uniqueCount.toLocaleString()}
                    </div>
                    <span className="text-[9px] text-sky-500/70 uppercase mt-1 block">Hardware visitor IDs</span>
                  </div>

                  <div className="p-3.5 bg-[#0b101d] border border-[#1e293b] rounded-lg">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] uppercase font-semibold text-indigo-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-indigo-400" />
                        Return Sessions
                      </span>
                      <span className="text-[9px] text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-900/40 bg-indigo-950/40 font-mono">
                        {stats.totalCount > 0 ? Math.round((stats.repeatCount / stats.totalCount) * 100) : 0}% RETENTION
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-400 font-sans tracking-tight">
                      {stats.repeatCount.toLocaleString()}
                    </div>
                    <span className="text-[9px] text-indigo-500/70 uppercase mt-1 block">Re-entry sessions</span>
                  </div>
                </div>

                {/* 2. Two-Column Split Layout: Top Targets & Realtime Trace Stream */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left Column: Top Visited Breakdown */}
                  <div className="lg:col-span-5 bg-[#0b101d] border border-[#1e293b] rounded p-3.5 flex flex-col h-[460px]">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#1e293b] mb-3 select-none">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                          Telemetry Targets
                        </span>
                        {sortedPageViews.length > 0 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#070a13] border border-[#1e293b] text-sky-300 font-mono">
                            {sortedPageViews.length}
                          </span>
                        )}
                      </div>
                      {sortedPageViews.length > 7 ? (
                        <button
                          type="button"
                          onClick={() => setShowAllTargets(!showAllTargets)}
                          className="text-[9px] px-2 py-0.5 rounded border border-[#253655] hover:border-sky-500 bg-[#070a13] hover:bg-[#152033] text-sky-300 transition-colors uppercase cursor-pointer"
                        >
                          {showAllTargets ? 'Show Top 7' : `View All (${sortedPageViews.length})`}
                        </button>
                      ) : (
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                          Ranked by views
                        </span>
                      )}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                      {displayedPageViews.map((pv, idx) => {
                        const percentage = pv.count > 0 ? Math.round((pv.count / maxPageView) * 100) : 0;
                        return (
                          <div key={pv.slug} className="group">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="text-slate-300 group-hover:text-sky-300 transition-colors truncate max-w-[70%] flex items-center gap-1.5">
                                <span className="text-slate-500 font-mono text-[10px]">#{idx + 1}</span>
                                <span className="truncate">{pv.title}</span>
                              </span>
                              <span className="text-slate-400 font-mono text-[11px] shrink-0">
                                <span className="font-semibold text-slate-200">{pv.count.toLocaleString()}</span>{' '}
                                <span className="text-slate-500 text-[10px]">({percentage}%)</span>
                              </span>
                            </div>
                            <div className="w-full h-2 bg-[#070a13] rounded-full overflow-hidden border border-[#1e293b]">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  idx === 0
                                    ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                                    : 'bg-sky-500/80'
                                }`}
                                style={{
                                  width: pv.count > 0 ? `${Math.max(percentage, 4)}%` : '0%'
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Realtime Telemetry Stream with Integrated User ID Search Engine */}
                  <div className="lg:col-span-7 bg-[#0b101d] border border-[#1e293b] rounded p-3.5 flex flex-col h-[460px]">
                    {/* Stream Header & Filters */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#1e293b] mb-2 select-none">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${searchResults !== null ? 'bg-cyan-400' : 'bg-sky-400'} opacity-60`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${searchResults !== null ? 'bg-cyan-500' : 'bg-sky-500'}`}></span>
                        </span>
                        <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                          {searchResults !== null ? 'Database History Audit' : 'Telemetry Trace Stream'}
                        </span>
                        {searchResults !== null && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-800 text-cyan-300 uppercase font-bold">
                            HISTORICAL
                          </span>
                        )}
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center gap-1 bg-[#070a13] p-0.5 rounded border border-[#1e293b]">
                        <button
                          type="button"
                          onClick={() => setLogFilter('all')}
                          className={`px-2 py-0.5 text-[9px] uppercase font-semibold rounded transition-colors cursor-pointer ${
                            logFilter === 'all'
                              ? 'bg-[#152033] text-slate-100 border border-[#253655]'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          All ({activeLogList.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setLogFilter('unique')}
                          className={`px-2 py-0.5 text-[9px] uppercase font-semibold rounded transition-colors cursor-pointer ${
                            logFilter === 'unique'
                              ? 'bg-sky-950/70 text-sky-300 border border-sky-800'
                              : 'text-slate-500 hover:text-sky-400'
                          }`}
                        >
                          Unique ({activeLogList.filter(l => l.type === 'unique').length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setLogFilter('repeat')}
                          className={`px-2 py-0.5 text-[9px] uppercase font-semibold rounded transition-colors cursor-pointer ${
                            logFilter === 'repeat'
                              ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-800'
                              : 'text-slate-500 hover:text-indigo-400'
                          }`}
                        >
                          Return ({activeLogList.filter(l => l.type === 'repeat').length})
                        </button>
                      </div>
                    </div>

                    {/* User ID Search Engine with "My Node" shortcut */}
                    <div className="relative mb-2">
                      <div className="relative flex items-center">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
                        <input
                          type="text"
                          value={searchUserId}
                          onChange={(e) => setSearchUserId(e.target.value)}
                          placeholder="Search User ID across database history (e.g. surv_q8c)..."
                          className="w-full bg-[#070a13] border border-[#1e293b] focus:border-sky-500 focus:outline-none text-[11px] text-slate-200 placeholder-slate-600 pl-8 pr-16 py-1.5 rounded transition-all"
                        />
                        {searchUserId ? (
                          <div className="absolute right-2 flex items-center gap-1.5">
                            {isSearching && (
                              <span className="w-2.5 h-2.5 rounded-full border border-sky-400 border-t-transparent animate-spin" />
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setSearchUserId('');
                                setSearchResults(null);
                                setSearchSummary(null);
                              }}
                              className="text-slate-500 hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
                              title="Clear search"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSearchUserId(currentVisitorIdShort)}
                            className="absolute right-2 text-[9px] text-slate-400 hover:text-sky-300 transition-colors uppercase px-1.5 py-0.5 bg-[#0b101d] hover:bg-[#152033] rounded border border-[#1e293b] cursor-pointer"
                            title="Audit history for your current browser node"
                          >
                            My Node
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Search Result Intelligence Card */}
                    {searchUserId.trim() && (
                      <div className="mb-2 bg-[#070a13] border border-[#1e293b] rounded p-2 text-[10px] select-none">
                        {isSearching ? (
                          <div className="flex items-center gap-2 text-sky-400 py-0.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-sky-400 border-t-transparent animate-spin" />
                            <span>Querying Darwinism Firestore history for node "{searchUserId}"...</span>
                          </div>
                        ) : searchResults && searchResults.length > 0 ? (
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141d2e] pb-1">
                              <div className="flex items-center gap-1.5 text-sky-300 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                <span>DATABASE AUDIT: {searchResults.length} RECORDS FOUND</span>
                              </div>
                              <div className="text-[9px] text-slate-500">
                                {searchSummary?.matchedNodes.length} NODE(S) MATCHED
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-slate-400">
                              {searchSummary?.oldestDate && (
                                <span>
                                  FIRST RECORDED: <strong className="text-slate-200">{new Date(searchSummary.oldestDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                                </span>
                              )}
                              {searchSummary?.newestDate && (
                                <span>
                                  LATEST ACTIVITY: <strong className="text-slate-200">{new Date(searchSummary.newestDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                                </span>
                              )}
                              {searchSummary?.topTarget && (
                                <span>
                                  TOP TARGET: <strong className="text-sky-300">{searchSummary.topTarget.title} ({searchSummary.topTarget.count}x)</strong>
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-500 italic py-0.5">
                            No records found in database history matching node ID "{searchUserId}".
                          </div>
                        )}
                      </div>
                    )}

                    {/* Scrollable Trace Stream with Clickable Visitor IDs */}
                    <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-[11px] scrollbar-thin">
                      {filteredLogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12 text-slate-500 italic">
                          <Radio className="w-5 h-5 mb-1.5 text-slate-700" />
                          <span>No Darwinism telemetry trace events match the active criteria.</span>
                        </div>
                      ) : (
                        filteredLogs.map((log, index) => {
                          const date = new Date(log.timestamp);
                          const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                          const timeStr = `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} · ${dateStr}`;
                          const isNew = log.type === 'unique';
                          const relativeTime = formatRelativeTime(log.timestamp);

                          return (
                            <div
                              key={`${log.timestamp}-${index}`}
                              className="px-2.5 py-1.5 bg-[#070a13] hover:bg-[#0f172a] border border-[#1e293b] rounded transition-colors flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-slate-500 text-[10px] font-semibold shrink-0" title={date.toLocaleString()}>
                                  [{timeStr}]
                                </span>

                                {log.slug === 'telemetry-terminal' ? (
                                  <span className="shrink-0 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                                    TERMINAL
                                  </span>
                                ) : isNew ? (
                                  <span className="shrink-0 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider bg-sky-950/80 text-sky-300 border border-sky-700/80">
                                    NEW NODE
                                  </span>
                                ) : (
                                  <span className="shrink-0 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider bg-indigo-950/80 text-indigo-300 border border-indigo-800/80">
                                    RETURN
                                  </span>
                                )}

                                <span className="text-slate-300 hover:text-sky-300 transition-colors truncate flex items-center gap-1.5">
                                  {log.slug === 'telemetry-terminal' && (
                                    <Terminal className="w-3 h-3 text-cyan-400 shrink-0 inline" />
                                  )}
                                  {getArticleTitle(log.slug)}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {/* Clickable Visitor ID Chip */}
                                {log.visitorId === currentVisitorIdShort ? (
                                  <button
                                    type="button"
                                    onClick={() => setSearchUserId(log.visitorId)}
                                    title="Click to search database history for your node"
                                    className="text-[9px] text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-700/60 font-semibold hover:bg-sky-900/80 hover:border-sky-500 transition-colors cursor-pointer"
                                  >
                                    {log.visitorId} (YOU)
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setSearchUserId(log.visitorId)}
                                    title={`Click to search complete database history for node ${log.visitorId}`}
                                    className="text-[9px] text-slate-400 bg-[#070a13] px-1.5 py-0.5 rounded border border-[#1e293b] hover:text-sky-300 hover:border-sky-600 transition-colors cursor-pointer"
                                  >
                                    {log.visitorId}
                                  </button>
                                )}

                                <span className="text-[9px] text-slate-500 w-12 text-right hidden sm:inline">
                                  {relativeTime}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Footer Protocol Banner */}
                <div className="p-3 bg-[#0b101d] border border-[#1e293b] rounded text-[10px] text-slate-400 leading-relaxed select-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-sky-400 font-bold mr-1">PROTOCOL SUMMARY:</span>
                    {isSandbox 
                      ? "Sandbox mode engaged. Analytics persist safely in browser sandbox storage."
                      : "Telemetry uplink synchronized with Darwinism central Firestore cluster. Visitor sessions strictly anonymized."}
                  </div>
                  <div className="text-[9px] text-slate-500 shrink-0 font-mono">
                    PRESS <kbd className="px-1 py-0.5 bg-[#070a13] border border-[#1e293b] text-slate-300 rounded text-[8px]">ESC</kbd> TO EXIT TERMINAL
                  </div>
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
