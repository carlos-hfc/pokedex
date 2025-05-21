import Image from "next/image"
import Link from "next/link"

import { getRandomPokemon } from "@/services/get-random-pokemon"
import { cn, padId } from "@/utils"

export async function Feature() {
  const pokemon = await getRandomPokemon()

  const firstType = pokemon?.types?.[0]?.type.name

  return (
    <div
      className={cn(
        "relative w-full pt-40 pb-12 md:pt-32 overflow-hidden",
        "before:absolute before:bg-pokeball before:w-1/2 before:h-[70%] before:bg-no-repeat before:bg-center before:bg-contain before:-z-10 before:opacity-10 before:invert before:left-[-20%] before:-top-1/4 md:before:top-1/2 md:before:-translate-y-1/2",
        "after:absolute after:bg-pokeball after:w-1/2 after:h-[70%] after:bg-no-repeat after:bg-center after:bg-contain after:-z-10 after:opacity-10 after:invert after:right-[-20%] after:-bottom-1/4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:bottom-[initial]",
        `bg-${firstType}/40`,
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex flex-col items-center w-full justify-between gap-4 relative md:flex-row md:px-8">
        <div className="w-full justify-center items-center flex flex-col gap-4 md:w-1/2">
          <div
            className={cn(
              "text-2xl font-bold md:text-3xl text-shadow",
              firstType === "dark" ? "text-white" : `text-${firstType}`,
            )}
          >
            {padId(pokemon.id)}
          </div>

          <div className="flex flex-row gap-2 md:gap-4">
            {pokemon.types.map((item, i) => (
              <span
                key={i}
                className={cn(
                  "capitalize text-white px-3 py-0.5 rounded shadow-lg",
                  `bg-${item.type.name}`,
                )}
              >
                {item.type.name}
              </span>
            ))}
          </div>

          <h2 className="capitalize text-center font-bold text-4xl text-white md:text-5xl">
            {pokemon.name}
          </h2>

          <Link
            href={`/${pokemon.name}`}
            className="w-fit bg-white py-2 px-6 rounded-md shadow-lg font-semibold text-center"
          >
            Ver detalhes
          </Link>
        </div>

        <div className="w-full h-96 relative md:w-1/2">
          <Image
            src={
              pokemon.sprites.other?.home?.front_default ??
              pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
              pokemon?.sprites?.front_default ??
              ""
            }
            alt={pokemon.name}
            fill
            loading="lazy"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
