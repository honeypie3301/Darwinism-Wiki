import React, { useState } from 'react';
import {
  Dna,
  Activity,
  Zap,
  Shield,
  Eye,
  Snowflake,
  Bomb,
  Gauge
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

interface TierSpec {
  id: 'tier1' | 'tier2' | 'tier3';
  label: string;
  effectId: string;
  duration: string;
  amplifier: number;
  attributes: { name: string; value: string }[];
  triggers: { title: string; condition: string; result: string }[];
}

export default function MechanicsView() {
  const [selectedTier, setSelectedTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier3');

  const tiers: Record<'tier1' | 'tier2' | 'tier3', TierSpec> = {
    tier1: {
      id: 'tier1',
      label: 'Darwinism I',
      effectId: 'darwinism:darwinism',
      duration: '3,600 ticks (3:00)',
      amplifier: 0,
      attributes: [
        { name: 'ATTACK_KNOCKBACK', value: '+1' },
        { name: 'ATTACK_DAMAGE', value: '+4' },
        { name: 'BLOCK_BREAK_SPEED', value: '+1' },
        { name: 'BURNING_TIME', value: '-2' },
        { name: 'SAFE_FALL_DISTANCE', value: '+1.5' }
      ],
      triggers: [
        {
          title: 'Optic Adaptation',
          condition: 'Raw block light level <= 4',
          result: 'Grants infinite Night Vision I (ambient, no particles); stripped when light > 4.'
        },
        {
          title: 'Kinetic Sprint',
          condition: 'Sprinting for > 60 ticks (3s)',
          result: 'Grants infinite Speed II (amp 1); resets sprintCounter to 0 and removes Speed when not sprinting.'
        },
        {
          title: 'Charged Leap',
          condition: 'Sneaking (Shift) while onGround',
          result: 'Grants infinite Jump Boost IV (amp 3); removed as soon as sneaking ends or player leaves ground.'
        },
        {
          title: 'Crisis Stabilization',
          condition: 'Health < 2 HP (1 heart) / < 7 HP',
          result: 'Below 2 HP: Resistance IV + Regen V (200 ticks). Below 7 HP: Regen II (200 ticks).'
        },
        {
          title: 'Cryo Resistance',
          condition: 'Inside Powder Snow (y or y - 1)',
          result: 'Clamps entity freeze ticks to 3 (slows freeze buildup slightly).'
        }
      ]
    },
    tier2: {
      id: 'tier2',
      label: 'Darwinism II',
      effectId: 'darwinism:darwinism_2',
      duration: '4,000 ticks (3:20)',
      amplifier: 1,
      attributes: [
        { name: 'ATTACK_KNOCKBACK', value: '+1' },
        { name: 'ATTACK_DAMAGE', value: '+4' },
        { name: 'BLOCK_BREAK_SPEED', value: '+1' },
        { name: 'BURNING_TIME', value: '-2' },
        { name: 'SAFE_FALL_DISTANCE', value: '+1.5' },
        { name: 'EXPLOSION_KNOCKBACK_RESISTANCE', value: '+0.3' },
        { name: 'MAX_HEALTH', value: '+6 (+3 Hearts)' }
      ],
      triggers: [
        {
          title: 'Optic Adaptation',
          condition: 'Raw block light level <= 3',
          result: 'Grants infinite Night Vision I (ambient, no particles); removed above light level 3.'
        },
        {
          title: 'Faster Kinetic Sprint',
          condition: 'Sprinting for > 50 ticks (2.5s)',
          result: 'Grants infinite Speed III (amp 2); charges 10 ticks faster than Tier I.'
        },
        {
          title: 'Charged Leap',
          condition: 'Sneaking (Shift) while onGround',
          result: 'Grants infinite Jump Boost VI (amp 5); immediately cleared upon jumping or standing.'
        },
        {
          title: 'Crisis Stabilization',
          condition: 'Health < 2 HP (1 heart) / < 7 HP',
          result: 'Below 2 HP: Resistance V + Regen VI (200 ticks). Below 7 HP: Regen II (200 ticks).'
        },
        {
          title: 'Complete Cryo Immunity',
          condition: 'Inside Powder Snow (y or y - 1)',
          result: 'Resets freeze ticks to 0 every tick (entity.setTicksFrozen(0)).'
        }
      ]
    },
    tier3: {
      id: 'tier3',
      label: 'Darwinism III',
      effectId: 'darwinism:darwinism_3',
      duration: '5,000 ticks (4:10) / Permanent',
      amplifier: 2,
      attributes: [
        { name: 'ATTACK_KNOCKBACK', value: '+1' },
        { name: 'ATTACK_DAMAGE', value: '+4' },
        { name: 'BLOCK_BREAK_SPEED', value: '+1' },
        { name: 'BURNING_TIME', value: '-2' },
        { name: 'SAFE_FALL_DISTANCE', value: '+2' },
        { name: 'EXPLOSION_KNOCKBACK_RESISTANCE', value: '+0.3' },
        { name: 'MAX_HEALTH', value: '+8 (+4 Hearts)' },
        { name: 'OXYGEN_BONUS', value: '+0.5' },
        { name: 'SUBMERGED_MINING_SPEED', value: '+0.6' },
        { name: 'KNOCKBACK_RESISTANCE', value: '+0.2' },
        { name: 'STEP_HEIGHT (Base Tick)', value: '1.0 (Full-block step-up)' }
      ],
      triggers: [
        {
          title: 'Optic Adaptation',
          condition: 'Raw block light level <= 3',
          result: 'Applies Night Vision I for 60 ticks (refreshes every tick while dark).'
        },
        {
          title: 'Apex Kinetic Sprint & Stamina',
          condition: 'Sprinting > 60 ticks',
          result: 'Grants infinite Speed IV (amp 3). While Speed is active, applies -0.05 food exhaustion per tick to sustain hunger.'
        },
        {
          title: 'Charged Leap',
          condition: 'Sneaking (Shift) while onGround',
          result: 'Applies Jump Boost VIII (amp 7, 10 ticks) while grounded and crouching.'
        },
        {
          title: 'Threat Perception (Blast Shield)',
          condition: 'PrimedTnt, Creeper, or MinecartTNT within 6×6×6 AABB (3 blocks radius)',
          result: 'PrimedTnt/Creeper → Resistance IV (100t). MinecartTNT → Resistance V (100t).'
        },
        {
          title: 'Dynamic Adrenaline Regeneration',
          condition: 'Incoming damage > 0 adds +2 adrenaline (max 15); decays -0.05/tick',
          result: 'Applies infinite Regeneration at level Math.round(adrenaline / 3) (Regen I baseline up to Regen VI at peak adrenaline).'
        },
        {
          title: 'Complete Cryo Immunity',
          condition: 'Inside Powder Snow (y or y - 1)',
          result: 'Resets freeze ticks to 0 every tick (entity.setTicksFrozen(0)).'
        }
      ]
    }
  };

  const activeSpec = tiers[selectedTier];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-ink-muted select-text">

      {/* Header Overview */}
      <div className="p-6 bg-surface border border-line rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-text uppercase tracking-wider font-semibold">
          <Dna className="w-4 h-4" />
          <span>Active Tick &amp; Attribute Adaptation Engine</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">
          Three-Tier Biological Progression
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed">
          All three <strong className="text-ink">Darwinism</strong> mob effects combine native NeoForge <code className="text-accent-text font-mono text-xs">ADD_VALUE</code> attribute modifiers with per-tick environmental sensing (<code className="text-ink font-mono text-xs">applyEffectTick</code>). Higher tiers unlock stronger attributes, faster reflexes, and reactive adrenaline scaling.
        </p>
      </div>

      {/* Interactive Tier Switcher */}
      <UpdatedFrame id="dw_mechanics_tier_switcher" isUpdated={true}>
        <div className="p-6 bg-surface border border-line rounded-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                Effect Tier Inspector
              </h3>
              <p className="text-xs font-mono text-ink-subtle mt-0.5">
                Switch between Darwinism I, II, and III to compare attributes and tick procedures
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['tier1', 'tier2', 'tier3'] as const).map((tierKey, idx) => (
                <button
                  key={tierKey}
                  onClick={() => setSelectedTier(tierKey)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 border transition-colors cursor-pointer ${
                    selectedTier === tierKey
                      ? 'bg-accent-soft text-accent-text border-accent-border'
                      : 'bg-surface-alt text-ink-muted border-line hover:text-ink'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Tier {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-alt border border-line rounded-lg">
              <div className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">Effect Registry ID</div>
              <div className="text-sm font-mono font-bold text-accent-text mt-1">{activeSpec.effectId}</div>
              <div className="text-xs text-ink-muted mt-1">Category: BENEFICIAL (#0065FF)</div>
            </div>
            <div className="p-4 bg-surface-alt border border-line rounded-lg">
              <div className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">Potion Duration</div>
              <div className="text-lg font-display font-bold text-ink mt-1">{activeSpec.duration}</div>
              <div className="text-xs text-ink-muted mt-1">Amplifier: {activeSpec.amplifier}</div>
            </div>
            <div className="p-4 bg-surface-alt border border-line rounded-lg">
              <div className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">Attribute Modifiers</div>
              <div className="text-lg font-display font-bold text-good-text mt-1">{activeSpec.attributes.length} Active Shifts</div>
              <div className="text-xs text-ink-muted mt-1">Applied natively via MobEffect</div>
            </div>
          </div>

          {/* Attribute Modifiers Grid */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-ink-subtle font-semibold flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-accent-text" />
              <span>Attribute Modifiers ({activeSpec.label})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {activeSpec.attributes.map((attr) => (
                <div key={attr.name} className="p-3 bg-surface-alt border border-line rounded-lg flex items-center justify-between gap-2">
                  <code className="text-[11px] font-mono text-ink truncate">{attr.name}</code>
                  <span className="text-xs font-mono font-bold text-accent-text shrink-0">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tick Reflexes */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-ink-subtle font-semibold flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-accent-text" />
              <span>Environmental &amp; Combat Reflexes</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeSpec.triggers.map((trig) => (
                <div key={trig.title} className="p-3.5 bg-surface-alt border border-line rounded-lg space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-display font-semibold text-ink">{trig.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-line text-accent-text truncate max-w-[55%]">
                      {trig.condition}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{trig.result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </UpdatedFrame>

      {/* Deep Dive: Adrenaline & Blast Shield */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-surface border border-line rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-ink font-display font-semibold text-base">
            <Activity className="w-4 h-4 text-accent-text" />
            <span>Dynamic Adrenaline Scaling (Tier III)</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Handled across <code className="font-mono text-ink">DynamicRegenerationProcedure</code> (<code className="font-mono text-accent-text">LivingIncomingDamageEvent</code>), <code className="font-mono text-ink">Darwinism3OnEffectActiveTickProcedure</code>, and <code className="font-mono text-ink">DynamicRegenerationResetProcedure</code>:
          </p>
          <ul className="text-xs font-mono space-y-1.5 text-ink-muted bg-surface-alt p-3.5 rounded-lg border border-line">
            <li>• On Damage (&gt; 0): <span className="text-ink">adrenaline += 2</span> (capped at <span className="text-accent-text">15</span>)</li>
            <li>• Regen Amplifier: <span className="text-ink">Math.round(adrenaline / 3)</span> (0 → 5)</li>
            <li>• Natural Decay: <span className="text-ink">-0.05 / tick</span> while <span className="text-ink">adrenaline &gt; 0</span></li>
            <li>• Respawn Reset: <span className="text-good-text">adrenaline = 0</span></li>
          </ul>
        </div>

        <div className="p-5 bg-surface border border-line rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-ink font-display font-semibold text-base">
            <Bomb className="w-4 h-4 text-accent-text" />
            <span>Blast Perception &amp; Cryo Guards</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Tier III scans a 6×6×6 bounding box (<code className="font-mono text-ink">AABB.inflate(3)</code>) centered on the player every tick for explosive entities while neutralizing freeze buildup:
          </p>
          <ul className="text-xs font-mono space-y-1.5 text-ink-muted bg-surface-alt p-3.5 rounded-lg border border-line">
            <li>• <span className="text-ink">PrimedTnt</span> / <span className="text-ink">Creeper</span>: <span className="text-accent-text">Resistance IV</span> (100t)</li>
            <li>• <span className="text-ink">MinecartTNT</span>: <span className="text-good-text">Resistance V</span> (100t)</li>
            <li>• Powder Snow (Tier I): <span className="text-ink">setTicksFrozen(3)</span></li>
            <li>• Powder Snow (Tier II &amp; III): <span className="text-good-text">setTicksFrozen(0)</span></li>
          </ul>
        </div>
      </div>

      {/* Tier Upgrade & Side Effect Note */}
      <div className="p-5 bg-surface border border-line rounded-xl space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-subtle font-semibold">
          <Shield className="w-4 h-4 text-accent-text" />
          <span>Tier Transition &amp; Shock Side Effect</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-muted">
          <div className="p-3.5 bg-surface-alt border border-line rounded-lg">
            <div className="font-mono font-semibold text-ink mb-1">Upward Override</div>
            When <code className="font-mono text-accent-text">DARWINISM_3</code> activates, it immediately strips <code className="font-mono text-ink">DARWINISM_2</code> and <code className="font-mono text-ink">DARWINISM</code> to prevent duplicate attribute stacking.
          </div>
          <div className="p-3.5 bg-surface-alt border border-line rounded-lg flex items-start gap-2">
            <Snowflake className="w-4 h-4 text-accent-text shrink-0 mt-0.5" />
            <div>
              <div className="font-mono font-semibold text-ink mb-1">Cellular Shock (45-Tick Delay)</div>
              Applying Tier III schedules a 45-tick server task via <code className="font-mono text-ink">DarwinismMod.queueServerWork</code> that inflicts <strong className="text-warn-text">Poison I (40t)</strong> and <strong className="text-warn-text">Nausea I (80t)</strong>.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
