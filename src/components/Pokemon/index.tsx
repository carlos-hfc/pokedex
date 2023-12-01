import Image from "next/image";
import Link from "next/link";

import { PokemonType } from "@/@types";

export async function Pokemon(props: PokemonType) {
  const firstType = props?.types?.[0]?.type?.name;

  return (
    <Link href={props?.name} className={`flex flex-col xs:flex-row items-center w-full h-full xs:h-56 rounded-lg gap-2 xs:gap-4 overflow-hidden relative pokemon ${firstType} cursor-pointer`}>
      <div className="w-full xs:w-2/4 xs:h-full justify-center items-center xs:items-start flex flex-col pt-6 px-2 pb-0.5 xs:px-4 xs:py-0 gap-2 z-10">
        <div className="text-md font-bold pokemon-index">
          #{String(props?.id).padStart(3, '0')}
        </div>

        <h2 className="capitalize font-bold text-2xl xs:text-4xl text-white">
          {props?.name}
        </h2>

        <div className="flex flex-wrap gap-1 justify-center lg:justify-normal">
          {props?.types?.map((type, i) => (
            <span key={`${type}-${String(i)}`} className={`py-0.5 px-3 text-xs shadow-md rounded bg-${(type?.type?.name)} text-white capitalize font-medium font-flexo`}>
              {type?.type?.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full xs:w-2/4 h-56 flex relative pokemon-image">
        <Image
          src={props?.sprites?.other?.["official-artwork"]?.front_default ?? props?.sprites?.front_default ?? ""}
          alt={props?.name}
          fill
          className="object-contain"
          loading="lazy"
        />
      </div>
    </Link>
  );
}