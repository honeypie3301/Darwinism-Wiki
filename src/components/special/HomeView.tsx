/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All wiki documentation, cards, tooltips, and descriptions must maintain an objective,
 * technical, and encyclopedic tone. Do not write storytelling prose or second-person narrative.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * The "Recent Highlights" list inside the Wiki Maintenance Note is strictly and exclusively
 * reserved for in-game Minecraft mod updates, new versions, entities, items, and mechanics.
 * NEVER document wiki website updates, UI redesigns, or site bug fixes here.
 *
 * Underline Rule: Underline ONLY the exact sentence:
 * <u>The wiki is always updated before a new version releases.</u>
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
        <div className="relative overflow-hidden rounded-xl bg-[#070a13] border border-[#1e293b] p-8 text-center space-y-2">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-2xl rounded-full pointer-events-none" />
          <TitleDialPicker />
          <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-sky-400 uppercase">
            Official Darwinism Field Guide & Biological Index
          </p>
        </div>
      </UpdatedFrame>

      {/* 2. WIKI MAINTENANCE NOTE (UPDATED FRAME) */}
      <UpdatedFrame id="home_maintenance_notice" isUpdated={true}>
        <div className="p-5 bg-[#091020] border border-sky-400/30 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sky-300 font-mono text-xs uppercase font-bold tracking-wider">
            <Info className="w-4 h-4 text-sky-400" />
            <span>Wiki Maintenance Note</span>
          </div>
          
          <div className="p-4 sm:p-5 bg-sky-950/30 border border-sky-400/30 rounded-lg text-sky-100 text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-center flex items-center justify-center">
            <u>The wiki is always updated before a new version releases.</u>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 font-mono pt-1">
            <div className="text-sky-300 font-semibold uppercase text-[11px] tracking-wider">Recent Version Highlights:</div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-1">
              <li><strong className="text-sky-300">Static Attribute Migration (v1.4.1):</strong> Base attributes (Safe Fall Distance, Attack Damage, Knockback Resistance, Max Health) are now registered directly to MobEffect definitions, resolving desync on Minecraft 1.21.8 NeoForge.</li>
              <li><strong className="text-sky-300">Permanent DNA Alteration:</strong> Consuming 4 to 7 bottles of Darwinism III permanently locks the Tier III effect via player capability variables until cured with 7 bottles of Potion of Milk or player death.</li>
              <li><strong className="text-sky-300">Anti-Devolution Protocol:</strong> Attempting to apply a lower-tier Darwinism potion while a higher tier is active is automatically rejected with "Devolution refused."</li>
              <li><strong className="text-sky-300">Dynamic Adrenaline Scaling:</strong> Taking damage accumulates adrenaline (+2 per hit, capped at 15), dynamically scaling Regeneration level (Math.round(adrenaline / 3)) that gradually decays (-0.05/tick) out of combat.</li>
              <li><strong className="text-sky-300">Potion of Milk Brewing:</strong> Brewed by combining a Fermented Spider Eye with a Potion of Darwinism I to cleanse standard and permanent mutagenic effects.</li>
            </ul>
          </div>
        </div>
      </UpdatedFrame>

      {/* 3. TECHNICAL OVERVIEW */}
      <div className="p-6 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-4">
        <p className="text-sm sm:text-base leading-relaxed text-slate-200">
          <strong className="text-sky-200">Darwinism</strong> is a Minecraft NeoForge modification providing an adaptive physiological mechanics engine. Entities affected by Darwin's Serum dynamically gain attributes and status effects based on player actions, damage intake, ambient light levels, and environmental hazards.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-400 border-l-2 border-sky-400/60 pl-4 font-mono">
          System Overview: Physiological response routines evaluate player sprint tick counters, ambient block brightness, incoming combat damage, and nearby explosive entity distances to apply dynamic speed, regeneration, night vision, and resistance modifiers in real time.
        </p>
      </div>

      {/* 4. ADAPTATION MECHANICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: LOCOMOTION MUTATION */}
        <div className="p-5 bg-[#070a13] border border-[#1e293b] border-t-2 border-t-sky-400/80 rounded-xl space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-serif text-base font-semibold">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Locomotion Adaptation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Continuous sprinting increments an internal sprint counter. Exceeding 50–60 ticks activates Movement Speed II, III, or IV depending on serum tier, alongside crouching Jump Boost charge jumps.
            </p>
          </div>
          <a href="#/wiki/biological-adaptations" className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 uppercase tracking-wider font-semibold pt-2">
            <span>Explore Adaptations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARD 2: CELLULAR REGENERATION */}
        <div className="p-5 bg-[#070a13] border border-[#1e293b] border-t-2 border-t-sky-400/80 rounded-xl space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-serif text-base font-semibold">
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Cellular Regeneration</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Incoming damage builds up adrenaline points, dynamically calculating Regeneration amplifier levels. Dropping below 2 HP triggers emergency Resistance IV and Regeneration V stabilization.
            </p>
          </div>
          <a href="#/wiki/serum-overview" className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 uppercase tracking-wider font-semibold pt-2">
            <span>Serum Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARD 3: OCULAR & ENVIRONMENTAL */}
        <div className="p-5 bg-[#070a13] border border-[#1e293b] border-t-2 border-t-sky-400/80 rounded-xl space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-serif text-base font-semibold">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Ocular & Thermal Adaptation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Ambient block light levels of 3 or below automatically grant Night Vision. Contact with Powder Snow suppresses freezing tick counters, with complete freeze immunity at Tier III.
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
              className="p-3 bg-[#0b101d] border border-[#1e293b] hover:border-sky-400/40 hover:bg-[#0f182e] rounded-lg transition-all flex flex-col items-center gap-2 group"
            >
              <item.icon className="w-4 h-4 text-sky-400 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-mono text-slate-200 group-hover:text-sky-300">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pt-6 border-t border-[#1e293b] text-[11px] font-mono text-slate-500 uppercase tracking-widest">
        Darwinism Mod Documentation · Minecraft 1.21.8 / 1.21.1 NeoForge
      </div>

    </div>
  );
}
