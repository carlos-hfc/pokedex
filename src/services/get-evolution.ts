import { EvolutionChain, PokemonType, Species } from "@/@types"
import { normalizeEvolutionChain } from "@/utils"

import { api } from "./api"
import { getByNameOrId } from "./get-by-name-or-id"

interface GetEvolutionRequest {
  name: string
}

type GetEvolutionResponse =
  | PokemonType[]
  | {
      current: PokemonType
      next: PokemonType[]
    }[]

export async function getEvolution({
  name,
}: GetEvolutionRequest): Promise<GetEvolutionResponse> {
  try {
    const speciesResponse = await api(`/pokemon-species/${name}`)
    const speciesData = (await speciesResponse.json()) as {
      evolution_chain: Species
    }

    const evolutionResponse = await fetch(speciesData.evolution_chain.url)
    const evolutionData = (await evolutionResponse.json()) as {
      chain: EvolutionChain
    }

    if (evolutionData.chain.evolves_to.length > 1) {
      const evolutions = normalizeEvolutionChain(evolutionData.chain)

      const data = {
        current: await getByNameOrId({ query: evolutions.current }),
        next: [] as PokemonType[],
      }

      for (const item of evolutions.next) {
        const pokemon = await getByNameOrId({ query: item })

        data.next.push(pokemon)
      }

      return [data]
    }

    const evolves: string[] = []
    let chain = evolutionData.chain

    do {
      evolves.push(chain.species.name)

      chain = chain.evolves_to[0]
    } while (!!chain && Object.hasOwn(chain, "evolves_to"))

    return await Promise.all(
      evolves.map(evolve => getByNameOrId({ query: evolve })),
    )
  } catch (error) {
    return []
  }
}
