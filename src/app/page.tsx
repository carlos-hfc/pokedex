import { Input } from "@/components/Input";
import { Pokemon } from "@/components/Pokemon";
import { getAll } from "@/services/fetches";

import '@/styles/main.min.css';

export default async function Home() {
  const pokemons = await getAll();

  return (
    <main className="flex min-h-screen flex-col mx-auto container max-w-7xl px-4 lg:px-8 gap-6">
      <div className="flex flex-col">
        <Input />
      </div>

      <div className="grid grid-flow-row-dense md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-6 md:gap-y-8">
        {pokemons.map(p => (
          <Pokemon
            key={p.url}
            url={p.url}
          />
        ))}
      </div>
    </main>
  );
}
