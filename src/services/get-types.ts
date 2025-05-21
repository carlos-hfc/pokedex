import { Species } from "@/@types"

import { api } from "./api"

export async function getTypes() {
  try {
    const response = await api("/type")

    const data = (await response.json()) as { results: Species[] }

    return data.results
      .filter(
        type =>
          type.name !== "unknown" &&
          type.name !== "shadow" &&
          type.name !== "stellar",
      )
      .sort((a, b) => (a.name < b.name ? -1 : 1))
  } catch (error) {
    return []
  }
}
