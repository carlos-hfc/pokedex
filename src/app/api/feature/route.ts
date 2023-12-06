import { NextResponse } from "next/server";

import { Generation } from "@/@types";
import { api } from "@/services/api";
import { getAll } from "@/services/fetches";

function randomize(total: number) {
  return (Math.random() * (total - 1) + 1).toFixed(0);
}

export async function GET() {
  const { total } = await getAll({ page: '0' });

  const random = randomize(total);

  try {
    const response = await api.get(`/pokemon/${random}`);

    return NextResponse.json(response.data);
  } catch (error) {
    const generation = await api.get<Generation>("/generation/1");

    const random = randomize(generation.data.pokemon_species.length);

    const pokemon = await api.get(`/pokemon/${random}`);

    return NextResponse.json(pokemon.data);
  }
}