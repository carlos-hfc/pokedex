import axios from "axios";

import { api } from "./api";
import { PokemonResponse, PokemonType, SearchPokemon } from "@/@types";
import { PAGE_SIZE } from "@/constants";

export async function getAll(search: SearchPokemon) {
  if (search?.name) {
    return {
      data: [await getByName(search.name)],
      total: 1
    };
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

export async function getByName(name: string) {
  const response = await api.get(`/pokemon/${name}`);

  return response.data;
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
  const response = await api.get<{ results: { name: string; }[]; }>("/type");

  return response.data.results
    .filter(type => type.name !== 'unknown' && type.name !== 'shadow')
    .sort((a, b) => a.name < b.name ? -1 : 1);
}