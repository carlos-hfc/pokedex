"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className={`w-full ${pathname === '/' ? "absolute top-0 left-0 z-10" : ""}`}>
      <nav
        className="container max-w-7xl mx-auto p-4 lg:px-8 items-center justify-center flex"
        aria-label="Header"
      >
        <Link href="/" scroll={false}>
          <Image
            src="/pokemon.png"
            alt="Pokémon logo"
            width={370}
            height={136}
            className="max-w-full w-72 saturate-0"
          />
        </Link>
      </nav>
    </header>
  );
}