import { Metadata } from "next";
import Image from "next/image";

import { PokemonType } from "@/@types";
import { Progress } from "@/components/Progress";
import { getByNameOrId, getEvolution } from "@/services/fetches";

interface Props {
  params: {
    name: string;
  };
}

type Evolution = ({
  current: PokemonType;
  next: PokemonType;
}) | PokemonType;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.name.charAt(0).toUpperCase() + params.name.slice(1)
  };
}

export default async function Pokemon({ params }: Props) {
  const pokemon = await getByNameOrId(params.name);
  const evolutions: Evolution[] = await getEvolution(pokemon.name);

  const firstType = pokemon.types[0].type.name;

  function ShowEvolution(evolution: Evolution) {
    if ('current' in evolution) {
      return (
        <div className="flex" />
      );
    }

    return (
      <div className="flex" />
    );
  }

  return (
    <main className="px-4 lg:px-8 py-8 lg:py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:gap-12">
          <h1 className="text-white capitalize font-bold text-4xl flex flex-wrap items-center justify-center gap-4 gap-y-1 md:text-5xl">
            {pokemon.name}

            <span className="text-slate-300 font-semibold">
              #{String(pokemon.id).padStart(4, '0')}
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
                        className="flex flex-col justify-between text-white items-center gap-0.5 md:flex-row md:gap-2"
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

            <div className="flex flex-col rounded-md bg-neutral-600 h-32 w-full p-4 md:p-6">
              <strong className="text-white text-2xl md:text-4xl">Evoluções</strong>

              <div className="flex">
                {evolutions.map((evolution, i) => (
                  <ShowEvolution
                    key={i.toString().padStart(4, '0')}
                    {...evolution}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}