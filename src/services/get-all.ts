import { PokemonResponse, PokemonType, SearchPokemon } from "@/@types"
import { PAGE_SIZE } from "@/constants"

import { api } from "./api"
import { getByNameOrId } from "./get-by-name-or-id"
import { getByType } from "./get-by-type"
import { getByUrl } from "./get-by-url"

interface GetAllRequest extends SearchPokemon {}

interface GetAllResponse {
  data: PokemonType[]
  total: number
}

export async function getAll({
  page,
  name,
  type,
}: GetAllRequest): Promise<GetAllResponse> {
  if (name) {
    try {
      const data = await getByNameOrId({ query: name })

      return {
        data: [data],
        total: !data ? 0 : 1,
      }
    } catch (error) {
      return {
        data: [],
        total: 0,
      }
    }
  }

  if (type) {
    try {
      const response = await getByType({ type })

      return response
    } catch (error) {
      return {
        data: [],
        total: 0,
      }
    }
  }

  try {
    const params = new URLSearchParams()
    params.set("limit", String(PAGE_SIZE))
    params.set("offset", String((Number(page) - 1) * PAGE_SIZE))

    const response = await api(`/pokemon?${params.toString()}`)

    const json = (await response.json()) as PokemonResponse

    const data = await Promise.all(
      json.results.map(async result => {
        return await getByUrl({ url: result.url })
      }),
    )

    return {
      data,
      total: json.count,
    }
  } catch (error) {
    return {
      data: [],
      total: 0,
    }
  }
}
