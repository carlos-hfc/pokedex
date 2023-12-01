import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from "next/navigation";
import { InputHTMLAttributes } from "react";

import { useFilter } from "@/contexts/FilterContext";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const { handleName, sendFilter } = useFilter();

  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col transition-all duration-250 focus-within:shadow-md focus-within:shadow-pokemon-blue/50 overflow-hidden rounded-md">
      <label
        htmlFor={props.id}
        className="sr-only"
      >
        Pesquisar por Pokémon
      </label>

      <form
        onSubmit={sendFilter}
        className="relative overflow-hidden border-4 border-pokemon-blue rounded-md border-r-0"
      >
        <input
          type="text"
          className="w-full bg-transparent py-3 pl-6 pr-20 text-white outline-none focus:shadow focus:shadow-pokemon-blue"
          placeholder="Pesquise por um Pokémon"
          defaultValue={searchParams?.get("name")?.toString() ?? ""}
          onChange={handleName}
        />

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            className="h-full bg-pokemon-blue px-4 flex items-center justify-center"
            type="submit"
          >
            <MagnifyingGlassIcon
              width={24}
              height={24}
              color="#fff"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </form>
    </div>
  );
}