import React, { useState } from 'react';
import {
  ShieldAlert,
  Dna,
  Droplets,
  Skull,
  Lock,
  RefreshCw,
  Compass,
  Clock
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';

export default function AcquisitionView() {
  const [activeTab, setActiveTab] = useState<'all' | 'permanence' | 'cure' | 'protection'>('all');

  const variableRows = [
    {
      name: 'darwinismDrunkCount',
      type: 'double (default 0)',
      role: 'Counts Tier III applications while genetic mutation is still temporary.'
    },
    {
      name: 'darwinismTarget',
      type: 'double (4 – 7)',
      role: 'Random integer threshold rolled via Mth.nextInt(4, 7) on first Tier III dose.'
    },
    {
      name: 'isDarwinismPermanent',
      type: 'boolean (default false)',
      role: 'Triggers 20-tick infinite Darwinism III enforcement when true.'
    },
    {
      name: 'milkDrunkCount',
      type: 'double (default 0)',
      role: 'Tracks Potion of Milk doses consumed while permanently mutated (cured at 7).'
    }
  ];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-ink-muted select-text">

      {/* Filter Tabs */}
      <div className="p-3 bg-surface border border-line rounded-xl flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'Full DNA Lifecycle', icon: Compass },
          { id: 'permanence', label: 'Genetic Alteration', icon: Dna },
          { id: 'cure', label: '7-Dose Milk Cure & Death Reset', icon: Droplets },
          { id: 'protection', label: 'Anti-Devolution Guard', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 border transition-colors cursor-pointer ${
                active
                  ? 'bg-accent-soft text-accent-text border-accent-border font-semibold'
                  : 'bg-surface-alt text-ink-muted border-line hover:text-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section 1: DNA Permanence */}
      {(activeTab === 'all' || activeTab === 'permanence') && (
        <UpdatedFrame id="dw_acquisition_permanence" isUpdated={true}>
          <div className="p-6 bg-surface border border-line rounded-xl space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3.5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-text font-semibold">
                  <Dna className="w-4 h-4" />
                  <span>Permanent Mutation Threshold (Tier III)</span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mt-1">
                  &ldquo;Your DNA has permanently altered.&rdquo;
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-accent-soft text-accent-text border border-accent-border shrink-0">
                4 – 7 Doses
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-surface-alt border border-line rounded-lg space-y-1">
                <div className="text-[10px] font-mono text-ink-subtle uppercase">Step 1 • First Tier III</div>
                <div className="text-sm font-mono font-bold text-ink">Roll Target (4–7)</div>
                <p className="text-xs text-ink-muted">If <code className="text-ink">darwinismTarget == 0</code>, rolls a hidden threshold between 4 and 7.</p>
              </div>
              <div className="p-3.5 bg-surface-alt border border-line rounded-lg space-y-1">
                <div className="text-[10px] font-mono text-ink-subtle uppercase">Step 2 • Threshold Met</div>
                <div className="text-sm font-mono font-bold text-accent-text">Lock Permanence</div>
                <p className="text-xs text-ink-muted">Once <code className="text-ink">darwinismDrunkCount &gt;= darwinismTarget</code>, sets <code className="text-ink">isDarwinismPermanent = true</code>.</p>
              </div>
              <div className="p-3.5 bg-surface-alt border border-line rounded-lg space-y-1 min-w-0">
                <div className="text-[10px] font-mono text-ink-subtle uppercase">Step 3 • Enforcement</div>
                <div className="text-sm font-mono font-bold text-good-text">Every 20 Ticks</div>
                <p className="text-xs text-ink-muted break-words"><code className="text-ink break-all">EnforceDarwinismPermanenceProcedure</code> restores infinite Tier III if missing.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {variableRows.map((row) => (
                <div key={row.name} className="p-3 bg-surface-alt border border-line rounded-lg space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono font-semibold text-accent-text">{row.name}</code>
                    <span className="text-[10px] font-mono text-ink-subtle">{row.type}</span>
                  </div>
                  <p className="text-xs text-ink-muted">{row.role}</p>
                </div>
              ))}
            </div>
          </div>
        </UpdatedFrame>
      )}

      {/* Section 2: Cure & Death Reset */}
      {(activeTab === 'all' || activeTab === 'cure') && (
        <UpdatedFrame id="dw_acquisition_cure" isUpdated={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-surface border border-line rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink font-display font-semibold text-base">
                  <Droplets className="w-4 h-4 text-accent-text" />
                  <span>7-Dose Milk Purification</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-good-soft text-good-text border border-good-border">
                  milkDrunkCount &gt;= 7
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Vanilla milk buckets do not erase permanent mutation—within 1 second (<code className="font-mono text-ink">gameTime % 20 == 0</code>), <code className="font-mono text-ink">EnforceDarwinismPermanenceProcedure</code> reapplies Tier III. Instead, players must consume <strong className="text-ink">7× Potions of Milk</strong> (<code className="font-mono text-accent-text">darwinism:milk_bottle</code>).
              </p>
              <div className="p-3 bg-surface-alt border border-line rounded-lg text-[11px] font-mono space-y-1">
                <div className="text-ink">• Each Milk Effect adds <span className="text-accent-text">+1</span> to <span className="text-ink">milkDrunkCount</span></div>
                <div className="text-ink">• On 7th dose: resets all 4 permanence counters to 0/false</div>
                <div className="text-good-text">• Calls removeAllEffects() and removes DARWINISM_3</div>
              </div>
            </div>

            <div className="p-5 bg-surface border border-line rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink font-display font-semibold text-base">
                  <Skull className="w-4 h-4 text-warn-text" />
                  <span>Death &amp; Respawn Wipe</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-warn-soft text-warn-text border border-warn-border">
                  PlayerRespawnEvent
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Dying and respawning triggers <code className="font-mono text-ink">ResetDarwinismOnDeathProcedure</code> alongside <code className="font-mono text-ink">DynamicRegenerationResetProcedure</code>:
              </p>
              <div className="p-3 bg-surface-alt border border-line rounded-lg text-[11px] font-mono space-y-1">
                <div className="text-ink">• Clears <span className="text-warn-text">isDarwinismPermanent = false</span></div>
                <div className="text-ink">• Resets <span className="text-ink">darwinismDrunkCount</span>, <span className="text-ink">darwinismTarget</span>, <span className="text-ink">milkDrunkCount</span>, and <span className="text-ink">adrenaline</span></div>
                <div className="text-ink">• End portal (<code className="text-good-text">!isWasDeath()</code>) preserves your <code className="text-ink">darwinismTarget</code></div>
              </div>
            </div>
          </div>
        </UpdatedFrame>
      )}

      {/* Section 3: Anti-Devolution Guard */}
      {(activeTab === 'all' || activeTab === 'protection') && (
        <div className="p-5 bg-surface border border-line rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-text font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Anti-Devolution Protocol</span>
          </div>
          <h3 className="font-display text-lg font-bold text-ink">
            &ldquo;Devolution refused.&rdquo;
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Lower-tier serums cannot overwrite stronger adaptations. Both <code className="font-mono text-ink">DarwinismEffectStartedappliedProcedure</code> (Tier I) and <code className="font-mono text-ink">Darwinism2EffectStartedappliedProcedure</code> (Tier II) refuse activation whenever a superior tier is active:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 bg-surface-alt border border-line rounded-lg space-y-1">
              <div className="text-ink font-semibold flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-accent-text" />
                <span>Tier I Guard</span>
              </div>
              <div className="text-ink-subtle">Blocks if DARWINISM_2 or DARWINISM_3 active</div>
              <div className="text-accent-text">Actionbar: §9Devolution refused.</div>
            </div>
            <div className="p-3.5 bg-surface-alt border border-line rounded-lg space-y-1">
              <div className="text-ink font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-text" />
                <span>Tier II Guard</span>
              </div>
              <div className="text-ink-subtle">Blocks if DARWINISM_3 active</div>
              <div className="text-accent-text">Actionbar: §9Devolution refused.</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
