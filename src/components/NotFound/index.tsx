import Image from "next/image";
import Link from "next/link";

export function NotFound() {
  return (
    <main className="h-full flex items-center justify-center px-8">
      <title>Página não encontrada | Pokédex App</title>

      <div className="container max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative max-h-72 w-full aspect-square">
            <Image
              src="/psyduck.png"
              alt="Psyduck"
              fill
              loading="lazy"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col text-center gap-4">
            <h1 className="font-bold text-pokemon-red text-9xl xs:text-[10rem] md:text-[12rem] tracking-wide drop-shadow-text">
              404
            </h1>

            <div className="flex flex-col text-center text-white gap-2">
              <h2 className="font-semibold text-[2rem] leading-10 md:text-[2rem]">Página não encontrada!</h2>
              <p className="font-medium text-base">
                A página que você está procurando não foi encontrada.
                <br />
                Você deve retornar à <Link href="/" className="underline underline-offset-1">home</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}