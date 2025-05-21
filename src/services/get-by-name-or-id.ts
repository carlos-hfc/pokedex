import { notFound } from "next/navigation"

import { PokemonType } from "@/@types"

import { api } from "./api"

interface GetByNameOrIdRequest {
  query: string | number
}

type GetByNameOrIdResponse = PokemonType

export async function getByNameOrId({
  query,
}: GetByNameOrIdRequest): Promise<GetByNameOrIdResponse> {
  try {
    const response = await api(`/pokemon/${query}`)

    const data = (await response.json()) as PokemonType

    return data
  } catch (error) {
    notFound()
  }
}
