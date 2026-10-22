import React, { useState } from 'react';
import { Hammer, Flame, Scissors, Sparkles, RefreshCw } from 'lucide-react';
import recipeDataRaw from '@/recipe_details.json';

// Type declarations for our recipe structure
interface RecipeDetails {
  file: string;
  type: string;
  outputCount: number;
  pattern: string[] | null;
  keyMap: Record<string, { item?: string; tag?: string }> | null;
  ingredients: string[];
}

const recipeDetails = recipeDataRaw as Record<string, RecipeDetails[]>;

interface FancyRecipeViewProps {
  itemIds: string[];
  title?: string;
}

interface VisualSpec {
  short: string;
  name: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  glowClass: string;
}

// Visual spec helper for Minecraft / Darwinism items
function getItemVisualSpec(rawId: string): VisualSpec {
  if (!rawId) {
    return {
      short: '',
      name: '',
      bgClass: 'bg-[#070a13]',
      textClass: 'text-slate-400',
      borderClass: 'border-[#1e293b]',
      glowClass: 'shadow-none'
    };
  }
  
  const cleanId = rawId.replace('the_backwoods:', '').replace('minecraft:', '').toLowerCase();
  const displayName = cleanId
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Mapping for Darwinism materials and vanilla reagents
  const mapping: Record<string, { short: string; bg: string; text: string; border: string; glow: string }> = {
    'darwinism_1_bottle': { short: 'D1', bg: 'bg-[#0c192e]', text: 'text-[#7dd3fc]', border: 'border-[#1e3a5f]', glow: 'group-hover:shadow-[0_0_8px_rgba(56,189,248,0.2)]' },
    'darwinism_2_bottle': { short: 'D2', bg: 'bg-[#0a2140]', text: 'text-[#38bdf8]', border: 'border-[#2563eb]', glow: 'group-hover:shadow-[0_0_8px_rgba(56,189,248,0.25)]' },
    'darwinism_3_bottle': { short: 'D3', bg: 'bg-[#082b54]', text: 'text-[#93c5fd]', border: 'border-[#3b82f6]', glow: 'group-hover:shadow-[0_0_10px_rgba(147,197,253,0.3)]' },
    'milk_bottle': { short: 'Mb', bg: 'bg-[#1e293b]', text: 'text-slate-100', border: 'border-slate-500', glow: 'group-hover:shadow-[0_0_6px_rgba(255,255,255,0.15)]' },
    'splash_darwinism': { short: 'SD', bg: 'bg-[#0f2847]', text: 'text-[#7dd3fc]', border: 'border-[#1d4ed8]', glow: 'group-hover:shadow-[0_0_8px_rgba(56,189,248,0.2)]' },
    'lingering_darwinism': { short: 'LD', bg: 'bg-[#172554]', text: 'text-[#a5f3fc]', border: 'border-[#0284c7]', glow: 'group-hover:shadow-[0_0_8px_rgba(165,243,252,0.2)]' },
    'arrow_darwinism': { short: 'AD', bg: 'bg-[#0f172a]', text: 'text-sky-300', border: 'border-sky-600', glow: '' },
    'nautilus_shell': { short: 'Ns', bg: 'bg-[#0c242a]', text: 'text-teal-300', border: 'border-teal-700', glow: '' },
    'golden_carrot': { short: 'Gc', bg: 'bg-[#292209]', text: 'text-amber-300', border: 'border-amber-600', glow: '' },
    'enchanted_golden_apple': { short: 'Ega', bg: 'bg-[#281836]', text: 'text-purple-300', border: 'border-purple-600', glow: 'group-hover:shadow-[0_0_6px_rgba(216,180,254,0.2)]' },
    'fermented_spider_eye': { short: 'Fse', bg: 'bg-[#21090a]', text: 'text-rose-400', border: 'border-rose-800', glow: '' },
    'glowstone_dust': { short: 'Gd', bg: 'bg-[#2e2610]', text: 'text-amber-300', border: 'border-amber-600', glow: '' },
    'dragon_breath': { short: 'Db', bg: 'bg-[#220d1c]', text: 'text-pink-400', border: 'border-pink-700', glow: '' },
    'gunpowder': { short: 'Gp', bg: 'bg-[#18181b]', text: 'text-zinc-400', border: 'border-zinc-600', glow: '' },
    'awkward_potion': { short: 'Awk', bg: 'bg-[#1e1b4b]', text: 'text-indigo-300', border: 'border-indigo-600', glow: '' },
    'milk_bucket': { short: 'Mbk', bg: 'bg-[#1e293b]', text: 'text-slate-100', border: 'border-slate-400', glow: '' },
    'glass_bottle': { short: 'Gb', bg: 'bg-[#0b131a]', text: 'text-sky-400', border: 'border-sky-800', glow: '' },
    'arrow': { short: 'Arr', bg: 'bg-[#1c1917]', text: 'text-stone-300', border: 'border-stone-600', glow: '' }
  };

  if (mapping[cleanId]) {
    return {
      short: mapping[cleanId].short,
      name: displayName,
      bgClass: mapping[cleanId].bg,
      textClass: mapping[cleanId].text,
      borderClass: mapping[cleanId].border,
      glowClass: mapping[cleanId].glow
    };
  }

  // Automatic abbreviation rules
  const words = cleanId.split('_');
  let abbrev = '';
  if (words.length >= 3) {
    abbrev = (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
  } else if (words.length === 2) {
    abbrev = (words[0][0] + words[1][0]).toUpperCase();
  } else if (cleanId.length > 0) {
    abbrev = cleanId[0].toUpperCase() + (cleanId[1] || '').toLowerCase();
  } else {
    abbrev = '?';
  }

  // Fallback styling: pastel dark blue
  return {
    short: abbrev,
    name: displayName,
    bgClass: 'bg-[#0b101d]',
    textClass: 'text-sky-300',
    borderClass: 'border-[#1e293b]',
    glowClass: 'group-hover:shadow-[0_0_8px_rgba(56,189,248,0.2)]'
  };
}

function getCleanName(rawId: string): string {
  if (!rawId) return '';
  let name = rawId.replace('the_backwoods:', '').replace('minecraft:', '');
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const itemIdMapping: Record<string, string> = {
  'darwinism_1_bottle': 'the_backwoods:darwinism_1_bottle',
  'darwinism_2_bottle': 'the_backwoods:darwinism_2_bottle',
  'darwinism_3_bottle': 'the_backwoods:darwinism_3_bottle',
  'milk_bottle': 'the_backwoods:milk_bottle',
  'splash_darwinism': 'the_backwoods:splash_darwinism',
  'lingering_darwinism': 'the_backwoods:lingering_darwinism',
  'arrow_darwinism': 'the_backwoods:arrow_darwinism'
};

export default function FancyRecipeView({ itemIds, title }: FancyRecipeViewProps) {
  const [activeRecipeIndex, setActiveRecipeIndex] = useState<Record<string, number>>({});

  const itemsWithRecipes = itemIds
    .map(id => {
      const cleanId = id.startsWith('the_backwoods:') ? id.replace('the_backwoods:', '') : id;
      const mappedId = itemIdMapping[cleanId] || id;
      const normalizedId = mappedId.startsWith('the_backwoods:') ? mappedId : `the_backwoods:${mappedId}`;
      const recipes = recipeDetails[normalizedId] || [];
      return { id: normalizedId, name: getCleanName(normalizedId), recipes };
    })
    .filter(item => item.recipes.length > 0);

  if (itemsWithRecipes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mt-4 select-text">
      {title && (
        <h4 className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-3 flex items-center gap-1.5 font-bold">
          <Hammer className="w-3.5 h-3.5" />
          {title}
        </h4>
      )}

      <div className="space-y-4">
        {itemsWithRecipes.map(item => {
          const recipes = item.recipes;
          const currentIndex = activeRecipeIndex[item.id] || 0;
          const recipe = recipes[currentIndex];
          if (!recipe) return null;

          const isMultiRecipe = recipes.length > 1;

          const isBrewing = recipe.type.includes('brewing') || recipe.type.includes('brew');
          const isSmelting = recipe.type.includes('smelting');
          const isStonecutting = recipe.type.includes('stonecutting');

          const outputSpec = getItemVisualSpec(item.id);

          return (
            <div 
              key={item.id} 
              className="bg-[#070a13] border border-[#1e293b] rounded-xl p-4 sm:p-5 relative transition-all hover:border-sky-500/40"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-2xl rounded-full" />
              </div>

              {/* Recipe Header */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#1e293b]">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                    {recipe.type.replace('minecraft:', '').replace('_', ' ').toUpperCase()}
                  </span>
                  <h5 className="font-serif text-sm font-bold text-slate-100 mt-0.5">
                    {item.name} <span className="text-xs text-slate-400 font-normal font-sans">(Yield: x{recipe.outputCount})</span>
                  </h5>
                </div>

                {isMultiRecipe && (
                  <button
                    onClick={() => {
                      const nextIdx = (currentIndex + 1) % recipes.length;
                      setActiveRecipeIndex(prev => ({ ...prev, [item.id]: nextIdx }));
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono bg-[#0b101d] border border-[#1e293b] text-sky-400 rounded hover:text-sky-300 hover:border-sky-400 transition-all cursor-pointer select-none"
                  >
                    <RefreshCw className="w-3 h-3 animate-spin-hover" />
                    Recipe {currentIndex + 1}/{recipes.length}
                  </button>
                )}
              </div>

              {/* Visual Assembly Stage */}
              <div className="flex flex-col gap-4">
                <div className="w-full py-4 px-4 sm:px-6 bg-[#0b101d]/60 rounded-lg border border-[#1e293b] relative z-10 flex justify-center items-center">
                  <div className="w-full max-w-sm flex justify-center items-center">
                    {isBrewing ? (
                      <div className="flex items-center gap-3 sm:gap-4 flex-nowrap justify-center w-full">
                        {/* Ingredient / Catalyst */}
                        {(() => {
                          const rawInput = recipe.ingredients[0] || '';
                          const spec = getItemVisualSpec(rawInput);
                          return (
                            <div className="relative group shrink-0 hover:z-30" title={spec.name}>
                              <div className="text-[8px] font-mono text-sky-400/80 uppercase tracking-wider mb-1 text-center font-semibold">Reagent</div>
                              <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border rounded-lg flex flex-col items-center justify-center p-1 shadow-inner transition-all duration-200 cursor-help ${spec.bgClass} ${spec.borderClass} ${spec.textClass} ${spec.glowClass} hover:border-sky-400 shrink-0`}>
                                <span className="text-[9px] sm:text-[10px] font-mono font-bold">{spec.short}</span>
                              </div>
                              <div className="opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#070a13] border border-[#1e293b] text-xs font-mono p-2 rounded shadow-2xl z-50 flex flex-col items-center gap-0.5 min-w-[120px] whitespace-nowrap">
                                <span className="text-sky-300 font-bold font-serif text-center">{spec.name}</span>
                                <span className="text-[9px] text-slate-400 uppercase tracking-wider">{rawInput}</span>
                              </div>
                            </div>
                          );
                        })()}

                        <div className="flex flex-col items-center text-sky-400 animate-pulse shrink-0 mt-4">
                          <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-sky-400/20" />
                          <span className="text-[7px] sm:text-[8px] font-mono text-sky-300 mt-0.5 uppercase tracking-wider">BREW</span>
                        </div>

                        {/* Base Bottle */}
                        {(() => {
                          const rawInput = recipe.ingredients[1] || '';
                          const spec = getItemVisualSpec(rawInput);
                          return (
                            <div className="relative group shrink-0 hover:z-30" title={spec.name}>
                              <div className="text-[8px] font-mono text-sky-400/80 uppercase tracking-wider mb-1 text-center font-semibold">Base</div>
                              <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border rounded-lg flex flex-col items-center justify-center p-1 shadow-inner transition-all duration-200 cursor-help ${spec.bgClass} ${spec.borderClass} ${spec.textClass} ${spec.glowClass} hover:border-sky-400 shrink-0`}>
                                <span className="text-[9px] sm:text-[10px] font-mono font-bold">{spec.short}</span>
                              </div>
                              <div className="opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#070a13] border border-[#1e293b] text-xs font-mono p-2 rounded shadow-2xl z-50 flex flex-col items-center gap-0.5 min-w-[120px] whitespace-nowrap">
                                <span className="text-sky-300 font-bold font-serif text-center">{spec.name}</span>
                                <span className="text-[9px] text-slate-400 uppercase tracking-wider">{rawInput}</span>
                              </div>
                            </div>
                          );
                        })()}

                        <div className="text-sky-400 font-bold text-sm sm:text-base select-none shrink-0 mt-4">→</div>

                        {/* Output Bottle */}
                        <div className="relative group shrink-0 hover:z-30" title={outputSpec.name}>
                          <div className="text-[8px] font-mono text-sky-400/80 uppercase tracking-wider mb-1 text-center font-semibold">Serum</div>
                          <div className={`w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 border-2 rounded-lg flex flex-col items-center justify-center p-1 shadow-inner transition-all duration-200 cursor-help ${outputSpec.bgClass} ${outputSpec.borderClass} ${outputSpec.textClass} ${outputSpec.glowClass} shrink-0`}>
                            <span className="text-xs sm:text-sm font-mono font-bold">{outputSpec.short}</span>
                          </div>
                          <span className="absolute bottom-0.5 right-0.5 bg-[#0b101d] border border-[#1e293b] px-1 text-[8px] sm:text-[9px] font-mono text-sky-300 font-bold rounded">
                            x{recipe.outputCount}
                          </span>
                          <div className="opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#070a13] border border-[#1e293b] text-xs font-mono p-2 rounded shadow-2xl z-50 flex flex-col items-center gap-0.5 min-w-[120px] whitespace-nowrap">
                            <span className="text-sky-300 font-bold font-serif text-center">{outputSpec.name}</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-wider">{item.id}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Standard Crafting Grid */
                      <div className="flex items-center gap-3 sm:gap-4 flex-nowrap justify-center w-full">
                        <div className="grid grid-cols-3 gap-1 bg-[#0b101d] p-2 rounded-xl border border-[#1e293b] shadow-inner shrink-0">
                          {(() => {
                            const pattern = recipe.pattern || ["abc", "def", "ghi"];
                            const isShapeless = recipe.type === 'minecraft:crafting_shapeless';
                            const cells = [];

                            if (isShapeless) {
                              for (let idx = 0; idx < 9; idx++) {
                                const ingredient = recipe.ingredients[idx];
                                if (ingredient) {
                                  const spec = getItemVisualSpec(ingredient);
                                  cells.push(
                                    <div key={idx} className="relative group shrink-0 hover:z-30" title={spec.name}>
                                      <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border rounded-lg flex flex-col items-center justify-center p-0.5 shadow-inner transition-all duration-200 cursor-help ${spec.bgClass} ${spec.borderClass} ${spec.textClass} ${spec.glowClass} hover:border-sky-400 shrink-0`}>
                                        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold">{spec.short}</span>
                                      </div>
                                      <div className="opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#070a13] border border-[#1e293b] text-xs font-mono p-2 rounded shadow-2xl z-50 flex flex-col items-center gap-0.5 min-w-[120px] whitespace-nowrap">
                                        <span className="text-sky-300 font-bold font-serif text-center">{spec.name}</span>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-wider">{ingredient}</span>
                                      </div>
                                    </div>
                                  );
                                } else {
                                  cells.push(
                                    <div key={idx} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#070a13] border border-[#1e293b] rounded-lg opacity-30 shrink-0" />
                                  );
                                }
                              }
                            } else {
                              for (let r = 0; r < 3; r++) {
                                const row = pattern[r] || '   ';
                                for (let c = 0; c < 3; c++) {
                                  const char = row[c] || ' ';
                                  if (char !== ' ') {
                                    const keyVal = recipe.keyMap?.[char];
                                    const fullItemName = keyVal?.item ? keyVal.item : char;
                                    const spec = getItemVisualSpec(fullItemName);
                                    cells.push(
                                      <div key={`${r}-${c}`} className="relative group shrink-0 hover:z-30" title={spec.name}>
                                        <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border rounded-lg flex flex-col items-center justify-center p-0.5 shadow-inner transition-all duration-200 cursor-help ${spec.bgClass} ${spec.borderClass} ${spec.textClass} ${spec.glowClass} hover:border-sky-400 shrink-0`}>
                                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold">{spec.short}</span>
                                        </div>
                                        <div className="opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#070a13] border border-[#1e293b] text-xs font-mono p-2 rounded shadow-2xl z-50 flex flex-col items-center gap-0.5 min-w-[120px] whitespace-nowrap">
                                          <span className="text-sky-300 font-bold font-serif text-center">{spec.name}</span>
                                          <span className="text-[9px] text-slate-400 uppercase tracking-wider">{fullItemName}</span>
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    cells.push(
                                      <div key={`${r}-${c}`} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#070a13] border border-[#1e293b] rounded-lg opacity-30 shrink-0" />
                                    );
                                  }
                                }
                              }
                            }
                            return cells;
                          })()}
                        </div>

                        <div className="text-sky-400 font-bold text-base sm:text-lg select-none animate-pulse shrink-0">→</div>

                        <div className="relative group shrink-0 hover:z-30" title={outputSpec.name}>
                          <div className={`w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 border-2 rounded-xl flex flex-col items-center justify-center p-1 shadow-inner transition-all duration-300 cursor-help ${outputSpec.bgClass} ${outputSpec.borderClass} ${outputSpec.textClass} ${outputSpec.glowClass} shrink-0`}>
                            <span className="text-xs sm:text-sm font-mono font-bold tracking-tight">{outputSpec.short}</span>
                          </div>
                          <span className="absolute bottom-0.5 right-0.5 bg-[#0b101d] border border-[#1e293b] px-1 py-0.5 text-[8px] sm:text-[9px] font-mono text-sky-300 font-bold rounded shadow-md z-10 select-none">
                            x{recipe.outputCount}
                          </span>
                          <div className="opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#070a13] border border-[#1e293b] text-xs font-mono p-2 rounded shadow-2xl z-50 flex flex-col items-center gap-0.5 min-w-[120px] whitespace-nowrap">
                            <span className="text-sky-300 font-bold font-serif text-center">{outputSpec.name}</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-wider">{item.id}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
