import { Metadata } from "next";
import Image from "next/image";

import { PokemonType } from "@/@types";
import { getByNameOrId } from "@/services/fetches";

interface Props {
  params: {
    name: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.name.charAt(0).toUpperCase() + params.name.slice(1)
  };
}

export default async function Pokemon({ params }: Props) {
  const pokemon = await getByNameOrId<PokemonType>(params.name);

  const firstType = pokemon.types[0].type.name;

  return (
    <main className="px-4 lg:px-8 py-8 lg:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col">
          <h1 className="text-white capitalize font-bold text-4xl flex flex-wrap items-center justify-center gap-4 gap-y-1">
            {pokemon.name}

            <span className="text-slate-300 font-semibold">
              #{String(pokemon.id).padStart(4, '0')}
            </span>
          </h1>

          <div className="flex flex-col gap-4">
            <div className="relative w-full flex h-56 bg-neutral-600 rounded-md">
              <Image
                src={pokemon.sprites?.other?.["official-artwork"]?.front_default ?? ""}
                alt={pokemon.name}
                fill
                loading="lazy"
                className="object-contain"
              />
            </div>

            <ul className="flex flex-col w-full text-white gap-2">
              <li>
                <strong className="text-lg">Peso</strong>
                <p>{pokemon.weight / 10} Kg</p>
              </li>
              <li>
                <strong className="text-lg">Altura</strong>
                <p>{pokemon.height / 10} m</p>
              </li>
              <li>
                <strong className="text-lg">Habilidade principal</strong>
                {pokemon.abilities.map(item => item.slot === 1 && (
                  <p
                    key={item.ability.name}
                    className="capitalize"
                  >
                    {item.ability.name}
                  </p>
                ))}
              </li>
              <li>
                <strong className="text-lg">Tipo(s)</strong>
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
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-white text-xl font-bold">Estatísticas</h2>

            <div className="flex flex-col">
              {pokemon.stats.map(item => (
                <div
                  key={item.stat.name}
                  className="flex justify-between text-white"
                >
                  <strong className="capitalize ">
                    {item.stat.name.replaceAll('-', ' ')}
                  </strong>

                  <progress
                    aria-label={item.base_stat.toString()}
                    max={200}
                    value={item.base_stat}
                    color={(item.base_stat / 200) < 50 ? 'yellow' : 'green'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="relative h-64 w-full">
            <Image
              src={pokemon?.sprites?.other?.dream_world?.front_default ?? pokemon?.sprites?.other?.home?.front_default ?? pokemon?.sprites?.other?.["official-artwork"]?.front_default ?? ""}
              alt={pokemon.name}
              fill
              loading="lazy"
              className="object-contain"
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="font-bold text-white">
              #{String(pokemon.id).padStart(4, '0')}
            </div>

            <h1 className="capitalize font-bold text-white text-4xl drop-shadow-text">
              {pokemon.name}
            </h1>

            <div className="flex flex-row">
              {pokemon.types.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className={`bg-${item.type.name} px-3 py-0.5 rounded text-white shadow-lg`}
                >
                  {item.type.name}
                </span>
              ))}
            </div>
          </div> */}
      </div>
    </main>
  );
}