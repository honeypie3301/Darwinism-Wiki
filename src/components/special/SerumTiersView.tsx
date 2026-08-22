import React from 'react';
import { ShieldCheck, FlaskConical, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function SerumTiersView() {
  const tiers = [
    {
      level: "Tier I",
      title: "Potion of Darwinism I",
      duration: "3:00 Minutes",
      reagent: "Fermented Spider Eye + Awkward Potion",
      color: "border-sky-500/40 text-sky-300",
      features: [
        "Attribute: +20% generic.movement_speed (+0.02 base multiplier) while sprinting",
        "Cellular Recovery: Regeneration I (+0.5 HP/sec on damage)",
        "Ocular Sight: Night Vision in darkness (< 7 light)",
        "Aquatic Protection: Water Breathing on submersion"
      ]
    },
    {
      level: "Tier II",
      title: "Potion of Darwinism II",
      duration: "5:00 Minutes",
      reagent: "Glowstone Dust + Potion of Darwinism I",
      color: "border-sky-400 text-sky-200",
      features: [
        "Attribute: +40% generic.movement_speed (Exactly 2.0x Level 1 stats)",
        "Cellular Recovery: Regeneration II (+1.0 HP/sec - 2.0x Level 1 recovery rate)",
        "Thermal Barrier: Fire Resistance (100% lava / heat immunity)",
        "Aquatic: Water Breathing + Swift Swim II (2x underwater velocity)"
      ]
    },
    {
      level: "Tier III",
      title: "Potion of Darwinism III (Apex)",
      duration: "8:00 Minutes",
      reagent: "Dragon's Breath + Potion of Darwinism II",
      color: "border-cyan-400 text-cyan-200 shadow-sky-500/10",
      features: [
        "Attribute: +60% generic.movement_speed (3.0x Level 1 / 1.5x Level 2)",
        "Rapid Recovery: Regeneration III (+1.5 HP/sec - 3.0x Level 1) & Resistance II",
        "Sub-Visual Sight + True Blindness Immunity",
        "Complete Thermal, Aquatic, and Fall Damage Immunity"
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
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Darwin's Serum is formulated across three distinct biological potency tiers, advancing from basic environmental response to total Apex physiological dominance.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map(t => (
          <UpdatedFrame key={t.level} id={`tier_frame_${t.level}`} isUpdated={true}>
            <div className={`p-5 bg-[#0b101d] border ${t.color} rounded-xl space-y-4 flex flex-col justify-between hover:border-sky-400 transition-all`}>
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
                <div className="text-[11px] font-mono text-slate-400 bg-[#070a13] p-2 rounded border border-[#1e293b]">
                  <strong className="text-sky-300">Brewing: </strong>{t.reagent}
                </div>
                <ul className="space-y-2 text-xs text-slate-300 pt-1">
                  {t.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
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
