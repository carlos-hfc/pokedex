import { Suspense } from "react";

import { SearchPokemon } from "@/@types";

import { Filter } from "@/components/Filter";
import { Pagination } from "@/components/Pagination";
import { Pokemon } from "@/components/Pokemon";

import { FilterProvider } from "@/contexts/FilterContext";

import { getAll } from "@/services/fetches";

import '@/styles/main.min.css';

export default async function Home({
  searchParams,
}: {
  params: { slug: string; };
  searchParams: SearchPokemon;
}) {
  const pokemons = await getAll(searchParams);

  return (
    <FilterProvider>
      <main className="flex min-h-screen flex-col mx-auto container max-w-7xl px-4 lg:px-8 gap-8">
        <div className="flex flex-row h-auto items-center justify-between">
          <Filter />
        </div>

        <Suspense key={searchParams.page + searchParams.name} fallback="loading">
          <div className="grid grid-flow-row-dense md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-6 md:gap-y-8">
            {pokemons.data?.map((p, i) => (
              <Pokemon
                key={i}
                {...p}
              />
            ))}
          </div>
        </Suspense>

        <Pagination totalCount={pokemons.total} />
      </main>
    </FilterProvider>
  );
}
