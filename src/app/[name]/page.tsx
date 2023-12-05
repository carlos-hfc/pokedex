import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

import { PokemonType } from "@/@types";
import { getByName } from "@/services/fetches";

interface Props {
  params: {
    name: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: params.name.charAt(0).toUpperCase() + params.name.slice(1)
  };
}

export default async function Pokemon({ params }: { params: { name: string; }; }) {
  const pokemon = await getByName<PokemonType>(params.name);

  const firstType = pokemon.types[0].type.name;

  return (
    <main className="pt-40 px-4 md:pt-36 lg:px-8">
      <div className="container mx-auto">
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-white capitalize font-bold text-4xl flex flex-wrap items-center justify-center gap-4">
            {pokemon.name}

            <span className="text-slate-300 font-semibold">
              #{String(pokemon.id).padStart(4, '0')}
            </span>
          </h1>

        </header>
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