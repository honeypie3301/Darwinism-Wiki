import React from 'react';
import { FlaskConical, Activity, Zap, Eye, Flame, ShieldCheck, ArrowRight, Dna } from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function SerumOverviewView() {
  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-slate-300 select-text">
      
      {/* Intro Header */}
      <UpdatedFrame id="serum_overview_header" isUpdated={true}>
        <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase font-bold tracking-wider">
            <FlaskConical className="w-4 h-4 text-sky-400" />
            <span>Core Mechanism Dossier</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-100">
            Darwin’s Serum Mechanics & Realtime Physiology
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In <strong className="text-sky-200">Darwinism</strong>, potion effects do not grant passive or static attribute boosts. Consuming <strong>Darwin's Serum</strong> initializes a real-time biological adaptation engine that monitors your player's physical stress, light levels, and environmental conditions.
          </p>
        </div>
      </UpdatedFrame>

      {/* Dynamic Trigger Thresholds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Trigger 1: Sprinting */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Locomotion Trigger (Sprinting)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Maintained sprinting for over 2.5 seconds triggers continuous muscle fiber twitch acceleration, granting increasing speed without momentum loss or exhaustion penalty.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200">
            Threshold: Sprinting Continuous &gt; 50 ticks → Speed I / II / Apex
          </div>
        </div>

        {/* Trigger 2: Combat Damage */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Cellular Hardening (Damage)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Taking physical damage triggers an immediate clotting and regenerative surge. The severity of recovery scales directly with health deficit.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200">
            Threshold: Hurt Event → Regeneration I-III scaling with missing HP
          </div>
        </div>

        {/* Trigger 3: Darkness Submersion */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Eye className="w-4 h-4 text-sky-400" />
            <span>Ocular Adaptation (Sub-Visual Sight)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stepping into light levels below 7 (subterranean caverns or night biomes) immediately dilates pupils, granting Night Vision with zero visual flicker.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200">
            Threshold: Block Light Level &lt; 7 → Instant Night Vision
          </div>
        </div>

        {/* Trigger 4: Submersion & Thermal */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Flame className="w-4 h-4 text-sky-400" />
            <span>Aquatic & Pyrogenic Defenses</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Submersion in water or exposure to lava triggers instant gill membranes and heat-resistant thermal lipid barriers.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200">
            Threshold: Submerged / In Lava → Water Breathing / Fire Resistance
          </div>
        </div>

      </div>

      {/* Tier Multiplier Mathematics & Attribute Modifiers */}
      <UpdatedFrame id="serum_tier_math_breakdown" isUpdated={true}>
        <div className="p-6 bg-[#070a13] border border-sky-400/40 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-sky-300 font-mono text-xs uppercase font-bold tracking-wider">
            <Dna className="w-4 h-4 text-sky-400" />
            <span>Attribute Modifiers & Tier Multiplier Mathematics</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg space-y-2">
              <div className="text-sky-300 font-bold text-sm">Tier I (Baseline)</div>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong className="text-sky-200">Speed:</strong> +20% generic.movement_speed</li>
                <li>• <strong className="text-sky-200">Recovery:</strong> 0.5 HP/sec (Regen I)</li>
                <li>• <strong className="text-sky-200">Vision:</strong> Night Vision (&lt; 7 light)</li>
                <li>• <strong className="text-sky-200">Aquatic:</strong> Water Breathing</li>
              </ul>
            </div>
            <div className="p-4 bg-[#0b101d] border border-sky-400/40 rounded-lg space-y-2">
              <div className="text-sky-300 font-bold text-sm">Tier II (2.0x Level 1 Stats)</div>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong className="text-sky-200">Speed:</strong> +40% generic.movement_speed <span className="text-emerald-400 font-bold">(2x Tier 1)</span></li>
                <li>• <strong className="text-sky-200">Recovery:</strong> 1.0 HP/sec <span className="text-emerald-400 font-bold">(2x Tier 1)</span></li>
                <li>• <strong className="text-sky-200">Thermal:</strong> Fire Resistance (Lava/Fire)</li>
                <li>• <strong className="text-sky-200">Aquatic:</strong> Swift Swim II (2x velocity)</li>
              </ul>
            </div>
            <div className="p-4 bg-[#0b101d] border border-cyan-400/50 rounded-lg space-y-2">
              <div className="text-sky-300 font-bold text-sm">Tier III (3.0x Level 1 Stats)</div>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong className="text-sky-200">Speed:</strong> +60% generic.movement_speed <span className="text-cyan-300 font-bold">(3x Tier 1)</span></li>
                <li>• <strong className="text-sky-200">Recovery:</strong> 1.5 HP/sec <span className="text-cyan-300 font-bold">(3x Tier 1)</span> + Resistance II</li>
                <li>• <strong className="text-sky-200">Ocular:</strong> Sub-Visual + Blindness Immunity</li>
                <li>• <strong className="text-sky-200">Immunity:</strong> Full Fall/Thermal/Aquatic</li>
              </ul>
            </div>
          </div>
        </div>
      </UpdatedFrame>

      {/* Genomic Neutralizer Note */}
      <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-serif font-bold text-base">
          <ShieldCheck className="w-4.5 h-4.5 text-sky-400" />
          <span>Genomic Neutralizer: Potion of Milk</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Should an adaptation profile interfere with specific non-combative actions, consuming a <strong>Potion of Milk</strong> instantly purges all active serum mutations, resetting player physiology back to human baseline.
        </p>
      </div>

    </div>
  );
}
