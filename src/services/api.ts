import { env } from "@/env"

export function api(path: string, init?: RequestInit) {
  const baseUrl = `${env.NEXT_PUBLIC_POKEMON_API}`
  const apiPrefix = "/api/v2"
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
