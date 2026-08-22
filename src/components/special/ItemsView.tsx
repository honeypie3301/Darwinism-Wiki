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
      desc: "Tier I formulation of Darwin's Serum. Triggers real-time biological adaptations responding to sprinting, physical damage, low light, and water submersion.",
      stats: [
        { label: "Base Duration", value: "3:00 Minutes" },
        { label: "Attribute: Speed", value: "+20% generic.movement_speed (+0.02 base)" },
        { label: "Attribute: Regen", value: "Regeneration I (+0.5 HP/sec on damage)" },
        { label: "Ocular Threshold", value: "Night Vision in darkness (< 7 light)" },
        { label: "Aquatic Trigger", value: "Water Breathing upon drowning" }
      ],
      notes: [
        "Brewed in a Brewing Stand by distilling a Fermented Spider Eye into an Awkward Potion.",
        "Tier I serves as the baseline adaptation profile for all primary environmental triggers.",
        "Dynamic effect: the potion adapts to your surroundings instead of granting static buffs."
      ]
    },
    {
      id: "darwinism_2_bottle",
      name: "Potion of Darwinism II",
      category: "serum",
      isUpdated: true,
      desc: "Tier II amplified Darwin's Serum. Exactly doubles Level 1 attribute stats, granting +40% speed, 2x regeneration recovery rate, swift swimming, and thermal fire resistance.",
      stats: [
        { label: "Base Duration", value: "5:00 Minutes" },
        { label: "Attribute: Speed", value: "+40% generic.movement_speed (2.0x Level 1)" },
        { label: "Attribute: Regen", value: "Regeneration II (+1.0 HP/sec - 2.0x Level 1)" },
        { label: "Thermal Trigger", value: "Fire Resistance (100% lava/heat immunity)" },
        { label: "Aquatic Trigger", value: "Water Breathing + Swift Swim II (2x velocity)" }
      ],
      notes: [
        "Brewed by upgrading Potion of Darwinism I with Glowstone Dust in a Brewing Stand.",
        "Tier II doubles Level 1 stats across locomotion velocity (+40% vs +20%) and cellular recovery (+1.0 HP/s vs +0.5 HP/s).",
        "Unlocks full Fire Resistance and thermal adaptation upon entering lava or flame hazards."
      ]
    },
    {
      id: "darwinism_3_bottle",
      name: "Potion of Darwinism III",
      category: "serum",
      isUpdated: true,
      desc: "Tier III Apex formulation of Darwin's Serum. Triples Level 1 attribute stats (+60% speed, 3x regeneration + Resistance II), providing complete multi-environmental response.",
      stats: [
        { label: "Base Duration", value: "8:00 Minutes" },
        { label: "Attribute: Speed", value: "+60% generic.movement_speed (3.0x Level 1 / 1.5x Level 2)" },
        { label: "Attribute: Regen", value: "Regeneration III (+1.5 HP/sec - 3.0x Level 1) & Resistance II" },
        { label: "Ocular Trigger", value: "Sub-Visual Sight + True Blindness Immunity" },
        { label: "Environmental", value: "Complete Thermal, Aquatic, and Fall Damage Immunity" }
      ],
      notes: [
        "Apex tier formulation created by combining Potion of Darwinism II with Dragon's Breath.",
        "Triples Level 1 stats across speed (+60%), cellular regeneration (+1.5 HP/s), and grants Resistance II (+4 Armor Toughness).",
        "Provides total immunity to fall damage, drowning, thermal lava burns, and blindness."
      ]
    },
    {
      id: "milk_bottle",
      name: "Potion of Milk",
      category: "utility",
      isUpdated: true,
      desc: "Pure, purified milk distilled into a portable potion bottle. Serves as a genome stabilizer to instantly purge active serum mutations and restore biological baseline.",
      stats: [
        { label: "Use Type", value: "Instant Consumable" },
        { label: "Effect", value: "Purges All Status Effects / Serum Mutations" },
        { label: "Stack Size", value: "16 Bottles" },
        { label: "Brewing Reagent", value: "Milk Bucket + Glass Bottle" }
      ],
      notes: [
        "Easier to carry in stacks than heavy milk buckets.",
        "Allows swift removal of undesired potion effects during intense encounters.",
        "Also available in Splash Potion of Milk and Lingering Potion of Milk forms."
      ]
    },
    {
      id: "splash_darwinism",
      name: "Splash Potion of Darwinism",
      category: "serum",
      isUpdated: true,
      desc: "Volatile splash bottle containing Darwin's Serum. Shatters on impact to instantly imbue an area or target entities with adaptive biological responses.",
      stats: [
        { label: "Delivery Method", value: "Thrown Area Effect" },
        { label: "Radius", value: "4.15 Blocks" },
        { label: "Duration Efficiency", value: "75% of Drank Duration" }
      ],
      notes: [
        "Brewed by combining any Potion of Darwinism with Gunpowder in a Brewing Stand.",
        "Great for instantly applying adaptive buffs to team members during combat."
      ]
    },
    {
      id: "lingering_darwinism",
      name: "Lingering Potion of Darwinism",
      category: "serum",
      isUpdated: true,
      desc: "Aerosolized persistent cloud of Darwin's Serum. Creates a lingering mutation zone where passing entities continuously refresh adaptive responses.",
      stats: [
        { label: "Delivery Method", value: "Lingering Aerosol Cloud" },
        { label: "Cloud Lifetime", value: "30 Seconds" },
        { label: "Re-application", value: "Refreshes duration every tick on contact" }
      ],
      notes: [
        "Brewed by combining a Splash Potion of Darwinism with Dragon's Breath.",
        "Ideal for establishing defensive chokepoints or boss arenas."
      ]
    },
    {
      id: "arrow_darwinism",
      name: "Arrow of Darwinism",
      category: "projectiles",
      isUpdated: true,
      desc: "Tipped projectile arrow saturated with Darwin's Serum. Imbues hit targets with adaptive biological responses or temporary overload.",
      stats: [
        { label: "Crafting Yield", value: "8 Tipped Arrows per Lingering Potion" },
        { label: "Base Damage", value: "Standard Arrow Damage + Serum Effect" }
      ],
      notes: [
        "Crafted around a Lingering Potion of Darwinism using 8 Arrows in a Crafting Table.",
        "Ranged delivery mechanism for long-distance buffing or strategic targeting."
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
            className="w-full bg-[#0b101d] border border-[#1e293b] rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer
                  ${isSelected 
                    ? 'bg-sky-500 text-[#070a13] shadow-md shadow-sky-500/20' 
                    : 'bg-[#0b101d] text-slate-400 border border-[#1e293b] hover:text-slate-100 hover:border-sky-500/40'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Grid of Items & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Item Selector Grid */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-sky-400/80 uppercase tracking-wider font-semibold">
            Registry Index ({filteredItems.length})
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredItems.map(item => {
              const isSelected = selectedItem.id === item.id;
              return (
                <UpdatedFrame key={item.id} id={`item_btn_${item.id}`} isUpdated={!!item.isUpdated}>
                  <button
                    onClick={() => setSelectedItemId(item.id)}
                    className={`
                      w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5
                      ${isSelected 
                        ? 'bg-[#0e192e] border-sky-400 shadow-md shadow-sky-500/10' 
                        : 'bg-[#070a13] border-[#1e293b] hover:border-slate-700 hover:bg-[#0b101d]'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-serif text-sm font-bold ${isSelected ? 'text-sky-200' : 'text-slate-200'}`}>
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131c31] text-sky-300 border border-[#253655] uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                </UpdatedFrame>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="p-8 text-center bg-[#070a13] border border-[#1e293b] rounded-xl text-slate-500 text-xs font-serif italic">
                No items match query
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Item Dossier */}
        {selectedItem && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0b101d] border border-[#1e293b] rounded-xl p-6 space-y-6 shadow-xl relative overflow-hidden">
              
              {/* Header */}
              <div className="border-b border-[#1e293b] pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                    {selectedItem.category} Dossier
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-100 mt-0.5">
                    {selectedItem.name}
                  </h3>
                </div>
                <div className="px-3 py-1 bg-sky-950/60 border border-sky-400/40 text-sky-200 rounded-lg text-xs font-mono font-semibold">
                  {selectedItem.id}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedItem.desc}
              </p>

              {/* Operational Stats Table */}
              {selectedItem.stats && selectedItem.stats.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-sky-300 uppercase tracking-wider font-semibold">
                    Physiological & Item Stats
                  </h4>
                  <div className="bg-[#070a13] border border-[#1e293b] rounded-lg divide-y divide-[#1e293b] overflow-hidden">
                    {selectedItem.stats.map((st, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 text-xs">
                        <span className="text-slate-400 font-mono">{st.label}</span>
                        <span className="text-sky-200 font-semibold text-right">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedItem.notes && selectedItem.notes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-sky-300 uppercase tracking-wider font-semibold">
                    Field Notes & Behavior
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 bg-[#070a13] p-4 border border-[#1e293b] rounded-lg">
                    {selectedItem.notes.map((note, nIdx) => (
                      <li key={nIdx} className="leading-relaxed">{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recipe Visualization Component */}
              <div className="pt-2 border-t border-[#1e293b]">
                <FancyRecipeView itemIds={[selectedItem.id]} title="Synthesis & Brewing Recipe" />
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
