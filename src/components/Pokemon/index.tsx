import Image from "next/image";

interface PokemonProps {}

export function Pokemon() {
  return (
    <article className="flex h-44 rounded-lg gap-4 overflow-hidden shadow-2xl shadow-grass relative border border-neutral-700 before:absolute before:w-44 before:h-44 before:-translate-x-2/4 before:bg-grass before:left-2/4 before:blur-3xl">
      <div className="w-2/4 flex flex-col p-4 gap-1">
        <h2 className="capitalize font-bold text-2xl">
          Nome
        </h2>

        <span className="py-0.5 px-2 w-max text-sm shadow-md rounded-2xl">
          Grass
        </span>
      </div>

      <div className="w-2/4 h-44 flex relative">
        <Image
          src="/next.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </article>
  );
}