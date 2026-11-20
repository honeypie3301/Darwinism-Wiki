import { WikiArticle } from '../types';

export const WIKI_ARTICLES: WikiArticle[] = [
  { slug: 'home', title: 'Home', category: 'Core Guide', filename: 'Home.tsx', order: 1 },
  { slug: 'mechanics', title: 'Evolution Mechanics', category: 'Core Guide', filename: 'Mechanics.tsx', order: 2 },
  { slug: 'versions', title: 'Version History', category: 'Core Guide', filename: 'Versions.tsx', order: 3 },
  { slug: 'items', title: 'Potions & Brewing', category: 'Content & Data', filename: 'Items.tsx', order: 4 },
  { slug: 'acquisition', title: 'Permanence & Cure', category: 'Content & Data', filename: 'Acquisition.tsx', order: 5 },
  { slug: 'technical', title: 'Mod Specs & Compatibility', category: 'Technical', filename: 'Technical.tsx', order: 6 }
];

export function getWikiArticles(): WikiArticle[] {
  return WIKI_ARTICLES;
}

export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return WIKI_ARTICLES.find(a => a.slug === slug);
}

/**
 * Static full-text search database across all articles for instantaneous,
 * offline, 100% independent deep search across effects, brewing recipes,
 * adrenaline scaling, permanence, milk cure, and mod metadata.
 */
export const WIKI_SEARCH_DATABASE: Record<string, string> = {
  home: `
    Darwinism Darwin's Serum Minecraft NeoForge 1.21.1 1.21.8 Forge 1.20.1 Mod Field Guide
    Adaptive bio-serum Potion of Darwinism Tier I II III Potion of Milk
    Night Vision Speed Jump Boost Adrenaline Regeneration Blast Resistance
    Permanent DNA alteration Milk cure 7 bottles honeypie_3301 MCreator GPLv3 v1.4.1
  `,
  mechanics: `
    Evolution Mechanics DarwinismMobEffect Darwinism2MobEffect Darwinism3MobEffect
    Attribute Modifiers ATTACK_KNOCKBACK ATTACK_DAMAGE BLOCK_BREAK_SPEED BURNING_TIME
    SAFE_FALL_DISTANCE EXPLOSION_KNOCKBACK_RESISTANCE MAX_HEALTH OXYGEN_BONUS
    SUBMERGED_MINING_SPEED KNOCKBACK_RESISTANCE STEP_HEIGHT
    Night Vision Darkness Light Level <= 4 <= 3
    Kinetic Sprint Speed II Speed III Speed IV sprintCounter 50 60 food exhaustion -0.05
    Charge Jump Crouch Sneak On Ground Jump Boost IV VI VIII
    Adrenaline DynamicRegenerationProcedure LivingIncomingDamageEvent adrenaline +2 cap 15 decay 0.05
    Blast Shield Creeper PrimedTnt MinecartTNT 6 block radius Resistance IV V
    Powder Snow freezing ticksFrozen
  `,
  versions: `
    Version History Changelog Updates Patch Notes Modrinth
    Darwinism 1.4.1 NeoForge 1.21.8 1.21.1 static attribute modifiers fixed tier upgrade reset
    Darwinism 1.4.0 Darwinism III AttributeResetProcedure devolution prevention
    Darwinism 1.3.1 Forge 1.20.1 NeoForge 1.21.1 Adrenaline Evolution System
    Darwinism 1.3.0 Potion of Darwinism II 1.2.0 1.1.0 1.0.0
  `,
  items: `
    Potions Brewing Splash Lingering Tipped Arrow Arrow of Darwinism Arrow of Milk
    darwinism:darwinism_1_bottle Awkward Potion Nautilus Shell 3600 ticks
    darwinism:darwinism_2_bottle Golden Carrot 4000 ticks
    darwinism:darwinism_3_bottle Enchanted Golden Apple 5000 ticks
    darwinism:milk_bottle Fermented Spider Eye 60 ticks
  `,
  acquisition: `
    Permanence Cure DNA Alteration Anti-Devolution
    Devolution refused DarwinismEffectStartedappliedProcedure Darwinism2EffectStartedappliedProcedure
    Your DNA has permanently altered darwinismTarget 4 to 7 doses darwinismDrunkCount
    Poison 40 ticks Confusion Nausea 80 ticks delay 45 ticks queueServerWork
    EnforceDarwinismPermanenceProcedure every 20 ticks infinite DARWINISM_3
    MilkEffectEffectStartedappliedProcedure milkDrunkCount >= 7 cure permanent Darwinism
    ResetDarwinismOnDeathProcedure PlayerRespawnEvent clonePlayer PlayerVariables
  `,
  technical: `
    Technical Mod Specs Compatibility neoforge.mods.toml pack.mcmeta
    modId darwinism version 1.4.1 NeoForge 21.1.232 Minecraft 1.21.1 pack_format 48
    DarwinismModVariables PlayerVariables ATTACHMENT_TYPES player_variables_sync
    sprintCounter adrenaline darwinismDrunkCount isDarwinismPermanent darwinismTarget milkDrunkCount
    GNU General Public License v3 GPL-3.0-or-later MCreator honeypie_3301
  `
};
