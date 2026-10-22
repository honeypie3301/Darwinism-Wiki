/**
 * CONSTANT REMINDER 1: AVOID NARRATIVE TONES
 * All descriptions must be factual, technical, and encyclopedic. Do not use storytelling prose.
 *
 * CONSTANT REMINDER 2: WIKI MAINTENANCE NOTE IS FOR MOD UPDATES ONLY
 * In-game mod mechanics and updates only. Never document wiki website changes.
 */
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
    Darwinism Minecraft Mod Field Guide
    Darwin's Serum System Attributes Procedures
    Kinetic Sprint Acceleration Movement Speed II III IV
    Adrenaline Dynamic Regeneration Damage Scaling
    Ocular Night Vision Light Threshold
    Charge High Jump Crouching Sneak Ground
    Threat Blast Shield Primed TNT Creeper Resistance
    Powder Snow Freeze Clamping Immunity
    Potion of Darwinism Tier I Tier II Tier III
    Potion of Milk Genome Neutralizer DNA Alteration
    Permanent DNA Mutation 4-7 bottles
    Anti Devolution Protocol Devolution Refused
    Tipped Arrows Splash Lingering
  `,
  'serum-overview': `
    Darwin Serum Core Mechanics
    Active Physiological Response Engine
    Sprinting Acceleration Tick Counter > 50 60 ticks
    Combat Adrenaline Dynamic Regeneration Math.round(adrenaline / 3)
    Emergency Low Health Resistance IV Regeneration V
    Ambient Raw Brightness <= 4 <= 3 Night Vision
    Powder Snow Freeze Ticks Clamped Immunity
    Threat Blast Shield TNT Creeper Minecart Resistance IV V
    Step Height 1.0 Block Traversal
    Static MobEffect Attributes Attack Damage Safe Fall Distance Burning Time
  `,
  'biological-adaptations': `
    Biological Adaptations Triggers Thresholds
    Locomotion Movement Speed II III IV Jump Boost IV VI VIII
    Cellular Regeneration Adrenaline Scaling Emergency Overdrive
    Ocular Night Vision Raw Brightness Detection
    Threat Blast Shield Explosive Proximity Detection 6 blocks
    Cryo Insulation Powder Snow Suppression
    Step Height 1.0 Full Block Ascend
    Genomic Permanence isDarwinismPermanent
    Anti-Devolution Protocol Downgrade Rejection
  `,
  'serum-tiers': `
    Serum Tier Formulations Brewing Recipes
    Tier I Nautilus Shell Awkward Potion 3:00 minutes
    Tier II Golden Carrot Potion of Darwinism I 3:00 minutes
    Tier III Enchanted Golden Apple Potion of Darwinism II 3:00 minutes permanent
    Potion of Milk Fermented Spider Eye Potion of Darwinism I
    Static Modifiers Dynamic Scaling
  `,
  items: `
    Potion of Darwinism I II III
    Splash Potion of Darwinism I II III
    Lingering Potion of Darwinism I II III
    Arrow of Darwinism I II III
    Potion of Milk Splash Lingering Arrow
    Nautilus Shell Golden Carrot Enchanted Golden Apple Fermented Spider Eye
  `,
  recipes: `
    Brewing Stand Crafting Table Recipes
    Nautilus Shell Awkward Potion Darwinism 1
    Golden Carrot Darwinism 1 Darwinism 2
    Enchanted Golden Apple Darwinism 2 Darwinism 3
    Fermented Spider Eye Darwinism 1 Milk Bottle
    Gunpowder Splash Potion
    Dragon's Breath Lingering Potion
    Arrow Lingering Potion Tipped Arrow of Darwinism
  `,
  versions: `
    Version History Release Notes Changelog
    NeoForge 1.21.8 1.21.1 1.20.1
    Darwinism 1.4.1 1.3.1 1.3.0 1.2.0 1.1.0 1.0.0
    Modrinth Downloads Direct Jar Download
    Attribute migration permanent DNA alteration
  `
};
