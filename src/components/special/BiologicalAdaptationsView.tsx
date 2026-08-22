import React from 'react';
import { Dna, Zap, Activity, Eye, Compass, Flame, ArrowRight } from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function BiologicalAdaptationsView() {
  const adaptations = [
    {
      id: "locomotion",
      title: "Locomotion Mutation",
      subtitle: "Sprint Acceleration & Hyper Mobility",
      icon: Zap,
      trigger: "Sprinting continuously for > 2.5 seconds",
      effect: "Grants progressive speed acceleration (Speed I in Tier I, Speed II in Tier II, Apex Speed in Tier III). Allows swift evasion of hostile entities.",
      tierDetails: "Tier I: +20% Speed (Baseline) | Tier II: +40% Speed (2.0x Tier I) | Tier III: +60% Speed (3.0x Tier I)"
    },
    {
      id: "cellular",
      title: "Cellular Hardening",
      subtitle: "Dynamic Scaling Bio-Regeneration",
      icon: Activity,
      trigger: "Taking physical or environmental damage",
      effect: "Instantly activates a regenerative surge that scales up as player health decreases. Replaces standard static regeneration.",
      tierDetails: "Tier I: Regeneration I (+0.5 HP/s) | Tier II: Regeneration II (+1.0 HP/s - 2.0x Tier I) | Tier III: Regeneration III (+1.5 HP/s - 3.0x Tier I) & Resistance II"
    },
    {
      id: "subvisual",
      title: "Sub-Visual Sight",
      subtitle: "Subterranean Pupil Dilation",
      icon: Eye,
      trigger: "Block light level falling below 7",
      effect: "Automatically activates seamless Night Vision without screen flickering or darkness delays when entering unlit caverns or night biomes.",
      tierDetails: "Active across Tier I, II, and III whenever environmental light drops below threshold."
    },
    {
      id: "aquatic",
      title: "Aquatic Propulsion",
      subtitle: "Gill Membrane & Swift Swimming",
      icon: Compass,
      trigger: "Submersion in water or air supply depleting",
      effect: "Prevents drowning damage by synthesizing oxygen membranes and boosting underwater swim velocity.",
      tierDetails: "Tier I: Water Breathing | Tier II & III: Water Breathing + Swift Swim II"
    },
    {
      id: "pyrogenic",
      title: "Pyrogenic Defense",
      subtitle: "Thermal Lipid Barrier",
      icon: Flame,
      trigger: "Lava submersion or high heat exposure",
      effect: "Synthesizes an immediate heat barrier that grants Fire Resistance, neutralizing flame damage.",
      tierDetails: "Requires Tier II or Tier III Darwin's Serum."
    }
  ];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-slate-300 select-text">
      
      {/* Intro */}
      <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase font-bold tracking-wider">
          <Dna className="w-4 h-4 text-sky-400" />
          <span>Biological Registry</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
          Biological Adaptations & Trigger Conditions
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Comprehensive guide to every real-time physiological response induced by Darwin's Serum formulations.
        </p>
      </div>

      {/* Adaptations List */}
      <div className="space-y-4">
        {adaptations.map((adapt, idx) => {
          const Icon = adapt.icon;
          return (
            <UpdatedFrame key={adapt.id} id={`adapt_frame_${adapt.id}`} isUpdated={true}>
              <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#1e293b] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#131c31] border border-[#253655] rounded-lg text-sky-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-100">
                        {adapt.title}
                      </h3>
                      <p className="text-[11px] font-mono text-sky-400/80 uppercase">
                        {adapt.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070a13] text-slate-400 border border-[#1e293b]">
                    Adaptation #{idx + 1}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <strong className="text-sky-300 font-mono">Trigger Condition: </strong>
                    <span className="text-slate-300">{adapt.trigger}</span>
                  </div>
                  <div>
                    <strong className="text-sky-300 font-mono">Biological Effect: </strong>
                    <span className="text-slate-400 leading-relaxed">{adapt.effect}</span>
                  </div>
                  <div className="p-2.5 bg-[#070a13] border border-[#1e293b] rounded-lg font-mono text-[11px] text-sky-200 mt-2">
                    {adapt.tierDetails}
                  </div>
                </div>
              </div>
            </UpdatedFrame>
          );
        })}
      </div>

    </div>
  );
}
