import { PokemonType } from "@/@types"

interface GetByUrlRequest {
  url: string
}

export async function getByUrl({ url }: GetByUrlRequest) {
  const response = await fetch(url)

  const data = (await response.json()) as PokemonType

  return data
}
