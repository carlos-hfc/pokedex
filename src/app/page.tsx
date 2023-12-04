import { Suspense } from "react";

import Loading from "./loading";

import { SearchPokemon } from "@/@types";

import { Filter } from "@/components/Filter";
import { Pagination } from "@/components/Pagination";
import { Pokemon } from "@/components/Pokemon";

import { FilterProvider } from "@/contexts/FilterContext";

import { getAll, getTypes } from "@/services/fetches";

import '@/styles/main.min.css';

export default async function Home({
  searchParams,
}: {
  params: { slug: string; };
  searchParams: SearchPokemon;
}) {
  const pokemons = await getAll(searchParams);
  const types = await getTypes();

  return (
    <FilterProvider>
      <Suspense key={searchParams.page + searchParams.name + types + pokemons.data} fallback={<Loading />}>
        <main className="flex min-h-screen flex-col mx-auto container max-w-7xl px-4 lg:px-8 gap-8 py-8">
          <div className="flex flex-row h-auto items-center justify-between">
            <Filter types={types} />
          </div>

          <div className="grid grid-flow-row-dense md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-6 md:gap-y-8">
            {pokemons.data?.map((p, i) => (
              <Pokemon
                key={i}
                {...p}
              />
            ))}
          </div>

          <div className="flex items-center justify-center py-8">
            <Pagination totalCount={pokemons.total} />
          </div>
        </main>
      </Suspense>
    </FilterProvider>
  );
}
