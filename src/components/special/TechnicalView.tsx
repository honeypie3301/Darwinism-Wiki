import React from 'react';
import {
  ShieldCheck,
  Database,
  Server
} from 'lucide-react';

export default function TechnicalView() {
  const registryEntries = [
    {
      id: 'darwinism:darwinism / darwinism_1_bottle',
      scope: 'MobEffect & Potion',
      detail: 'Tier I effect (BENEFICIAL, #0065FF) and 3,600-tick potion container.'
    },
    {
      id: 'darwinism:darwinism_2 / darwinism_2_bottle',
      scope: 'MobEffect & Potion',
      detail: 'Tier II effect (+6 Max Health, +0.3 Explosion KB Res) and 4,000-tick potion container.'
    },
    {
      id: 'darwinism:darwinism_3 / darwinism_3_bottle',
      scope: 'MobEffect & Potion',
      detail: 'Tier III effect (+8 Max Health, +0.5 Oxygen, +0.6 Submerged Mining) and 5,000-tick potion container.'
    },
    {
      id: 'darwinism:milk_effect / milk_bottle',
      scope: 'MobEffect & Potion',
      detail: 'Neutral purification effect (-1710619 / #E5E5E5) in a 60-tick ambient potion container.'
    },
    {
      id: 'darwinism:player_variables',
      scope: 'AttachmentType (NBT)',
      detail: 'Serializable PlayerVariables synced via PlayerVariablesSyncMessage (player_variables_sync).'
    }
  ];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-ink-muted select-text">

      {/* Registries & Attachments */}
      <div className="p-6 bg-surface border border-line rounded-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-text font-semibold">
          <Database className="w-4 h-4" />
          <span>Registered Effects, Potions &amp; Data Attachments</span>
        </div>
        <div className="space-y-2.5">
          {registryEntries.map((row) => (
            <div key={row.id} className="p-3.5 bg-surface-alt border border-line rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <code className="text-xs font-mono font-semibold text-accent-text">{row.id}</code>
                <p className="text-xs text-ink-muted">{row.detail}</p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-surface border border-line text-ink-subtle shrink-0 self-start sm:self-center">
                {row.scope}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Runtime Side & Licensing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-surface border border-line rounded-xl space-y-2.5">
          <div className="flex items-center gap-2 text-ink font-display font-semibold text-base">
            <Server className="w-4 h-4 text-accent-text" />
            <span>Environment &amp; Network Sync</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Both <code className="font-mono text-ink">neoforge</code> and <code className="font-mono text-ink">minecraft</code> dependencies specify <code className="font-mono text-accent-text">side=&quot;BOTH&quot;</code>. <code className="font-mono text-ink">PlayerVariables</code> synchronizes dirty NBT fields to clients on login, respawn, dimension travel, and end-of-tick updates.
          </p>
        </div>

        <div className="p-5 bg-surface border border-line rounded-xl space-y-2.5">
          <div className="flex items-center gap-2 text-ink font-display font-semibold text-base">
            <ShieldCheck className="w-4 h-4 text-accent-text" />
            <span>License &amp; Assets</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Distributed under <strong className="text-ink">GNU General Public License v3.0 or later</strong> (<code className="font-mono text-ink">neoforge.mods.toml</code> leaves the local license field unspecified). Resource assets include <code className="font-mono text-ink">logo.png</code>, <code className="font-mono text-ink">darwinism_logo.png</code>, and <code className="font-mono text-ink">mob_effect/*</code> icons.
          </p>
        </div>
      </div>

    </div>
  );
}
