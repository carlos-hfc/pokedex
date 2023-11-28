import Image from "next/image";
import Link from "next/link";

import { getByUrl } from "@/services/fetches";

interface PokemonProps {
  url: string;
}

export async function Pokemon({ url }: PokemonProps) {
  const pokemon = await getByUrl(url);

  const firstType = pokemon?.types?.[0]?.type?.name;

  return (
    <Link href={pokemon?.name} className={`flex flex-col md:flex-row items-center w-full h-full md:h-56 rounded-lg gap-4 overflow-hidden relative pokemon ${firstType} cursor-pointer`}>
      <div className="w-full md:w-2/4 md:h-full justify-center items-center md:items-start flex flex-col pt-6 px-2 pb-0.5 md:px-4 md:py-0 gap-2 z-10">
        <div className="text-md font-bold pokemon-index">
          #{String(pokemon?.id).padStart(3, '0')}
        </div>

        <h2 className="capitalize font-bold text-2xl sm:text-4xl text-white">
          {pokemon?.name}
        </h2>

        <div className="flex flex-wrap gap-2 justify-center lg:justify-normal">
          {pokemon?.types?.map((type, i) => (
            <span key={`${type}-${String(i)}`} className={`py-1 px-2 w-max text-sm shadow-md rounded-xl bg-${(type?.type?.name)} text-white capitalize font-normal font-montserrat`}>
              {type?.type?.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/4 h-56 flex relative pokemon-image">
        <Image
          src={pokemon?.sprites?.other?.["official-artwork"]?.front_default ?? pokemon?.sprites?.front_default}
          alt={pokemon?.name}
          fill
          className="object-contain"
          loading="lazy"
        />
      </div>
    </Link>
  );
}