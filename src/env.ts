import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_POKEMON_API: z.string().url(),
})

export const env = envSchema.parse(process.env)
