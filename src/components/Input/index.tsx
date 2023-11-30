import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <div className="flex flex-col transition-all duration-250 focus-within:shadow-md focus-within:shadow-pokemon-blue/50 overflow-hidden rounded-md">
      <label
        htmlFor={props.id}
        className="sr-only"
      >
        Pesquisar por Pokémon
      </label>

      <div className="relative overflow-hidden border-4 border-pokemon-blue rounded-md border-r-0">
        <input
          {...props}
          type="text"
          className="w-full bg-transparent py-4 pl-6 pr-20 text-white outline-none focus:shadow focus:shadow-pokemon-blue"
          placeholder="Pesquise por um Pokémon"
        />

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button className="h-full bg-pokemon-blue px-4 flex items-center justify-center">
            <MagnifyingGlassIcon
              width={24}
              height={24}
              color="#fff"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}