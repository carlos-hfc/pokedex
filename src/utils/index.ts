import { EvolutionChain } from "@/@types";

interface NormalizeEvolution {
  current: string;
  next: string;
}

export function normalizeEvolutionChain(chain: EvolutionChain): NormalizeEvolution[] {
  const { evolves_to, species } = chain;

  if (evolves_to.length <= 0) return [];

  const evolutions = evolves_to.reduce((acc, cur) => {
    return [
      ...acc,
      {
        current: species.name,
        next: cur.species.name,
      },
      ...normalizeEvolutionChain(cur)
    ];
  }, [] as NormalizeEvolution[]);

  return evolutions;
}