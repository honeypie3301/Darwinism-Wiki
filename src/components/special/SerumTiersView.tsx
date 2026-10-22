/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All descriptions must be factual, technical, and encyclopedic. Do not use storytelling prose.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * In-game mod mechanics and updates only. Never document wiki website changes.
 */
import React from 'react';
import { FlaskConical, Clock, CheckCircle2 } from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function SerumTiersView() {
  const tiers = [
    {
      level: "Tier I",
      title: "Potion of Darwinism I",
      duration: "3:00 Minutes (3600 ticks)",
      reagent: "Nautilus Shell + Awkward Potion",
      color: "border-[#1e293b] text-sky-300",
      features: [
        "Static: +4.0 Attack Damage, +1.0 Attack Knockback, +1.0 Block Break Speed",
        "Static: +1.5 blocks Safe Fall Distance, -2.0 seconds Burning Time",
        "Kinetic Sprint: Sprinting > 60 ticks applies Movement Speed II",
        "Kinetic Jump: Crouching on ground applies Jump Boost IV",
        "Ocular: Ambient light level <= 4 applies Night Vision I",
        "Crisis Overdrive: Health < 2 HP applies Resistance IV & Regeneration V (10s)",
        "Freeze Clamping: Powder snow freeze ticks clamped to 3"
      ]
    },
    {
      level: "Tier II",
      title: "Potion of Darwinism II",
      duration: "3:00 Minutes (3600 ticks)",
      reagent: "Golden Carrot + Potion of Darwinism I",
      color: "border-sky-500/40 text-sky-200",
      features: [
        "Static: All Tier I attributes retained",
        "Static Health: +6.0 Max Health (+3 Hearts)",
        "Static Defense: +0.3 Explosion Knockback Resistance",
        "Kinetic Sprint: Sprinting > 50 ticks applies Movement Speed III",
        "Kinetic Jump: Crouching on ground applies Jump Boost VI",
        "Ocular: Ambient light level <= 3 applies Night Vision I",
        "Anti-Devolution: Rejects consumption of Tier I potions"
      ]
    },
    {
      level: "Tier III",
      title: "Potion of Darwinism III (Apex)",
      duration: "3:00 Minutes (or Permanent)",
      reagent: "Enchanted Golden Apple + Potion of Darwinism II",
      color: "border-sky-400 text-sky-100",
      features: [
        "Static Health: +8.0 Max Health (+4 Hearts)",
        "Static Mobility: +2.0 blocks Safe Fall Distance, 1.0 block Step Height",
        "Static Attributes: +0.2 Knockback Res, +0.3 Explosion Res, +0.5 Oxygen, +0.6 Submerged Mining",
        "Kinetic Sprint: Sprinting > 60 ticks applies Movement Speed IV & -0.05 food exhaustion/tick",
        "Kinetic Jump: Crouching on ground applies Jump Boost VIII",
        "Dynamic Adrenaline: Damage intake adds +2 adrenaline (max 15), scaling Regeneration (Math.round(adrenaline / 3))",
        "Threat Blast Shield: Resistance IV/V against nearby Primed TNT, Creepers, and TNT Minecarts (6-block radius)",
        "Cryo Immunity: Powder snow freeze ticks set to 0 (immune to freezing)",
        "Genomic Permanence: Consuming 4–7 bottles permanently locks Darwinism III until cured by 7 Potions of Milk or death"
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-slate-300 select-text">
      
      {/* Intro */}
      <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase font-bold tracking-wider">
          <FlaskConical className="w-4 h-4 text-sky-400" />
          <span>Serum Science</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
          Serum Tiers & Formulations
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
          Darwin's Serum is formulated across three successive tiers via the brewing stand. Each tier builds upon preceding attributes and introduces specialized procedural threshold responses.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map(t => (
          <UpdatedFrame key={t.level} id={`tier_frame_${t.level}`} isUpdated={true}>
            <div className={`p-5 bg-[#0b101d] border ${t.color} rounded-xl space-y-4 flex flex-col justify-between hover:border-sky-400/60 transition-all`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-2">
                  <span className="font-mono text-xs text-sky-400 font-bold uppercase">{t.level}</span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3 h-3 text-sky-400" />
                    {t.duration}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  {t.title}
                </h3>
                <div className="text-[11px] font-mono text-slate-300 bg-[#070a13] p-2 rounded border border-[#1e293b]">
                  <strong className="text-sky-300">Brewing: </strong>{t.reagent}
                </div>
                <ul className="space-y-2 text-xs text-slate-300 pt-1 font-mono">
                  {t.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span className="text-[11px]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </UpdatedFrame>
        ))}
      </div>

    </div>
  );
}
