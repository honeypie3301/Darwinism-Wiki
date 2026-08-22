import React, { useState } from 'react';
import DarwinismIcon from './DarwinismIcon';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Dna, 
  Sparkles, 
  FlaskConical, 
  Activity, 
  Folder,
  FileText,
  Hammer,
  GitCommit
} from 'lucide-react';
import { WikiArticle } from '../types';

interface SidebarProps {
  articles: WikiArticle[];
  currentSlug: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onBIconClick?: () => void;
}

export default function Sidebar({
  articles,
  currentSlug,
  searchQuery,
  setSearchQuery,
  isOpen,
  onClose,
  onBIconClick
}: SidebarProps) {
  // Keep track of which categories are collapsed. Default all open.
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group articles by category
  const categories = React.useMemo(() => {
    const groups: Record<string, WikiArticle[]> = {};
    articles.forEach(article => {
      const cat = article.category || 'Uncategorized';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(article);
    });
    return groups;
  }, [articles]);

  // Get icons based on category or article title
  const getArticleIcon = (slug: string) => {
    switch (slug) {
      case 'home':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'serum-overview':
      case 'serum-tiers':
        return <FlaskConical className="w-4 h-4 text-blue-400" />;
      case 'adaptations':
      case 'biological-adaptations':
        return <Dna className="w-4 h-4 text-cyan-400" />;
      case 'items':
        return <Sparkles className="w-4 h-4 text-sky-300" />;
      case 'recipes':
        return <Hammer className="w-4 h-4 text-sky-400" />;
      case 'versions':
        return <GitCommit className="w-4 h-4 text-sky-300" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-[280px] h-screen
          bg-[#070a13] border-r border-[#1e293b]
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header Branding */}
        <div className="p-5 border-b border-[#1e293b] flex items-center justify-between bg-[#0b101d]">
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBIconClick?.();
              }}
              className="w-9 h-9 rounded-lg bg-[#131c31] border border-[#253655] flex items-center justify-center p-1 hover:bg-[#1d2d47] hover:border-[#38bdf8] cursor-pointer transition-colors shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
              title="View Evolution Stats"
              id="sidebar-b-icon"
            >
              <DarwinismIcon className="w-full h-full" />
            </button>
            <a href="#/wiki/home" className="flex flex-col text-left" onClick={onClose}>
              <h1 className="font-serif font-bold text-slate-100 tracking-wide text-sm hover:text-[#7dd3fc] transition-colors">
                DARWINISM WIKI
              </h1>
              <p className="text-[10px] font-mono text-sky-400/80 uppercase tracking-wider">
                Evolutionary Index
              </p>
            </a>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-[#131c31] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#1e293b]/60 bg-[#070a13]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search darwinism..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1424] border border-[#1e293b] rounded-md py-1.5 pl-9 pr-8 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Navigation / Article List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          {(Object.entries(categories) as [string, WikiArticle[]][]).map(([categoryName, catArticles]) => {
            const isCollapsed = collapsedCategories[categoryName];
            return (
              <div key={categoryName} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className="w-full flex items-center justify-between text-left py-1 text-[11px] font-mono font-semibold tracking-wider text-sky-300/70 hover:text-[#7dd3fc] uppercase transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Folder className="w-3 h-3 text-sky-500/50" />
                    {categoryName}
                  </span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>

                {/* Category Articles */}
                {!isCollapsed && (
                  <div className="pl-1.5 space-y-0.5 border-l border-[#1e293b] ml-1.5 mt-1 transition-all duration-300">
                    {catArticles.map(article => {
                      const isActive = currentSlug === article.slug;
                      return (
                        <a
                          key={article.slug}
                          href={`#/wiki/${article.slug}`}
                          onClick={onClose}
                          className={`
                            group flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-all duration-150
                            ${isActive 
                              ? 'bg-[#0f1d30] text-[#7dd3fc] font-medium border-l-2 border-[#38bdf8]' 
                              : 'text-slate-400 hover:text-slate-100 hover:bg-[#0e172a]'
                            }
                          `}
                        >
                          <span className="shrink-0 transition-transform group-hover:scale-110 duration-200">
                            {getArticleIcon(article.slug)}
                          </span>
                          <span className="truncate">{article.title}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {articles.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-xs font-serif italic">
              No results match search
            </div>
          )}
        </nav>

        {/* Footer info - Mod Links */}
        <div className="p-4 border-t border-[#1e293b] bg-[#050810] text-[10px] font-mono flex flex-col gap-2">
          <div className="flex flex-col gap-1.5 border-b border-[#11192e] pb-2 mb-2">
            <a 
              href="https://modrinth.com/mod/darwinism" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Modrinth Page
            </a>
            <a 
              href="https://www.curseforge.com/minecraft/mc-mods/darwinism" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              CurseForge Page
            </a>
          </div>
          <div className="select-none text-[9px] uppercase tracking-wider text-slate-600">EVOLVED FOR ADAPTIVE SURVIVAL</div>
        </div>
      </aside>
    </>
  );
}
