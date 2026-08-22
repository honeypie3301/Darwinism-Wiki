import React, { useEffect, useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  FileText
} from 'lucide-react';
import { WikiArticle } from '../types';
import { slugify } from '../utils/parser';

import VersionsView from './special/VersionsView';
import ItemsView from './special/ItemsView';
import HomeView from './special/HomeView';
import SerumOverviewView from './special/SerumOverviewView';
import BiologicalAdaptationsView from './special/BiologicalAdaptationsView';
import SerumTiersView from './special/SerumTiersView';
import RecipesView from './special/RecipesView';

interface ArticleViewProps {
  article: WikiArticle;
  rawContent?: string;
  articles: WikiArticle[];
  searchQuery: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function ArticleView({
  article,
  rawContent = '',
  articles,
  searchQuery
}: ArticleViewProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const isSpecialPage = [
    'home', 
    'serum-overview', 
    'biological-adaptations', 
    'serum-tiers', 
    'items', 
    'recipes', 
    'versions'
  ].includes(article.slug);

  // Parse headers and content
  useEffect(() => {
    if (!rawContent) return;

    if (isSpecialPage) {
      setHeadings([]);
    } else {
      const foundHeadings: HeadingItem[] = [];
      const lines = rawContent.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('<!--') || trimmed.endsWith('-->')) return;

        const h2WikiMatch = trimmed.match(/^==\s*([^=]*?)\s*==\s*$/);
        if (h2WikiMatch) {
          foundHeadings.push({
            id: slugify(h2WikiMatch[1]),
            text: h2WikiMatch[1],
            level: 2
          });
        }
      });
      setHeadings(foundHeadings);
    }
  }, [rawContent, article.slug, isSpecialPage]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIndex = articles.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row gap-8 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-8">
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#1e293b] z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 to-sky-300 transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-6 select-none">
          <a href="#/wiki/home" className="hover:text-sky-300 transition-colors">WIKI</a>
          <span>/</span>
          <span className="text-slate-300">{article.category}</span>
          <span>/</span>
          <span className="text-sky-400">{article.title}</span>
        </div>

        {/* Title Block */}
        <div className="border-b border-[#1e293b] pb-6 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Article Body */}
        <article className="min-h-[400px]">
          {isSpecialPage ? (
            article.slug === 'home' ? (
              <HomeView />
            ) : article.slug === 'serum-overview' ? (
              <SerumOverviewView />
            ) : article.slug === 'biological-adaptations' ? (
              <BiologicalAdaptationsView />
            ) : article.slug === 'serum-tiers' ? (
              <SerumTiersView />
            ) : article.slug === 'items' ? (
              <ItemsView />
            ) : article.slug === 'recipes' ? (
              <RecipesView />
            ) : article.slug === 'versions' ? (
              <VersionsView />
            ) : null
          ) : (
            <div 
              ref={containerRef}
              className="wiki-html-content text-sm sm:text-base leading-relaxed text-slate-200 space-y-6 select-text"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}
        </article>

        {/* Next/Previous Article Controls */}
        <div className="mt-12 pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row gap-4 justify-between items-stretch select-none">
          {prevArticle ? (
            <a 
              href={`#/wiki/${prevArticle.slug}`}
              className="flex-1 flex items-center gap-3 p-4 bg-[#0b101d] hover:bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40 rounded-xl group transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-sky-300 transition-colors" />
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Previous Page</div>
                <div className="text-xs font-serif text-slate-100 font-semibold group-hover:text-sky-300 transition-colors mt-0.5">{prevArticle.title}</div>
              </div>
            </a>
          ) : (
            <div className="flex-1 opacity-0 pointer-events-none hidden sm:block" />
          )}

          {nextArticle ? (
            <a 
              href={`#/wiki/${nextArticle.slug}`}
              className="flex-1 flex items-center justify-between p-4 bg-[#0b101d] hover:bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40 rounded-xl group transition-all"
            >
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider text-right sm:text-left">Next Page</div>
                <div className="text-xs font-serif text-slate-100 font-semibold group-hover:text-sky-300 transition-colors mt-0.5">{nextArticle.title}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-300 transition-colors" />
            </a>
          ) : (
            <div className="flex-1 opacity-0 pointer-events-none hidden sm:block" />
          )}
        </div>
      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 p-2.5 bg-[#0b101d] hover:bg-[#131c31] border border-[#1e293b] hover:border-sky-400 text-sky-300 rounded-full shadow-lg z-50 cursor-pointer transition-all hover:scale-105 duration-200"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
