import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Metadata } from "next"
import Image from "next/image"
import { Fragment } from "react"

import { Progress } from "@/components/progress"
import { getByNameOrId } from "@/services/get-by-name-or-id"
import { getEvolution } from "@/services/get-evolution"
import { cn, padId } from "@/utils"

import { sharedMetadata } from "../shared-metadata"
import { ShowEvolution } from "./show-evolution"

interface Props {
  params: {
    name: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title: params.name.charAt(0).toUpperCase() + params.name.slice(1),
    twitter: {
      ...sharedMetadata.twitter,
      title: params.name.charAt(0).toUpperCase() + params.name.slice(1),
    },
    openGraph: {
      ...sharedMetadata.openGraph,
      title: params.name.charAt(0).toUpperCase() + params.name.slice(1),
    },
  }
}

export default async function Pokemon({ params }: Props) {
  const pokemon = await getByNameOrId({ query: params.name })
  const evolutions = await getEvolution({ name: pokemon.name })

  const firstType = pokemon.types[0].type.name

  return (
    <main className="px-4 lg:px-8 py-8 lg:py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:gap-12">
          <h1 className="text-white capitalize font-bold text-4xl flex flex-wrap items-center justify-center gap-4 gap-y-1 md:text-5xl">
            {pokemon.name}

            <span className="text-slate-300 font-semibold">
              {padId(pokemon.id)}
            </span>
          </h1>

          <div className="flex flex-col h-full gap-4 md:gap-6 lg:gap-8">
            <div className="flex flex-col h-full gap-4 md:flex-row md:gap-6 lg:gap-8">
              <div className="relative w-full flex bg-neutral-600 p-4 rounded-md aspect-square">
                <Image
                  src={
                    pokemon.sprites?.other?.["official-artwork"]
                      ?.front_default ?? ""
                  }
                  alt={pokemon.name}
                  fill
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              <ul className="grid w-full bg-neutral-600 rounded-md h-full p-4 md:p-6 md:aspect-square auto-rows-min xl:content-center text-white gap-3 lg:grid-cols-2 lg:gap-y-8">
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">
                    Peso
                  </strong>
                  <p className="lg:text-lg text-base">
                    {pokemon.weight / 10} Kg
                  </p>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">
                    Altura
                  </strong>
                  <p className="lg:text-lg text-base">
                    {pokemon.height / 10} m
                  </p>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">
                    Habilidade principal
                  </strong>
                  {pokemon.abilities.map(
                    item =>
                      item.slot === 1 && (
                        <p
                          key={item.ability.name}
                          className="capitalize lg:text-lg text-base"
                        >
                          {item.ability.name}
                        </p>
                      ),
                  )}
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">
                    Tipo(s)
                  </strong>
                  <p className="flex flex-wrap gap-2">
                    {pokemon.types.map(item => (
                      <span
                        key={item.slot}
                        className={cn(
                          `bg-${item.type.name}`,
                          "px-4 py-1 capitalize text-white rounded shadow-md",
                        )}
                      >
                        {item.type.name}
                      </span>
                    ))}
                  </p>
                </li>
                <li className="col-span-full gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">
                    Estatísticas
                  </strong>
                  <ul className="flex flex-col gap-2">
                    {pokemon.stats.map(item => (
                      <li
                        key={item.stat.name}
                        className="flex flex-col justify-between text-white items-center gap-0.5 sm:flex-row sm:gap-2 md:flex-col lg:flex-row"
                      >
                        <span className="capitalize w-full font-medium lg:text-lg text-base">
                          {item.stat.name.replaceAll("-", " ")}

                          <strong className="ml-1">{item.base_stat}</strong>
                        </span>

                        <Progress
                          type={firstType}
                          value={item.base_stat}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>

            {evolutions?.length > 0 && (
              <div className="flex flex-col gap-8 rounded-md bg-neutral-600 w-full p-4 md:p-6 text-white">
                <strong className="text-2xl md:text-4xl">Evoluções</strong>

                <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
                  {evolutions?.map((evolution, i) => (
                    <Fragment key={padId(i)}>
                      {!("current" in evolution) && i !== 0 && (
                        <ChevronDownIcon className="w-24 h-24 stroke-[2.5] lg:-rotate-90" />
                      )}

                      <ShowEvolution {...evolution} />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
