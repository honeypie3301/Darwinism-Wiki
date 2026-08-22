/**
 * AI ASSISTANT MAINTENANCE NOTICE:
 * Whenever you update any wiki content or implement commit changes:
 * 1. Update the "Recent Highlights" list in the Wiki Maintenance Note below in `HomeView.tsx`.
 * 2. Keep the underline strictly on: "The wiki is always updated before a new version releases."
 * 3. Wrap newly added/changed components across the wiki in `<UpdatedFrame id="..." isUpdated={true}>`.
 */
import React from 'react';
import { 
  Dna, 
  Sparkles, 
  FlaskConical, 
  ArrowRight,
  Info,
  Clock,
  Activity,
  Flame,
  Eye,
  Zap,
  ShieldCheck,
  Hammer
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';
import TitleDialPicker from '../TitleDialPicker';

export default function HomeView() {
  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-slate-300">
      
      {/* 1. LOGO HERO BANNER WITH SECRET INTERACTIVE DIAL PICKER */}
      <UpdatedFrame id="home_hero_dial_picker" isUpdated={true}>
        <div className="relative overflow-hidden rounded-xl bg-[#070a13] border border-[#1e293b] p-8 text-center shadow-lg space-y-2">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
          <TitleDialPicker />
          <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-sky-400 uppercase">
            Official Darwinism Field Guide & Biological Index
          </p>
        </div>
      </UpdatedFrame>

      {/* 2. WIKI MAINTENANCE NOTE (UPDATED FRAME) */}
      <UpdatedFrame id="home_maintenance_notice" isUpdated={true}>
        <div className="p-5 bg-gradient-to-r from-[#091020] via-[#0b1328] to-[#070a13] border border-sky-400/40 rounded-xl space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-sky-300 font-mono text-xs uppercase font-bold tracking-wider">
            <Info className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>Wiki Maintenance Note</span>
          </div>
          
          <div className="p-4 sm:p-5 bg-sky-950/40 border border-sky-400/40 rounded-lg text-sky-100 text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-center flex items-center justify-center">
            <u>The wiki is always updated before a new version releases.</u>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 font-mono pt-1">
            <div className="text-sky-300 font-semibold uppercase text-[11px] tracking-wider">Recent Version Highlights:</div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-1">
              <li><strong className="text-sky-300">Genome Stabilizer (Potion of Milk):</strong> Added the Potion of Milk bottle formulation, allowing players to instantly purge all active Darwinism mutations and reset player physiology back to human baseline.</li>
            </ul>
          </div>
        </div>
      </UpdatedFrame>

      {/* 3. WELCOME & OVERVIEW */}
      <div className="p-6 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-4 shadow-md">
        <p className="text-sm sm:text-base leading-relaxed text-slate-200">
          <strong className="text-sky-200">Darwinism</strong> is a Minecraft mod centered around real-time physiological evolution, dynamic adaptive mutations, and real-time biological responses to environmental hazards and combat stress.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-400 italic border-l-2 border-sky-400 pl-4">
          Darwin’s Serum adapts directly to your environment and actions, giving you exactly what you need to survive in real time. Sprint long enough and you accelerate. Take damage and regeneration kicks in, amplifying itself as you keep getting hurt. Step into darkness and your eyes adjust.
        </p>
      </div>

      {/* 4. ADAPTATION MECHANICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: LOCOMOTION MUTATION */}
        <div className="p-5 bg-[#070a13] border border-[#1e293b] border-t-2 border-t-sky-400 rounded-xl space-y-3 flex flex-col justify-between hover:border-sky-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-serif text-base font-semibold">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Locomotion Mutation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sprinting continuously triggers rapid acceleration and agility, allowing you to outrun pursuit and navigate hazardous terrain with ease.
            </p>
          </div>
          <a href="#/wiki/biological-adaptations" className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 uppercase tracking-wider font-semibold pt-2">
            <span>Explore Adaptations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARD 2: CELLULAR HARDENING */}
        <div className="p-5 bg-[#070a13] border border-[#1e293b] border-t-2 border-t-sky-400 rounded-xl space-y-3 flex flex-col justify-between hover:border-sky-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-serif text-base font-semibold">
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Cellular Hardening</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Taking physical damage activates dynamic bio-regeneration that amplifies its recovery rate as your injuries increase in severity.
            </p>
          </div>
          <a href="#/wiki/serum-overview" className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 uppercase tracking-wider font-semibold pt-2">
            <span>Serum Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARD 3: OCULAR & ENVIRONMENTAL */}
        <div className="p-5 bg-[#070a13] border border-[#1e293b] border-t-2 border-t-sky-400 rounded-xl space-y-3 flex flex-col justify-between hover:border-sky-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-serif text-base font-semibold">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Sub-Visual Sight</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Descending into dark caverns or night environments triggers sub-light ocular adjustment, granting seamless night vision.
            </p>
          </div>
          <a href="#/wiki/serum-tiers" className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 uppercase tracking-wider font-semibold pt-2">
            <span>Serum Tiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* 5. QUICK DIRECTORY LINKS */}
      <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-4">
        <div className="text-xs font-mono text-sky-400/80 uppercase tracking-widest font-semibold">
          Darwinism Wiki Directory
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: 'Serum Overview', href: '#/wiki/serum-overview', icon: FlaskConical },
            { label: 'Adaptations', href: '#/wiki/biological-adaptations', icon: Dna },
            { label: 'Serum Tiers', href: '#/wiki/serum-tiers', icon: ShieldCheck },
            { label: 'Potion Registry', href: '#/wiki/items', icon: Sparkles },
            { label: 'Brewing Recipes', href: '#/wiki/recipes', icon: Hammer },
            { label: 'Version History', href: '#/wiki/versions', icon: Clock }
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              className="p-3 bg-[#0b101d] border border-[#1e293b] hover:border-sky-400/50 hover:bg-[#0f182e] rounded-lg transition-all flex flex-col items-center gap-2 group"
            >
              <item.icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-slate-200 group-hover:text-sky-300">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pt-6 border-t border-[#1e293b] text-[11px] font-mono text-slate-500 uppercase tracking-widest">
        Created by honeypie_3301 for Minecraft 1.20.1 / 1.21.1 / 1.21.8 NeoForge & Forge
      </div>

    </div>
  );
}
