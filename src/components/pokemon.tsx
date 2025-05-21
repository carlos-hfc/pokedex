import Image from "next/image"
import Link from "next/link"

import { PokemonType } from "@/@types"
import { cn, padId } from "@/utils"

export async function Pokemon(props: PokemonType) {
  const firstType = props?.types?.[0]?.type?.name

  return (
    <Link
      scroll={false}
      href={props?.name}
      className={cn(
        "flex flex-col xs:flex-row items-center w-full h-full xs:h-56 rounded-lg gap-2 xs:gap-4 overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-250 animate-[down_0.5s_linear] before:absolute before:w-full before:h-full before:blur-[150px]",
        `before:bg-${firstType} before:brightness-[95%]`,
        `shadow-[0_10px_25px,0_-1px_25px] shadow-${firstType}/50`,
      )}
    >
      <div className="w-full xs:w-2/4 xs:h-full justify-center items-center xs:items-start flex flex-col pt-6 px-2 pb-0.5 xs:px-4 xs:py-0 gap-2 z-10">
        <div
          className={cn(
            "text-md font-bold",
            firstType === "dark" ? "text-white" : `text-${firstType}`,
          )}
        >
          {padId(props?.id)}
        </div>

        <h2 className="capitalize font-bold text-2xl xs:text-4xl text-white text-shadow">
          {props?.name}
        </h2>

        <div className="flex flex-wrap gap-1 justify-center lg:justify-normal">
          {props?.types?.map((type, i) => (
            <span
              key={`${type}-${String(i)}`}
              className={cn(
                "py-0.5 px-3 text-xs shadow-md rounded text-white capitalize font-medium font-flexo",
                `bg-${type?.type?.name}`,
              )}
            >
              {type?.type?.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full xs:w-2/4 h-56 flex relative after:absolute after:w-full after:h-full after:bg-pokeball after:bg-no-repeat after:bg-center after:bg-contain after:rotate-[-25deg] after:invert after:opacity-20 after:-z-10 after:xs:-right-16">
        <Image
          src={
            props?.sprites?.other?.["official-artwork"]?.front_default ??
            props?.sprites?.front_default ??
            ""
          }
          alt={props?.name}
          fill
          className="object-contain transition-transform animate-[toRight_0.5s_linear]"
          loading="lazy"
        />
      </div>
    </Link>
  )
}
