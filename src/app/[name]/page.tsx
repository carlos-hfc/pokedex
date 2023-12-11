import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { PokemonType } from "@/@types";
import { Progress } from "@/components/Progress";
import { getByNameOrId, getEvolution } from "@/services/fetches";
import { padId } from "@/utils";

interface Props {
  params: {
    name: string;
  };
}

type Evolution = ({
  current: PokemonType;
  next: PokemonType[];
}) | PokemonType;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.name.charAt(0).toUpperCase() + params.name.slice(1)
  };
}

export default async function Pokemon({ params }: Props) {
  const pokemon = await getByNameOrId(params.name);
  const evolutions = await getEvolution(pokemon.name);

  const firstType = pokemon.types[0].type.name;

  function ShowEvolution(evolution: Evolution) {
    if ('current' in evolution) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between w-full">
          <Link
            href={evolution.current.name}
            className="flex flex-col items-center justify-center relative z-[1] evolution lg:min-w-[33%]"
          >
            <div className="relative flex w-full aspect-square p-4 max-h-36">
              <Image
                src={evolution.current.sprites?.other?.["official-artwork"]?.front_default ?? ""}
                alt={evolution.current.name}
                fill
                loading="lazy"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col text-center gap-1">
              <div className="text-xl font-semibold capitalize flex flex-wrap gap-2 lg:text-2xl">
                {evolution.current.name}
                <span className="text-slate-300">
                  {padId(evolution.current.id)}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {evolution.current.types.map((item, i) => (
                  <span
                    key={padId(i) + item}
                    className={`px-3 py-0.5 rounded text-sm bg-${item.type.name} shadow`}
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          <ChevronDownIcon
            className="w-24 h-24 stroke-[2.5] lg:-rotate-90"
          />

          <div className="flex flex-row flex-wrap items-center justify-center text-center gap-3 lg:w-1/2 lg:gap-6">
            {evolution.next.map((next, i) => (
              <Link
                key={padId(i) + next}
                href={next.name}
                className="flex flex-col items-center justify-center relative z-[1] evolution"
              >
                <div className="relative flex w-full aspect-square p-4 max-h-36">
                  <Image
                    src={next.sprites?.other?.["official-artwork"]?.front_default ?? ""}
                    alt={next.name}
                    fill
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-center gap-1">
                  <div className="text-xl font-semibold capitalize flex flex-wrap gap-2 lg:text-2xl">
                    {next.name}
                    <span className="text-slate-300">
                      {padId(next.id)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {next.types.map((item, i) => (
                      <span
                        key={padId(i) + item}
                        className={`px-3 py-0.5 rounded text-sm bg-${item.type.name} shadow`}
                      >
                        {item.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        href={evolution.name}
        className="flex flex-col items-center justify-center relative z-[1] evolution"
      >
        <div className="relative flex w-full aspect-square p-4 max-h-36">
          <Image
            src={evolution.sprites?.other?.["official-artwork"]?.front_default ?? ""}
            alt={evolution.name}
            fill
            loading="lazy"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col text-center gap-1">
          <div className="text-xl font-semibold capitalize flex flex-wrap gap-2 lg:text-2xl">
            {evolution.name}

            <span className="text-slate-300">
              {padId(evolution.id)}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1">
            {evolution.types.map((item, i) => (
              <span
                key={padId(i) + item}
                className={`px-3 py-0.5 rounded text-sm bg-${item.type.name} shadow`}
              >
                {item.type.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

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
                  src={pokemon.sprites?.other?.["official-artwork"]?.front_default ?? ""}
                  alt={pokemon.name}
                  fill
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              <ul className="grid w-full bg-neutral-600 rounded-md h-full p-4 md:p-6 md:aspect-square auto-rows-min xl:content-center text-white gap-3 lg:grid-cols-2 lg:gap-y-8">
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">Peso</strong>
                  <p className="lg:text-lg text-base">{pokemon.weight / 10} Kg</p>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">Altura</strong>
                  <p className="lg:text-lg text-base">{pokemon.height / 10} m</p>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">Habilidade principal</strong>
                  {pokemon.abilities.map(item => item.slot === 1 && (
                    <p
                      key={item.ability.name}
                      className="capitalize lg:text-lg text-base"
                    >
                      {item.ability.name}
                    </p>
                  ))}
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">Tipo(s)</strong>
                  <p className="flex flex-wrap gap-2">
                    {pokemon.types.map(item => (
                      <span
                        key={item.slot}
                        className={`bg-${item.type.name} px-4 py-1 capitalize text-white rounded shadow-md`}
                      >
                        {item.type.name}
                      </span>
                    ))}
                  </p>
                </li>
                <li className="col-span-full gap-1">
                  <strong className="text-lg md:text-xl lg:text-2xl">Estatísticas</strong>
                  <ul className="flex flex-col gap-2">
                    {pokemon.stats.map(item => (
                      <li
                        key={item.stat.name}
                        className="flex flex-col justify-between text-white items-center gap-0.5 sm:flex-row sm:gap-2 md:flex-col lg:flex-row"
                      >
                        <span className="capitalize w-full font-medium lg:text-lg text-base">
                          {item.stat.name.replaceAll('-', ' ')}

                          <strong className="ml-1">
                            {item.base_stat}
                          </strong>
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
                        <ChevronDownIcon
                          className="w-24 h-24 stroke-[2.5] lg:-rotate-90"
                        />
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
  );
}