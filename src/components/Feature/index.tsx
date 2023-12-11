import Image from "next/image";
import Link from "next/link";

import { Generation, PokemonType } from "@/@types";
import { padId } from "@/utils";
import { getAll } from "@/services/fetches";

function randomize(total: number) {
  return (Math.random() * (total - 1) + 1).toFixed(0);
}

async function getRandmonPokemon() {

  const { total } = await getAll({ page: '0' });

  const random = randomize(total);

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`, {
      next: {
        revalidate: 3600
      }
    });

    return await response.json() as PokemonType;
  } catch (error) {
    const response = await fetch("https://pokeapi.co/api/v2/generation/1", {
      next: {
        revalidate: 3600
      }
    });

    const generation = await response.json() as Generation;

    const random = randomize(generation.pokemon_species.length);

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`, {
      next: {
        revalidate: 3600
      }
    });

    return await pokemon.json() as PokemonType;
  }
}

export async function Feature() {
  const pokemon = await getRandmonPokemon();

  const firstType = pokemon.types?.[0]?.type.name;

  return (
    <div className={`relative w-full pt-40 pb-12 bg-${firstType}/40 md:pt-32 feature overflow-hidden`}>
      <div className="container max-w-7xl mx-auto px-4 flex flex-col items-center w-full justify-between gap-4 relative md:flex-row md:px-8">
        <div className="w-full justify-center items-center flex flex-col gap-4 md:w-1/2">
          <div className={`text-2xl font-bold ${firstType === 'dark' ? 'text-white' : `text-${firstType}`} md:text-3xl feature-index`}>
            {padId(pokemon.id)}
          </div>

          <div className="flex flex-row gap-2 md:gap-4">
            {pokemon.types.map((item, i) => (
              <span
                key={`${item}-${String(i)}`}
                className={`capitalize bg-${item.type.name} text-white px-3 py-0.5 rounded shadow-lg`}
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
            className="w-max bg-white py-2 px-6 rounded-md shadow-lg font-semibold text-center"
          >
            Ver detalhes
          </Link>
        </div>

        <div className="w-full h-96 relative md:w-1/2">
          <Image
            src={pokemon.sprites.other?.home?.front_default ?? pokemon?.sprites?.other?.["official-artwork"]?.front_default ?? pokemon?.sprites?.front_default ?? ""}
            alt={pokemon.name}
            fill
            loading="lazy"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}