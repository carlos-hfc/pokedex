import { NextResponse } from "next/server"

import { Generation, PokemonType } from "@/@types"
import { api } from "@/services/api"
import { getAll } from "@/services/get-all"

function randomize(total: number) {
  return (Math.random() * (total - 1) + 1).toFixed(0)
}

export async function GET() {
  const { total } = await getAll({ page: "0" })

  const random = randomize(total)

  try {
    const response = await api(`/pokemon/${random}`, {
      next: {
        revalidate: false,
      },
    })

    const data = (await response.json()) as PokemonType

    return NextResponse.json(data)
  } catch (error) {
    const generationResponse = await api("/generation/1", {
      next: {
        revalidate: false,
      },
    })

    const generationData = (await generationResponse.json()) as Generation

    const random = randomize(generationData.pokemon_species.length)

    const pokemonResponse = await api(`/pokemon/${random}`, {
      next: {
        revalidate: false,
      },
    })

    const pokemonData = (await pokemonResponse.json()) as PokemonType

    return NextResponse.json(pokemonData)
  }
}
