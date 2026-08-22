import { WikiArticle } from '../types';

export const WIKI_ARTICLES: WikiArticle[] = [
  { slug: 'home', title: 'Home', category: 'Core Guide', filename: 'Home.tsx', order: 1 },
  { slug: 'serum-overview', title: "Darwin's Serum Mechanics", category: 'Core Guide', filename: 'SerumOverview.tsx', order: 2 },
  { slug: 'biological-adaptations', title: 'Biological Adaptations', category: 'Core Guide', filename: 'BiologicalAdaptations.tsx', order: 3 },
  { slug: 'serum-tiers', title: 'Serum Tiers & Formulations', category: 'Serum & Science', filename: 'SerumTiers.tsx', order: 4 },
  { slug: 'items', title: 'Potion & Item Registry', category: 'Serum & Science', filename: 'Items.tsx', order: 5 },
  { slug: 'recipes', title: 'Brewing & Crafting Recipes', category: 'Serum & Science', filename: 'Recipes.tsx', order: 6 },
  { slug: 'versions', title: 'Version History', category: 'Changelog', filename: 'Versions.tsx', order: 7 }
];

export function getWikiArticles(): WikiArticle[] {
  return WIKI_ARTICLES;
}

export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return WIKI_ARTICLES.find(a => a.slug === slug);
}

/**
 * Static full-text search database across all Darwinism articles for instantaneous,
 * offline deep search across serum effects, adaptations, brewing recipes, and items.
 */
export const WIKI_SEARCH_DATABASE: Record<string, string> = {
  home: `
    Darwinism Minecraft Mod Official Field Guide
    Darwin Serum Adaptation System
    Realtime Physiological Mutation Environmental Triggers
    Locomotion Hyper Mobility Sprinting Acceleration
    Cellular Hardening Scaling Regeneration Damage Reaction
    Sub-Visual Sight Ocular Adaptation Darkness Threshold
    Aquatic Drowning Protection Swift Swim Water Breathing
    Thermal Lava Adaptation Fire Resistance
    Potion of Darwinism Tier I Tier II Tier III
    Potion of Milk Genome Stabilizer
    Tipped Arrows Splash Lingering
  `,
  'serum-overview': `
    Darwin Serum Core Mechanics
    Active Physiological Response
    Sprinting Acceleration Hyper Mobility
    Damage Scaling Regeneration Cellular Hardening
    Darkness Activation Night Vision Ocular Adaptation
    Drowning Submersion Water Breathing Swift Swim
    Thermal Protection Lava Fire Resistance
    Tier 1 Mild Adaptation Tier 2 Amplified Mutation Tier 3 Apex Human Limits Exceeded
  `,
  'biological-adaptations': `
    Biological Adaptations Triggers Thresholds
    Locomotion Mutation Sprinting continuous speed boost acceleration
    Cellular Hardening Taking damage triggers regeneration scales with injury severity
    Sub-Visual Ocular Sight Stepping into dark caves/night automatically grants night vision
    Aquatic Propulsion Drowning damage submersed in water grants water breathing swift swimming
    Pyrogenic Defense High temperatures lava grants fire resistance
  `,
  'serum-tiers': `
    Serum Tier Formulations Brewing Recipes
    Tier I Darwinism Basic physiological responses
    Tier II Darwinism Amplified scaling response multi-adaptation
    Tier III Darwinism Apex formulation complete environmental immunity
    Potion of Milk Genome Neutralizer
  `,
  items: `
    Potion of Darwinism I II III
    Splash Potion of Darwinism I II III
    Lingering Potion of Darwinism I II III
    Arrow of Darwinism I II III
    Potion of Milk
  `,
  recipes: `
    Brewing Recipes
    Awkward Potion Fermented Spider Eye
    Glowstone Dust Dragons Breath Echo Shard Heavy Core Nether Star
    Brewing Stand Reagents
  `,
  versions: `
    Version History Release Notes
    NeoForge Forge 1.20.1 1.21.1 1.21.8
    Adaptive Regeneration Night Vision Speed Acceleration
  `
};
