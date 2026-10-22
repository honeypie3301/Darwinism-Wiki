/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All descriptions must be factual, technical, and encyclopedic. Do not use storytelling prose.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * In-game mod mechanics and updates only. Never document wiki website changes.
 */
import React from 'react';
import { FlaskConical, Activity, Zap, Eye, Flame, ShieldCheck, Dna, ShieldAlert, Footprints } from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function SerumOverviewView() {
  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-slate-300 select-text">
      
      {/* Intro Header */}
      <UpdatedFrame id="serum_overview_header" isUpdated={true}>
        <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase font-bold tracking-wider">
            <FlaskConical className="w-4 h-4 text-sky-400" />
            <span>Technical System Specification</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-100">
            Darwin’s Serum Mechanics & Realtime Adaptation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Darwin's Serum operates as a real-time reactive state machine in Minecraft NeoForge. Active effects evaluate environmental metrics, player movement states, and combat damage on each entity tick to dynamically grant attributes, status amplifiers, and emergency defenses.
          </p>
        </div>
      </UpdatedFrame>

      {/* Dynamic Trigger Thresholds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Trigger 1: Sprinting */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Kinetic Sprint Acceleration</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Sprinting increments an internal tick counter. Exceeding configured thresholds applies infinite-duration Speed effects that immediately clear upon stopping or walking.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200 space-y-1">
            <div>• Tier I: sprintCounter &gt; 60 ticks (3.0s) → Movement Speed II (Amplifier 1)</div>
            <div>• Tier II: sprintCounter &gt; 50 ticks (2.5s) → Movement Speed III (Amplifier 2)</div>
            <div>• Tier III: sprintCounter &gt; 60 ticks (3.0s) → Movement Speed IV (Amplifier 3) + -0.05 food exhaustion/tick</div>
          </div>
        </div>

        {/* Trigger 2: Damage & Dynamic Adrenaline */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Cellular Regeneration & Adrenaline</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Tiers I and II trigger emergency stabilization at critical health thresholds. Tier III features a dynamic combat adrenaline accumulation loop.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200 space-y-1">
            <div>• Tiers I & II (Health &lt; 2 HP): Resistance IV (10s) + Regeneration V (10s)</div>
            <div>• Tiers I & II (Health &lt; 7 HP): Regeneration II (10s)</div>
            <div>• Tier III Adrenaline: +2 per hit (max 15). Applies Regeneration amplifier = Math.round(adrenaline / 3). Decays by 0.05/tick.</div>
          </div>
        </div>

        {/* Trigger 3: Ocular Adaptation */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Eye className="w-4 h-4 text-sky-400" />
            <span>Ocular Night Vision</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Monitors ambient raw block brightness at player coordinates each tick. Automatically applies Night Vision when lighting falls beneath the darkness threshold.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200 space-y-1">
            <div>• Tier I: rawBrightness &le; 4 → Night Vision I (cleared when &gt; 4)</div>
            <div>• Tier II: rawBrightness &le; 3 → Night Vision I (cleared when &gt; 3)</div>
            <div>• Tier III: rawBrightness &le; 3 → Night Vision I (60 tick refresh)</div>
          </div>
        </div>

        {/* Trigger 4: Kinetic Jump & Powder Snow */}
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3 hover:border-sky-500/40 transition-all">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Flame className="w-4 h-4 text-sky-400" />
            <span>Kinetic Jump & Cryo Insulation</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Crouching on solid ground activates charged high-jump capabilities. Powder snow contact suppresses freezing accumulators.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200 space-y-1">
            <div>• Sneak + On Ground: Jump Boost IV (Tier I), Jump Boost VI (Tier II), Jump Boost VIII (Tier III)</div>
            <div>• Powder Snow: Freeze progress clamped to 3 ticks (Tiers I & II), total freeze immunity (0 ticks) (Tier III)</div>
            <div>• Burning Time: -2.0 seconds base reduction across all tiers</div>
          </div>
        </div>

      </div>

      {/* Threat Blast Shield & Step Height (Tier III) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <span>Threat Blast Shield (Tier III)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Continuously queries entities within a 6-block radius (AABB bounding box) for explosive projectiles and mobs:
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200 space-y-1">
            <div>• Primed TNT or Creeper within 6 blocks → Resistance IV (5 seconds)</div>
            <div>• TNT Minecart within 6 blocks → Resistance V (5 seconds)</div>
          </div>
        </div>

        <div className="p-5 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-base">
            <Footprints className="w-4 h-4 text-sky-400" />
            <span>Step Height & Aquatic Modifiers (Tier III)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Tier III permanently sets Step Height to 1.0 block, permitting smooth traversal over full vertical blocks without jumping.
          </p>
          <div className="bg-[#070a13] p-3 rounded-lg border border-[#1e293b] font-mono text-[11px] text-sky-200 space-y-1">
            <div>• Attributes.STEP_HEIGHT: 1.0 (ascend full blocks seamlessly)</div>
            <div>• Attributes.OXYGEN_BONUS: +0.5</div>
            <div>• Attributes.SUBMERGED_MINING_SPEED: +0.6</div>
          </div>
        </div>
      </div>

      {/* Static Attribute Modifiers Comparison */}
      <UpdatedFrame id="serum_attribute_modifiers_table" isUpdated={true}>
        <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sky-300 font-mono text-xs uppercase font-bold tracking-wider">
            <Dna className="w-4 h-4 text-sky-400" />
            <span>Static MobEffect Attribute Modifiers (v1.4.1 Specification)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg space-y-2">
              <div className="text-sky-300 font-bold text-sm">Tier I Baseline</div>
              <ul className="space-y-1 text-slate-300">
                <li>• Attack Damage: +4.0</li>
                <li>• Attack Knockback: +1.0</li>
                <li>• Block Break Speed: +1.0</li>
                <li>• Safe Fall Distance: +1.5 blocks</li>
                <li>• Burning Time: -2.0 seconds</li>
              </ul>
            </div>

            <div className="p-4 bg-[#0b101d] border border-[#1e293b] rounded-lg space-y-2">
              <div className="text-sky-300 font-bold text-sm">Tier II Enhanced</div>
              <ul className="space-y-1 text-slate-300">
                <li>• Attack Damage: +4.0</li>
                <li>• Attack Knockback: +1.0</li>
                <li>• Block Break Speed: +1.0</li>
                <li>• Safe Fall Distance: +1.5 blocks</li>
                <li>• Burning Time: -2.0 seconds</li>
                <li className="text-sky-300">• Max Health: +6.0 (+3 Hearts)</li>
                <li className="text-sky-300">• Explosion Knockback Res: +0.3</li>
              </ul>
            </div>

            <div className="p-4 bg-[#0b101d] border border-sky-600/40 rounded-lg space-y-2">
              <div className="text-sky-300 font-bold text-sm">Tier III Apex</div>
              <ul className="space-y-1 text-slate-300">
                <li>• Attack Damage: +4.0</li>
                <li>• Attack Knockback: +1.0</li>
                <li>• Block Break Speed: +1.0</li>
                <li>• Safe Fall Distance: +2.0 blocks</li>
                <li>• Burning Time: -2.0 seconds</li>
                <li className="text-sky-300">• Max Health: +8.0 (+4 Hearts)</li>
                <li className="text-sky-300">• Explosion Knockback Res: +0.3</li>
                <li className="text-teal-300">• Knockback Resistance: +0.2</li>
                <li className="text-teal-300">• Oxygen Bonus: +0.5</li>
                <li className="text-teal-300">• Submerged Mining Speed: +0.6</li>
              </ul>
            </div>
          </div>
        </div>
      </UpdatedFrame>

      {/* Permanent DNA Alteration & Anti-Devolution */}
      <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-serif font-bold text-base">
          <ShieldCheck className="w-4.5 h-4.5 text-sky-400" />
          <span>Genomic Permanence & Anti-Devolution Rules</span>
        </div>
        <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-2">
          <p>
            • <strong>Permanent DNA Alteration:</strong> When consuming Darwinism III, an internal random target between 4 and 7 is initialized. When the player consumes that quantity of Tier III bottles, the capability flag <code className="text-sky-300 font-mono">isDarwinismPermanent</code> is set to true. EnforceDarwinismPermanenceProcedure re-applies Darwinism III every 20 ticks infinitely.
          </p>
          <p>
            • <strong>Anti-Devolution Protocol:</strong> If a player with Tier II or Tier III consumes a lower tier potion, the lower tier effect is removed immediately and the client receives the actionbar message: <code className="text-sky-300 font-mono">&sect;9Devolution refused.</code>
          </p>
          <p>
            • <strong>Genome Neutralizer (Potion of Milk):</strong> Consuming a Potion of Milk removes all active mob effects. If permanent DNA alteration is active, consuming 7 bottles of Potion of Milk resets <code className="text-sky-300 font-mono">isDarwinismPermanent</code> to false. Permanent status also clears on player death respawn.
          </p>
        </div>
      </div>

    </div>
  );
}
