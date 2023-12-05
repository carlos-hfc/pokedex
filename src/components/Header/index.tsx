import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <nav
        className="container max-w-7xl mx-auto p-4 lg:p-8 items-center justify-center flex"
        aria-label="Header"
      >
        <Link href="/">
          <Image
            src="/pokemon.png"
            alt="Pokémon logo"
            width={370}
            height={136}
            className="max-w-full xs:w-64 saturate-0"
          />
        </Link>
      </nav>
    </header>
  );
}