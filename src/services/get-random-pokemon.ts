import { PokemonType } from "@/@types"
import { env } from "@/env"

export async function getRandomPokemon() {
  const base = `${env.NEXT_PUBLIC_BASE_URL}/api/feature`

  const response = await fetch(base, {
    next: {
      revalidate: 86_400,
    },
  })

  const data = (await response.json()) as PokemonType

  return data
}
