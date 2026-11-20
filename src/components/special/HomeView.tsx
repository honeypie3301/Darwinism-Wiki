import React from 'react';
import {
  Dna,
  FlaskConical,
  ShieldAlert,
  Cpu,
  Clock,
  ArrowRight,
  Info,
  Activity
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';
import TitleDialPicker from '../TitleDialPicker';
import { useTheme } from '../../context/ThemeContext';

export default function HomeView() {
  const { theme } = useTheme();
  const isStarlight = theme === 'starlight';

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-ink-muted">

      {/* 1. LOGO HERO BANNER WITH INTERACTIVE DIAL PICKER */}
      <UpdatedFrame id="dw_home_hero_dial_picker" isUpdated={true}>
        <div className="relative overflow-hidden rounded-xl bg-surface border border-line px-4 py-6 sm:p-8 text-center shadow-xs space-y-2 transition-colors">
          <TitleDialPicker />
          <p className="text-[11px] sm:text-sm font-mono tracking-[0.12em] sm:tracking-[0.2em] text-accent-text uppercase text-balance">
            Adaptive Bio-Serum &amp; Real-Time Evolution Guide
          </p>
        </div>
      </UpdatedFrame>

      {/* 2. WIKI MAINTENANCE & MOD RELEASE HIGHLIGHTS */}
      <UpdatedFrame id="dw_home_maintenance_notice" isUpdated={true}>
        <div
          className={`p-5 rounded-xl space-y-3.5 transition-all duration-200 ${
            isStarlight
              ? 'bg-gradient-to-r from-[#18181b]/95 via-[#111114]/95 to-[#09090b]/95 border-2 border-zinc-300 shadow-[0_0_24px_rgba(228,228,231,0.5),inset_0_0_12px_rgba(255,255,255,0.08)]'
              : 'bg-surface border border-accent-border shadow-xs'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider ${
              isStarlight ? 'text-zinc-200' : 'text-accent-text'
            }`}
          >
            <Info
              className={`w-4 h-4 ${
                isStarlight ? 'text-zinc-100 animate-pulse' : 'text-accent-text'
              }`}
            />
            <span>Wiki Maintenance Note</span>
          </div>

          <div
            className={`p-4 sm:p-5 rounded-lg text-base sm:text-lg md:text-xl font-display font-semibold leading-relaxed text-center flex items-center justify-center transition-all ${
              isStarlight
                ? 'bg-zinc-900/90 border border-zinc-300/80 text-zinc-100 shadow-[0_0_18px_rgba(255,255,255,0.15)]'
                : 'bg-accent-soft border border-accent-border text-accent-text'
            }`}
          >
            <u>The wiki is always updated before a new version releases.</u>
          </div>

          <div className="text-xs text-ink-muted space-y-2 font-mono pt-1">
            <div
              className={`font-semibold uppercase text-[11px] tracking-wider ${
                isStarlight ? 'text-zinc-300' : 'text-ink'
              }`}
            >
              Recent Version Highlights (v1.4.1):
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-ink-muted pl-1">
              <li>
                <strong className={isStarlight ? 'text-zinc-100 font-bold' : 'text-accent-text font-semibold'}>
                  Native Attribute Modifiers:
                </strong>{' '}
                Moved static attribute shifts (Attack Damage, Max Health, Safe Fall, Oxygen Bonus, Submerged Mining, Knockback &amp; Burn reductions) directly onto <code className="text-ink">MobEffect</code> definitions.
              </li>
              <li>
                <strong className={isStarlight ? 'text-zinc-100 font-bold' : 'text-accent-text font-semibold'}>
                  Three-Tier Evolution Ladder:
                </strong>{' '}
                Brew from <strong className="text-ink">Awkward + Nautilus Shell</strong> (Tier I) up to <strong className="text-ink">Golden Carrot</strong> (Tier II) and <strong className="text-ink">Enchanted Golden Apple</strong> (Tier III), plus <strong className="text-ink">Potion of Milk</strong> via Fermented Spider Eye.
              </li>
              <li>
                <strong className={isStarlight ? 'text-zinc-100 font-bold' : 'text-accent-text font-semibold'}>
                  Dynamic Adrenaline &amp; Blast Shield (Tier III):
                </strong>{' '}
                Taking damage builds <code className="text-ink">adrenaline</code> (+2 per hit, cap 15) to scale Regeneration amplifier, while nearby TNT or Creepers trigger Resistance IV–V.
              </li>
              <li>
                <strong className={isStarlight ? 'text-zinc-100 font-bold' : 'text-accent-text font-semibold'}>
                  DNA Permanence &amp; 7-Dose Milk Cure:
                </strong>{' '}
                Repeated Tier III doses (4–7) permanently alter your DNA with enforced infinite Darwinism III until death or drinking 7× Potions of Milk.
              </li>
            </ul>
          </div>
        </div>
      </UpdatedFrame>

      {/* 3. WELCOME & OVERVIEW */}
      <div className="p-6 bg-surface border border-line rounded-xl space-y-4 transition-colors">
        <p className="text-sm sm:text-base leading-relaxed text-ink">
          <strong className="font-semibold text-ink">Darwinism</strong> is a NeoForge 1.21.1 / 1.21.8 (and Forge 1.20.1) survival mod centered on <strong className="font-semibold text-accent-text">Darwin&apos;s Serum</strong>—a three-tier adaptive potion system that dynamically responds to light levels, sprinting, crouching, freezing, explosions, and incoming combat damage in real time.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-ink-muted italic border-t border-b border-line-soft py-3.5">
          Every tier amplifies physical traits while triggering contextual survival reflexes: darkness grants Night Vision, sustained sprinting ignites high-tier Speed bursts, crouching primes charged Jump Boost leaps, and critical health activates emergency Resistance and Regeneration—culminating in permanent genetic mutation at Tier III.
        </p>
      </div>

      {/* 4. NAVIGATION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CARD 1: POTIONS & BREWING */}
        <div className="p-5 bg-surface border border-line rounded-xl space-y-3 flex flex-col justify-between hover:border-accent/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-ink font-display text-base font-semibold">
              <FlaskConical className="w-4 h-4 text-accent-text shrink-0" />
              <span>Potions &amp; Brewing</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Brew <strong className="text-ink font-semibold">Darwinism I–III</strong> and <strong className="text-ink font-semibold">Potion of Milk</strong> across standard, Splash, Lingering, and Tipped Arrow variants.
            </p>
          </div>
          <a href="#/wiki/items" className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-text hover:underline underline-offset-4 uppercase tracking-wider font-semibold pt-2">
            <span>View Brewing Tree</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARD 2: EVOLUTION MECHANICS */}
        <div className="p-5 bg-surface border border-line rounded-xl space-y-3 flex flex-col justify-between hover:border-accent/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-ink font-display text-base font-semibold">
              <Dna className="w-4 h-4 text-accent-text shrink-0" />
              <span>Evolution Mechanics</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Compare Tier I, II, and III attribute modifiers, dynamic light/sprint/crouch triggers, blast perception, and adrenaline regeneration math.
            </p>
          </div>
          <a href="#/wiki/mechanics" className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-text hover:underline underline-offset-4 uppercase tracking-wider font-semibold pt-2">
            <span>Inspect Tiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARD 3: PERMANENCE & CURE */}
        <div className="p-5 bg-surface border border-line rounded-xl space-y-3 flex flex-col justify-between hover:border-accent/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-ink font-display text-base font-semibold">
              <ShieldAlert className="w-4 h-4 text-accent-text shrink-0" />
              <span>Permanence &amp; Cure</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Understand the 4–7 dose genetic lock-in, anti-devolution guards, 20-tick permanence enforcement, death reset, and 7-dose Milk cure.
            </p>
          </div>
          <a href="#/wiki/acquisition" className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-text hover:underline underline-offset-4 uppercase tracking-wider font-semibold pt-2">
            <span>View Lifecycle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* 5. QUICK DIRECTORY LINKS */}
      <div className="p-6 bg-surface border border-line rounded-xl space-y-4 transition-colors">
        <div className="text-xs font-mono text-ink-subtle uppercase tracking-widest font-semibold">
          Wiki Quick Reference
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          {[
            { label: 'Evolution', href: '#/wiki/mechanics', icon: Dna },
            { label: 'Potions', href: '#/wiki/items', icon: FlaskConical },
            { label: 'Adrenaline', href: '#/wiki/mechanics', icon: Activity },
            { label: 'Permanence', href: '#/wiki/acquisition', icon: ShieldAlert },
            { label: 'Mod Specs', href: '#/wiki/technical', icon: Cpu },
            { label: 'Versions', href: '#/wiki/versions', icon: Clock }
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              className="p-3 bg-surface-alt border border-line hover:border-accent/60 hover:bg-surface rounded-lg transition-colors flex flex-col items-center gap-2 group"
            >
              <item.icon className="w-4 h-4 text-accent-text group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-ink group-hover:text-accent-text">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pt-6 border-t border-line text-[11px] font-mono text-ink-subtle uppercase tracking-widest">
        Created by honeypie_3301 using MCreator • GPL-3.0-or-later
      </div>

    </div>
  );
}
