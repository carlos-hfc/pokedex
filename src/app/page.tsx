import Image from "next/image";
import { Suspense } from "react";

import Loading from "./loading";

import { SearchPokemon } from "@/@types";
import { Feature } from "@/components/Feature";
import { Filter } from "@/components/Filter";
import { Pagination } from "@/components/Pagination";
import { Pokemon } from "@/components/Pokemon";
import { FilterProvider } from "@/contexts/FilterContext";
import { getAll, getTypes } from "@/services/fetches";

import '@/styles/main.min.css';

interface HomeProps {
  searchParams: SearchPokemon;
}

export default async function Home({ searchParams }: HomeProps) {
  const pokemons = await getAll(searchParams);
  const types = await getTypes();

  return (
    <FilterProvider>
      <Suspense key={searchParams.page + searchParams.name + types + pokemons.data} fallback={<Loading />}>
        <main className="flex flex-col gap-8">
          <Feature />

          <div className="flex flex-col mx-auto container max-w-7xl gap-8 px-4 lg:px-8 py-8">
            <div className="flex flex-row h-auto items-center justify-between">
              <Filter types={types} />
            </div>

            <Suspense key={pokemons.data.join("")} fallback={<Loading />}>
              {pokemons.total <= 0 && (
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <Image
                    src="/pikachu.gif"
                    alt="Pikachu triste"
                    width={497}
                    height={276}
                    loading="lazy"
                    className="object-contain rounded-md"
                  />

                  <strong className="text-white text-3xl">
                    Pokémon não encontrado
                  </strong>
                </div>
              )}

              {pokemons.total > 0 && (
                <div className="grid grid-flow-row-dense md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-6 md:gap-y-8">
                  {pokemons?.data?.map((p, i) => (
                    <Pokemon
                      key={i}
                      {...p}
                    />
                  ))}
                </div>
              )}
            </Suspense>

            {pokemons.total > 1 && (
              <div className="flex items-center justify-center py-8">
                <Pagination totalCount={pokemons.total} />
              </div>
            )}
          </div>
        </main>
      </Suspense>
    </FilterProvider>
  );
}
