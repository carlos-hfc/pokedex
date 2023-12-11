import { EvolutionChain } from "@/@types";

export function normalizeEvolutionChain(chain: EvolutionChain): any {
  const { evolves_to, species } = chain;

  if (evolves_to.length <= 0) return [];

  const evolutions = evolves_to.reduce((acc, cur: EvolutionChain) => {
    return [
      ...acc,
      cur.species.name,
      ...normalizeEvolutionChain(cur)
    ];
  }, [] as any[]);

  return {
    current: species.name,
    next: evolutions
  };
}

export function padId(id: number) {
  return `#${String(id).padStart(4, '0')}`;
}