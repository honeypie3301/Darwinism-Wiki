/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All descriptions must be factual, technical, and encyclopedic. Do not use storytelling prose.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * In-game mod mechanics and updates only. Never document wiki website changes.
 */
import React from 'react';
import { Dna, Zap, Activity, Eye, ShieldAlert, Footprints, Snowflake, ShieldCheck } from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function BiologicalAdaptationsView() {
  const adaptations = [
    {
      id: "locomotion",
      title: "Locomotion & Kinetic Jump",
      subtitle: "Sprint Velocity & Charge Jump",
      icon: Zap,
      trigger: "Continuous sprinting (entity.isSprinting()) and crouching on ground (entity.isShiftKeyDown() && entity.onGround())",
      effect: "Applies Movement Speed and Jump Boost effects dynamically on entity tick without requiring food consumption or sprint interruption.",
      tierDetails: "Tier I: Sprint > 60 ticks → Speed II | Tier II: Sprint > 50 ticks → Speed III | Tier III: Sprint > 60 ticks → Speed IV (-0.05 food exhaustion/tick). Jump Boost: IV (Tier I), VI (Tier II), VIII (Tier III)."
    },
    {
      id: "cellular",
      title: "Adrenaline & Emergency Regeneration",
      subtitle: "Dynamic Scaling & Crisis Overdrive",
      icon: Activity,
      trigger: "Taking damage from any source (amount > 0) or dropping below critical health thresholds",
      effect: "Tier III accumulates adrenaline points (+2 per hit, max 15) to dynamically compute Regeneration amplifier (Math.round(adrenaline / 3)). Tiers I and II activate emergency stabilization at low health.",
      tierDetails: "Tiers I & II: Health < 2 HP → Resistance IV (10s) + Regeneration V (10s); Health < 7 HP → Regeneration II (10s). Tier III: Dynamic Adrenaline Regen 0–5 (decays -0.05/tick)."
    },
    {
      id: "subvisual",
      title: "Ocular Night Vision",
      subtitle: "Ambient Raw Brightness Detection",
      icon: Eye,
      trigger: "Local raw brightness <= 4 (Tier I) or <= 3 (Tiers II & III) via world.getMaxLocalRawBrightness()",
      effect: "Automatically applies Night Vision I without duration flickering when entering dark areas. Instantly cleared when ambient light exceeds threshold (Tiers I & II) or refreshed on a 60-tick timer (Tier III).",
      tierDetails: "Tier I: Raw brightness <= 4 | Tiers II & III: Raw brightness <= 3"
    },
    {
      id: "blast_shield",
      title: "Threat Perception Blast Shield",
      subtitle: "Explosive Entity Proximity Response",
      icon: ShieldAlert,
      trigger: "Presence of Primed TNT, Creepers, or TNT Minecarts within a 6-block radius (AABB bounding box)",
      effect: "Instantly applies high-level Damage Resistance for 100 ticks (5 seconds) upon detecting active explosive threats.",
      tierDetails: "Tier III Exclusive: Resistance IV against Primed TNT / Creepers; Resistance V against TNT Minecarts."
    },
    {
      id: "cryo_thermal",
      title: "Cryo-Insulation & Thermal Reduction",
      subtitle: "Powder Snow Clamping & Burning Time",
      icon: Snowflake,
      trigger: "Collision with Powder Snow blocks or active fire/burning states",
      effect: "Suppresses powder snow freezing tick accumulation. Static Burning Time attribute modifier reduces burn duration across all tiers.",
      tierDetails: "Tiers I & II: entity.setTicksFrozen(3) | Tier III: entity.setTicksFrozen(0) (complete freeze immunity). All tiers: Attributes.BURNING_TIME -2.0 seconds."
    },
    {
      id: "step_aquatic",
      title: "Step Height & Submerged Mining",
      subtitle: "Traversal & Aquatic Attributes",
      icon: Footprints,
      trigger: "Passive state active while Tier III serum is applied",
      effect: "Sets base Step Height attribute to 1.0 block, permitting smooth traversal up full vertical block faces without jumping. Adds oxygen bonus and underwater mining speed.",
      tierDetails: "Tier III Exclusive: Step Height = 1.0, Oxygen Bonus = +0.5, Submerged Mining Speed = +0.6."
    },
    {
      id: "permanence",
      title: "Genomic Permanence & Anti-Devolution",
      subtitle: "DNA Alteration & Downgrade Prevention",
      icon: ShieldCheck,
      trigger: "Repeated Tier III consumption (4–7 bottles) or consuming lower tier potions while high tier is active",
      effect: "Locks Darwinism III permanently via player capability variables. Blocks accidental downgrades to lower serum tiers with 'Devolution refused.'",
      tierDetails: "Permanence initialized between 4 and 7 drinks. Cleared by consuming 7 bottles of Potion of Milk or upon player death."
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
          Biological Adaptations & Procedure Triggers
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
          Technical documentation of procedural trigger conditions, mathematical thresholds, and effect amplifier assignments implemented in the Darwinism mod source code.
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
                    <span className="text-slate-300 font-mono">{adapt.trigger}</span>
                  </div>
                  <div>
                    <strong className="text-sky-300 font-mono">Mechanic: </strong>
                    <span className="text-slate-400 font-sans">{adapt.effect}</span>
                  </div>
                  <div className="p-3 bg-[#070a13] border border-[#1e293b] rounded-lg font-mono text-[11px] text-sky-200">
                    <strong className="text-sky-400">Specification: </strong>
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
