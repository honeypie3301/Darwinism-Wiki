import React, { useState } from 'react';
import {
  FlaskConical, Search, Sparkles, Compass, Shield, Droplets
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';
import FancyRecipeView from './FancyRecipeView';
import { trackTelemetryClick } from '../../utils/telemetry';

interface ItemData {
  id: string;
  name: string;
  category: 'serum' | 'purifier';
  desc: string;
  isUpdated?: boolean;
  stats?: { label: string; value: string }[];
  recipes?: string[];
  notes?: string[];
}

export default function ItemsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string>('darwinism_1_bottle');

  const categories = [
    { id: 'all', name: 'All Potions', icon: FlaskConical },
    { id: 'serum', name: 'Darwinism Serums', icon: Sparkles },
    { id: 'purifier', name: 'Purifiers', icon: Droplets }
  ];

  const items: ItemData[] = [
    {
      id: 'darwinism_1_bottle',
      name: 'Potion of Darwinism (Tier I)',
      category: 'serum',
      desc: 'The foundational bio-adaptation brew. Enhances melee power, mining speed, burn recovery, and safe fall distance while unlocking Night Vision, Sprint Speed II, Crouch Jump IV, and emergency Resistance/Regeneration.',
      stats: [
        { label: 'Potion Registry ID', value: 'darwinism:darwinism_1_bottle' },
        { label: 'Effect ID', value: 'darwinism:darwinism' },
        { label: 'Duration', value: '3,600 ticks (3:00)' },
        { label: 'Effect Amplifier', value: '0 (Level I)' },
        { label: 'Brewing Base', value: 'Awkward Potion (Normal / Splash / Lingering)' },
        { label: 'Brewing Agent', value: 'minecraft:nautilus_shell' }
      ],
      recipes: ['darwinism:darwinism_1_bottle'],
      notes: [
        'Compatible with Potion, Splash Potion, Lingering Potion, and Tipped Arrows ("Arrow of Darwinism").',
        'Blocked by anti-devolution check if Darwinism II or Darwinism III is currently active ("§9Devolution refused.").',
        'Serves as the direct brewing base for both Darwinism II and Potion of Milk.'
      ]
    },
    {
      id: 'darwinism_2_bottle',
      name: 'Potion of Darwinism (Tier II)',
      category: 'serum',
      desc: 'Refined adaptation serum adding +6 Max Health (+3 hearts), +0.3 Explosion Knockback Resistance, faster Sprint Speed III (50-tick charge), Jump Boost VI, and full immunity to Powder Snow freezing.',
      stats: [
        { label: 'Potion Registry ID', value: 'darwinism:darwinism_2_bottle' },
        { label: 'Effect ID', value: 'darwinism:darwinism_2' },
        { label: 'Duration', value: '4,000 ticks (3:20)' },
        { label: 'Effect Amplifier', value: '1 (Level II)' },
        { label: 'Brewing Base', value: 'Potion of Darwinism (Tier I)' },
        { label: 'Brewing Agent', value: 'minecraft:golden_carrot' }
      ],
      recipes: ['darwinism:darwinism_2_bottle'],
      notes: [
        'Compatible with Potion, Splash Potion, Lingering Potion, and Tipped Arrows ("Arrow of Darwinism").',
        'Blocked if Darwinism III is active ("§9Devolution refused.").',
        'Lowers critical Night Vision threshold to raw light level <= 3 and increases Crisis Resistance/Regen to V/VI below 2 HP.'
      ]
    },
    {
      id: 'darwinism_3_bottle',
      name: 'Potion of Darwinism (Tier III)',
      category: 'serum',
      isUpdated: true,
      desc: 'Apex genetic serum granting +8 Max Health, +0.5 Oxygen Bonus, +0.6 Submerged Mining, +0.2 Knockback Resistance, Step Height 1.0, Speed IV with stamina sustain, Blast Shield proximity Resistance, and Adrenaline-driven Regeneration.',
      stats: [
        { label: 'Potion Registry ID', value: 'darwinism:darwinism_3_bottle' },
        { label: 'Effect ID', value: 'darwinism:darwinism_3' },
        { label: 'Duration', value: '5,000 ticks (4:10)' },
        { label: 'Effect Amplifier', value: '2 (Level III)' },
        { label: 'Brewing Base', value: 'Potion of Darwinism (Tier II)' },
        { label: 'Brewing Agent', value: 'minecraft:enchanted_golden_apple' }
      ],
      recipes: ['darwinism:darwinism_3_bottle'],
      notes: [
        'Compatible with Potion, Splash Potion, Lingering Potion, and Tipped Arrows ("Arrow of Darwinism").',
        'Immediately clears active Darwinism I and II effects to avoid overlapping modifiers.',
        'Schedules a 45-tick delayed biological shock: Poison I (40t) + Nausea I (80t).',
        'Consuming 4 to 7 doses permanently alters your DNA, making Tier III infinite until death or curing with 7× Potions of Milk.'
      ]
    },
    {
      id: 'milk_bottle',
      name: 'Potion of Milk',
      category: 'purifier',
      isUpdated: true,
      desc: 'A neutral neutralizing agent brewed directly from Darwinism I. Clears all active status effects immediately and contributes 1 dose toward the 7-bottle purification threshold required to cure permanent Darwinism III.',
      stats: [
        { label: 'Potion Registry ID', value: 'darwinism:milk_bottle' },
        { label: 'Effect ID', value: 'darwinism:milk_effect' },
        { label: 'Duration', value: '60 ticks (0:03)' },
        { label: 'Category & Flags', value: 'NEUTRAL • Ambient (No Particles)' },
        { label: 'Brewing Base', value: 'Potion of Darwinism (Tier I)' },
        { label: 'Brewing Agent', value: 'minecraft:fermented_spider_eye' }
      ],
      recipes: ['darwinism:milk_bottle'],
      notes: [
        'Works across Potion, Splash Potion, Lingering Potion, and Arrow of Milk.',
        'Calls entity.removeAllEffects() on activation.',
        'If isDarwinismPermanent is true, increments milkDrunkCount; reaching 7 resets all permanence flags and strips Darwinism III.'
      ]
    }
  ];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      (item.notes?.some((n) => n.toLowerCase().includes(q)) ?? false);
    return matchesCat && matchesSearch;
  });

  const activeItem = items.find((i) => i.id === selectedItemId) || filteredItems[0] || items[0];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-ink-muted select-text">

      {/* Filter & Search Bar */}
      <div className="p-4 bg-surface border border-line rounded-xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  trackTelemetryClick({ page: 'items', target: cat.name, category: 'filter' });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-accent-soft text-accent-text border-accent-border font-semibold'
                    : 'bg-surface-alt text-ink-muted border-line hover:text-ink'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[210px]">
          <Search className="w-3.5 h-3.5 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter potions..."
            className="w-full bg-surface-alt border border-line rounded-lg py-1.5 pl-8.5 pr-3 text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Item Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredItems.map((item) => {
          const isSelected = activeItem?.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemId(item.id);
                trackTelemetryClick({ page: 'items', target: item.name, category: 'item' });
              }}
              className={`text-left p-4 rounded-xl border transition-colors cursor-pointer space-y-1.5 ${
                isSelected
                  ? 'bg-accent-soft border-accent-border'
                  : 'bg-surface border-line hover:border-accent/40 hover:bg-surface-alt'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display font-semibold text-sm text-ink">{item.name}</span>
                {item.isUpdated && (
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-surface border border-accent-border text-accent-text shrink-0">
                    v1.4
                  </span>
                )}
              </div>
              <div className="text-[11px] font-mono text-ink-subtle truncate">darwinism:{item.id}</div>
            </button>
          );
        })}
      </div>

      {/* Active Item Detail Panel */}
      {activeItem && (
        <UpdatedFrame id={`dw_item_${activeItem.id}`} isUpdated={Boolean(activeItem.isUpdated)}>
          <div className="p-6 bg-surface border border-line rounded-xl space-y-6">
            <div className="border-b border-line pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-2xl font-bold text-ink">{activeItem.name}</h2>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface-alt border border-line text-accent-text">
                  {activeItem.category === 'serum' ? 'Adaptive Serum' : 'Purification Brew'}
                </span>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">{activeItem.desc}</p>
            </div>

            {activeItem.stats && activeItem.stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeItem.stats.map((stat) => (
                  <div key={stat.label} className="p-3 bg-surface-alt border border-line rounded-lg">
                    <div className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">{stat.label}</div>
                    <div className="text-xs font-mono font-semibold text-ink mt-1 break-all">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeItem.recipes && activeItem.recipes.length > 0 && (
              <FancyRecipeView itemIds={activeItem.recipes} title="Brewing Stand Recipe" />
            )}

            {activeItem.notes && activeItem.notes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-line-soft">
                <div className="text-xs font-mono uppercase tracking-wider text-ink-subtle font-semibold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-accent-text" />
                  <span>Implementation Notes</span>
                </div>
                <ul className="space-y-1.5 text-xs text-ink-muted list-disc list-inside font-mono">
                  {activeItem.notes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </UpdatedFrame>
      )}

      {/* Brewing Tip */}
      <div className="p-5 bg-surface border border-line rounded-xl flex items-start gap-3">
        <Compass className="w-4 h-4 text-accent-text shrink-0 mt-0.5" />
        <div className="text-xs text-ink-muted leading-relaxed">
          <strong className="text-ink">Brewing Chain Tip:</strong> Every custom <code className="font-mono text-accent-text">IBrewingRecipe</code> checks for <code className="font-mono text-ink">Items.POTION</code>, <code className="font-mono text-ink">Items.SPLASH_POTION</code>, or <code className="font-mono text-ink">Items.LINGERING_POTION</code> and outputs the matching container type, so you can brew Splash or Lingering variants directly without re-converting after Tier I.
        </div>
      </div>

    </div>
  );
}
