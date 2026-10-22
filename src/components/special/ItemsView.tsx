/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All descriptions must be factual, technical, and encyclopedic. Do not use storytelling prose.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * In-game mod mechanics and updates only. Never document wiki website changes.
 */
import React, { useState } from 'react';
import { 
  Package, Search, Zap, Compass, 
  Dna, Sparkles, FlaskConical, ShieldCheck, Flame, Eye
} from 'lucide-react';
import UpdatedFrame from '../UpdatedFrame';
import FancyRecipeView from './FancyRecipeView';

interface ItemData {
  id: string;
  name: string;
  category: 'serum' | 'materials' | 'projectiles' | 'utility';
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
    { id: 'all', name: 'All Potions & Reagents', icon: Package },
    { id: 'serum', name: 'Darwin Serum Formulations', icon: FlaskConical },
    { id: 'materials', name: 'Biological Reagents', icon: Dna },
    { id: 'projectiles', name: 'Tipped Projectiles', icon: Sparkles },
    { id: 'utility', name: 'Genome Neutralizers', icon: ShieldCheck }
  ];

  const items: ItemData[] = [
    {
      id: "darwinism_1_bottle",
      name: "Potion of Darwinism I",
      category: "serum",
      isUpdated: true,
      desc: "Tier I formulation of Darwin's Serum. Distilled from an Awkward Potion using a Nautilus Shell. Provides baseline attribute modifiers alongside procedural sprint acceleration and low-light night vision.",
      stats: [
        { label: "Base Duration", value: "3:00 Minutes (3600 ticks)" },
        { label: "Attack Damage", value: "+4.0" },
        { label: "Attack Knockback", value: "+1.0" },
        { label: "Block Break Speed", value: "+1.0" },
        { label: "Safe Fall Distance", value: "+1.5 blocks" },
        { label: "Burning Time", value: "-2.0 seconds" }
      ],
      notes: [
        "Brewed in a Brewing Stand by distilling a Nautilus Shell into an Awkward Potion.",
        "Kinetic Sprint: Sprinting > 60 ticks applies Movement Speed II (Amplifier 1).",
        "Kinetic Jump: Sneak + On Ground applies Jump Boost IV.",
        "Ocular Sight: Ambient light level <= 4 applies Night Vision I.",
        "Crisis Overdrive: Health < 2 HP applies Resistance IV and Regeneration V (10s)."
      ]
    },
    {
      id: "darwinism_2_bottle",
      name: "Potion of Darwinism II",
      category: "serum",
      isUpdated: true,
      desc: "Tier II enhanced Darwin's Serum. Distilled from Darwinism I using a Golden Carrot. Expands max health and explosion resistance while shortening sprint activation thresholds.",
      stats: [
        { label: "Base Duration", value: "3:00 Minutes (3600 ticks)" },
        { label: "Max Health", value: "+6.0 (+3 Hearts)" },
        { label: "Explosion Knockback Res", value: "+0.3" },
        { label: "Safe Fall Distance", value: "+1.5 blocks" },
        { label: "Attack Damage", value: "+4.0" }
      ],
      notes: [
        "Brewed by distilling a Golden Carrot into a Potion of Darwinism I in a Brewing Stand.",
        "Kinetic Sprint: Sprinting > 50 ticks applies Movement Speed III (Amplifier 2).",
        "Kinetic Jump: Sneak + On Ground applies Jump Boost VI.",
        "Ocular Sight: Ambient light level <= 3 applies Night Vision I.",
        "Anti-Devolution Protocol: Rejects consumption of Tier I potions."
      ]
    },
    {
      id: "darwinism_3_bottle",
      name: "Potion of Darwinism III",
      category: "serum",
      isUpdated: true,
      desc: "Tier III Apex formulation of Darwin's Serum. Distilled from Darwinism II using an Enchanted Golden Apple. Integrates combat adrenaline scaling, threat blast shielding, step height enhancement, and genomic permanence.",
      stats: [
        { label: "Base Duration", value: "3:00 Minutes (or Permanent)" },
        { label: "Max Health", value: "+8.0 (+4 Hearts)" },
        { label: "Step Height", value: "1.0 Block" },
        { label: "Oxygen Bonus", value: "+0.5" },
        { label: "Submerged Mining Speed", value: "+0.6" },
        { label: "Knockback Resistance", value: "+0.2" }
      ],
      notes: [
        "Brewed by distilling an Enchanted Golden Apple into a Potion of Darwinism II in a Brewing Stand.",
        "Dynamic Adrenaline: Damage intake adds +2 adrenaline (max 15), scaling Regeneration (Math.round(adrenaline / 3)) that decays at 0.05/tick.",
        "Threat Blast Shield: Automatically grants Resistance IV/V when explosive entities are detected within a 6-block radius.",
        "Genomic Permanence: Consuming 4–7 bottles permanently locks Darwinism III until cured by 7 Potions of Milk or player death."
      ]
    },
    {
      id: "milk_bottle",
      name: "Potion of Milk",
      category: "utility",
      isUpdated: true,
      desc: "Potion of Milk distilled from Darwinism I using a Fermented Spider Eye. Clears active mob effects and neutralizes permanent Darwinism DNA alterations upon repeated consumption.",
      stats: [
        { label: "Use Type", value: "Instant Consumable" },
        { label: "Effect", value: "Clears All Active Status Effects" },
        { label: "Permanent Cure Threshold", value: "7 Consumptions" },
        { label: "Brewing Reagent", value: "Fermented Spider Eye + Darwinism I" }
      ],
      notes: [
        "Brewed in a Brewing Stand by distilling a Fermented Spider Eye into a Potion of Darwinism I.",
        "Consuming 7 bottles resets permanent DNA alteration (isDarwinismPermanent = false).",
        "Also available in Splash Potion of Milk, Lingering Potion of Milk, and Arrow of Milk variants."
      ]
    },
    {
      id: "splash_darwinism",
      name: "Splash Potion of Darwinism",
      category: "serum",
      isUpdated: true,
      desc: "Splash formulation of Darwin's Serum. Thrown projectile that shatters on impact to apply the active serum effect to all entities within splash radius.",
      stats: [
        { label: "Delivery Method", value: "Thrown Area Splash" },
        { label: "Brewing Reagent", value: "Gunpowder + Potion of Darwinism" },
        { label: "Stack Size", value: "1 Bottle" }
      ],
      notes: [
        "Brewed by combining a Potion of Darwinism with Gunpowder in a Brewing Stand.",
        "Applies Darwin's Serum to target players or entities in the impact radius."
      ]
    },
    {
      id: "lingering_darwinism",
      name: "Lingering Potion of Darwinism",
      category: "serum",
      isUpdated: true,
      desc: "Lingering aerosol cloud containing Darwin's Serum. Creates a persistent effect cloud that applies serum effects to entities entering its radius.",
      stats: [
        { label: "Delivery Method", value: "Persistent Cloud" },
        { label: "Brewing Reagent", value: "Dragon's Breath + Splash Darwinism" },
        { label: "Crafting Use", value: "Used to craft Tipped Arrows of Darwinism" }
      ],
      notes: [
        "Brewed by combining a Splash Potion of Darwinism with Dragon's Breath in a Brewing Stand.",
        "Used as the center ingredient in the crafting recipe for Arrows of Darwinism."
      ]
    },
    {
      id: "arrow_darwinism",
      name: "Arrow of Darwinism",
      category: "projectiles",
      isUpdated: true,
      desc: "Tipped projectile arrow infused with Darwin's Serum. Delivers standard arrow projectile damage and applies Darwinism to the struck entity.",
      stats: [
        { label: "Crafting Yield", value: "8 Arrows per Lingering Potion" },
        { label: "Stack Size", value: "64 Arrows" },
        { label: "Recipe", value: "8 Arrows surrounding 1 Lingering Darwinism" }
      ],
      notes: [
        "Crafted in a Crafting Table with 8 standard Arrows surrounding 1 Lingering Potion of Darwinism.",
        "Applies Darwin's Serum to targets at range upon impact."
      ]
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedItem = items.find(i => i.id === selectedItemId) || filteredItems[0] || items[0];

  return (
    <div className="space-y-8 py-2 select-text">
      
      {/* Search and Category Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter potions, reagents, or stats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b101d] border border-[#1e293b] rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-sky-500 text-[#070a13] font-bold' 
                    : 'bg-[#0b101d] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left List */}
        <div className="md:col-span-5 space-y-2">
          {filteredItems.map(item => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <UpdatedFrame key={item.id} id={`item_item_${item.id}`} isUpdated={true}>
                <div
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'bg-[#0e192e] border-sky-400' 
                      : 'bg-[#070a13] border-[#1e293b] hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-0.5">
                    <h4 className={`font-serif text-sm font-bold ${isSelected ? 'text-sky-300' : 'text-slate-200'}`}>
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-sky-400">
                    Inspect &rarr;
                  </div>
                </div>
              </UpdatedFrame>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-[#1e293b] rounded-xl">
              No potions or items match query.
            </div>
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="md:col-span-7">
          {selectedItem && (
            <div className="bg-[#0b101d] border border-[#1e293b] rounded-xl p-6 space-y-6 relative overflow-hidden">
              <div className="space-y-2 border-b border-[#1e293b] pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#131c31] text-sky-300 border border-[#253655] uppercase">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">ID: darwinism:{selectedItem.id}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-100">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedItem.desc}
                </p>
              </div>

              {/* Stats Grid */}
              {selectedItem.stats && selectedItem.stats.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {selectedItem.stats.map((s, idx) => (
                      <div key={idx} className="p-2.5 bg-[#070a13] border border-[#1e293b] rounded-lg">
                        <span className="text-slate-500 block text-[10px]">{s.label}</span>
                        <span className="text-slate-200 font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipe View */}
              <FancyRecipeView itemIds={[selectedItem.id]} title="Synthesis & Brewing Recipe" />

              {/* Notes */}
              {selectedItem.notes && selectedItem.notes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                    Procedure & Mechanics Notes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
                    {selectedItem.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-400 select-none">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
