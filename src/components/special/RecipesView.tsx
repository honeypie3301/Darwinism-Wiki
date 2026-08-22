import React from 'react';
import { Hammer, Sparkles, FlaskConical } from 'lucide-react';
import FancyRecipeView from './FancyRecipeView';
import UpdatedFrame from '../UpdatedFrame';

export default function RecipesView() {
  const allRecipeItemIds = [
    'darwinism_1_bottle',
    'darwinism_2_bottle',
    'darwinism_3_bottle',
    'milk_bottle',
    'splash_darwinism',
    'lingering_darwinism',
    'arrow_darwinism'
  ];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto text-slate-300 select-text">
      
      {/* Intro */}
      <div className="p-6 bg-[#070a13] border border-[#1e293b] rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase font-bold tracking-wider">
          <Hammer className="w-4 h-4 text-sky-400" />
          <span>Brewing Stand & Crafting Manual</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
          Brewing & Synthesis Recipes
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Interactive recipe grid displaying all brewing stand and crafting table synthesis paths for Darwinism potions and items.
        </p>
      </div>

      {/* Fancy Recipe View Component */}
      <UpdatedFrame id="recipes_page_assembly" isUpdated={true}>
        <div className="p-6 bg-[#0b101d] border border-[#1e293b] rounded-xl space-y-6">
          <FancyRecipeView itemIds={allRecipeItemIds} title="Darwinism Complete Recipe Catalog" />
        </div>
      </UpdatedFrame>

    </div>
  );
}
