/* eslint-disable no-use-before-define */
export type PokemonResponse = {
  count: number
  results: {
    url: string
  }[]
}

export type PokemonType = {
  abilities: Ability[]
  base_experience: number
  forms: Species[]
  game_indices: GameIndex[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export type Ability = {
  ability: Species
  is_hidden: boolean
  slot: number
}

export type Species = {
  name: string
  url: string
}

export type GameIndex = {
  game_index: number
  version: Species
}

export type HeldItem = {
  item: Species
  version_details: VersionDetail[]
}

export type VersionDetail = {
  rarity: number
  version: Species
}

export type Move = {
  move: Species
  version_group_details: VersionGroupDetail[]
}

export type VersionGroupDetail = {
  level_learned_at: number
  move_learn_method: Species
  version_group: Species
}

export type GenerationV = {
  "black-white": Sprites
}

export type GenerationIv = {
  "diamond-pearl": Sprites
  "heartgold-soulsilver": Sprites
  platinum: Sprites
}

export type Versions = {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": { [key: string]: Home }
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export type Sprites = {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
  other?: Other
  versions?: Versions
  animated?: Sprites
}

export type GenerationI = {
  "red-blue": RedBlue
  yellow: RedBlue
}

export type RedBlue = {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
}

export type GenerationIi = {
  crystal: Crystal
  gold: Gold
  silver: Gold
}

export type Crystal = {
  back_default: string
  back_shiny: string
  back_shiny_transparent: string
  back_transparent: string
  front_default: string
  front_shiny: string
  front_shiny_transparent: string
  front_transparent: string
}

export type Gold = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent?: string
}

export type GenerationIii = {
  emerald: OfficialArtwork
  "firered-leafgreen": Gold
  "ruby-sapphire": Gold
}

export type OfficialArtwork = {
  front_default: string
  front_shiny: string
}

export type Home = {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export type GenerationVii = {
  icons: DreamWorld
  "ultra-sun-ultra-moon": Home
}

export type DreamWorld = {
  front_default: string
  front_female: null | string
}

export type GenerationViii = {
  icons: DreamWorld
}

export type Other = {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
}

export type Stat = {
  base_stat: number
  effort: number
  stat: Species
}

export type Type = {
  slot: number
  type: Species
}

export type SearchPokemon = {
  name?: string
  type?: string
  page: string
}

export type Generation = {
  id: number
  name: string
  pokemon_species: Species[]
}

export type EvolutionChain = {
  evolves_to: EvolutionChain[]
  species: Species
}

export type ClassNames = string | boolean | undefined
