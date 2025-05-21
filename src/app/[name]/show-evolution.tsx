import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

import { PokemonType } from "@/@types"
import { cn, padId } from "@/utils"

type Evolution =
  | {
      current: PokemonType
      next: PokemonType[]
    }
  | PokemonType

export function ShowEvolution(evolution: Evolution) {
  if ("current" in evolution) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between w-full">
        <Link
          href={evolution.current.name}
          className="flex flex-col items-center justify-center relative z-[1] lg:min-w-[33%] before:absolute before:w-full before:h-full before:bg-pokeball before:bg-contain before:bg-center before:bg-no-repeat before:-z-10 before:pointer-events-none before:opacity-10 before:invert before:rotate-[-25deg]"
        >
          <div className="relative flex w-full aspect-square p-4 max-h-36">
            <Image
              src={
                evolution.current.sprites?.other?.["official-artwork"]
                  ?.front_default ?? ""
              }
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
                  key={i}
                  className={cn(
                    "px-3 py-0.5 rounded text-sm shadow",
                    `bg-${item.type.name}`,
                  )}
                >
                  {item.type.name}
                </span>
              ))}
            </div>
          </div>
        </Link>

        <ChevronDownIcon className="w-24 h-24 stroke-[2.5] lg:-rotate-90" />

        <div className="flex flex-row flex-wrap items-center justify-center text-center gap-3 lg:w-1/2 lg:gap-6">
          {evolution.next.map((next, i) => (
            <Link
              key={i}
              href={next.name}
              className="flex flex-col items-center justify-center relative z-[1] before:absolute before:w-full before:h-full before:bg-pokeball before:bg-contain before:bg-center before:bg-no-repeat before:-z-10 before:pointer-events-none before:opacity-10 before:invert before:rotate-[-25deg]"
            >
              <div className="relative flex w-full aspect-square p-4 max-h-36">
                <Image
                  src={
                    next.sprites?.other?.["official-artwork"]?.front_default ??
                    ""
                  }
                  alt={next.name}
                  fill
                  loading="lazy"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-center gap-1">
                <div className="text-xl font-semibold capitalize flex flex-wrap gap-2 lg:text-2xl">
                  {next.name}
                  <span className="text-slate-300">{padId(next.id)}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {next.types.map((item, i) => (
                    <span
                      key={padId(i) + item}
                      className={cn(
                        "px-3 py-0.5 rounded text-sm shadow",
                        `bg-${item.type.name}`,
                      )}
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
    )
  }

  return (
    <Link
      href={evolution.name}
      className="flex flex-col items-center justify-center relative z-[1] before:absolute before:w-full before:h-full before:bg-pokeball before:bg-contain before:bg-center before:bg-no-repeat before:-z-10 before:pointer-events-none before:opacity-10 before:invert before:rotate-[-25deg]"
    >
      <div className="relative flex w-full aspect-square p-4 max-h-36">
        <Image
          src={
            evolution.sprites?.other?.["official-artwork"]?.front_default ?? ""
          }
          alt={evolution.name}
          fill
          loading="lazy"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col text-center gap-1">
        <div className="text-xl font-semibold capitalize flex flex-wrap gap-2 lg:text-2xl">
          {evolution.name}

          <span className="text-slate-300">{padId(evolution.id)}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1">
          {evolution.types.map((item, i) => (
            <span
              key={padId(i) + item}
              className={cn(
                "px-3 py-0.5 rounded text-sm shadow",
                `bg-${item.type.name}`,
              )}
            >
              {item.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
