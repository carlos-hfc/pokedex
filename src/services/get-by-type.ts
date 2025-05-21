import { PokemonType } from "@/@types"

import { api } from "./api"
import { getByUrl } from "./get-by-url"

interface GetByTypeRequest {
  type: string
}

interface GetByTypeResponse {
  data: PokemonType[]
  total: number
}

export async function getByType({
  type,
}: GetByTypeRequest): Promise<GetByTypeResponse> {
  try {
    const response = await api(`/type/${type}`)

    const json = await response.json()

    const data = await Promise.all(
      json.pokemon.map(async (result: any) => {
        return await getByUrl({ url: result.pokemon.url })
      }),
    )

    return {
      data,
      total: 1,
    }
  } catch (error) {
    return {
      data: [],
      total: 0,
    }
  }
}
