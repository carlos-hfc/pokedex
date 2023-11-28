import { Pokemon } from "@/components/Pokemon";
import { getAll } from "@/services/fetches";

import '@/styles/main.min.css';

export default async function Home() {
  const pokemons = await getAll();

  return (
    <main className="flex min-h-screen flex-col mx-auto container max-w-7xl px-4">
      <div className="grid grid-flow-row-dense lg:grid-cols-3 gap-6 lg:gap-x-6 lg:gap-y-8">
        {pokemons.map(p => (
          <Pokemon key={p.url} url={p.url} />
        ))}
      </div>
    </main>
  );
}
