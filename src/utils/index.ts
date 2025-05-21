import { ClassNames, EvolutionChain } from "@/@types"

export function normalizeEvolutionChain(chain: EvolutionChain): any {
  const { evolves_to: envolvesTo, species } = chain

  if (envolvesTo.length <= 0) return []

  const evolutions = envolvesTo.reduce((acc, cur: EvolutionChain) => {
    return [...acc, cur.species.name, ...normalizeEvolutionChain(cur)]
  }, [] as any[])

  return {
    current: species.name,
    next: evolutions,
  }
}

export function padId(id: number) {
  return `#${String(id).padStart(4, "0")}`
}

export function cn(...classes: ClassNames[]) {
  return classes.filter(Boolean).join(" ")
}

export function randomize(total: number) {
  return (Math.random() * (total - 1) + 1).toFixed(0)
}
