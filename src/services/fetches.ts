import axios from "axios";
import { notFound } from "next/navigation";

import { api } from "./api";
import { EvolutionChain, PokemonResponse, PokemonType, SearchPokemon, Species } from "@/@types";
import { PAGE_SIZE } from "@/constants";
import { normalizeEvolutionChain } from "@/utils";

export async function getAll(search: SearchPokemon): Promise<{ data: PokemonType[], total: number; }> {
  if (search?.name) {
    try {
      const data = await getByNameOrId(search.name);

      return {
        data: [data],
        total: !data ? 0 : 1
      };
    } catch (error) {
      return {
        data: [],
        total: 0
      };
    }
  }

  if (search?.type) {
    const response = await getByType(search.type);

    return response;
  }

  const response = await api.get<PokemonResponse>("/pokemon", {
    params: {
      limit: PAGE_SIZE,
      offset: (Number(search.page) - 1) * PAGE_SIZE
    }
  });

  const data = await Promise.all(response.data.results.map(async (result) => {
    return await getByUrl(result.url);
  }));

  return {
    data,
    total: response.data.count
  };
}

export async function getByUrl(url: string) {
  const response = await axios.get<PokemonType>(url);

  return response.data;
}

export async function getByNameOrId(name: number | string) {
  try {
    const response = await api.get<PokemonType>(`/pokemon/${name}`);

    return response.data;
  } catch (error) {
    notFound();
  }
}

export async function getByType(type: string) {
  const response = await api.get(`/type/${type}`);

  const data = await Promise.all(response.data.pokemon.map(async (result: any) => {
    return await getByUrl(result.pokemon.url);
  }));

  return {
    data,
    total: 1
  };
}

export async function getTypes() {
  const response = await api.get<{ results: Species[]; }>("/type");

  return response.data.results
    .filter(type => type.name !== 'unknown' && type.name !== 'shadow')
    .sort((a, b) => a.name < b.name ? -1 : 1);
}

export async function getEvolution(name: string) {
  const species = await api.get<{ evolution_chain: Species; }>(`/pokemon-species/${name}`);

  const response = await axios.get<{ chain: EvolutionChain; }>(species.data.evolution_chain.url);

  if (response.data.chain.evolves_to.length > 1) {
    const evolutions = normalizeEvolutionChain(response.data.chain);

    const data = [] as { current: PokemonType, next: PokemonType; }[];

    for (const item of evolutions) {
      let obj = {} as { current: PokemonType; next: PokemonType; };
      Object.assign(obj, {
        current: await getByNameOrId(item.current),
        next: await getByNameOrId(item.next),
      });
      data.push(obj);
    }

    return data;
  }

  const evolves: string[] = [];
  let chain = response.data.chain;

  do {
    evolves.push(chain.species.name);

    chain = chain.evolves_to[0];
  } while (!!chain && chain.hasOwnProperty('evolves_to'));

  return await Promise.all(evolves.map(evolve => getByNameOrId(evolve)));
}