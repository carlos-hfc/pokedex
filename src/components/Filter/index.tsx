"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

import { FilterTypes } from "../FilterTypes";
import { Input } from "../Input";

export function Filter() {
  const scrollRef = useRef({} as HTMLDivElement);

  function scrollTypes(scroll: number) {
    scrollRef.current.scrollLeft += scroll;
  }

  return (
    <div className="flex flex-col gap-4 w-full sm:flex-row items-center sm:items-end sm:justify-between mb-6">
      <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-2/5 lg:gap-4">
        <h2 className="text-white font-bold text-2xl lg:text-3xl">Pesquisar por tipo</h2>

        <div className="flex flex-row gap-2">
          <button onClick={() => scrollTypes(-114)}>
            <ChevronLeftIcon
              width={24}
              height={24}
              color="#fff"
              strokeWidth={2.5}
            />
          </button>

          <div
            ref={scrollRef}
            className="flex flex-row gap-1 items-center relative overflow-auto filter-type touch-pan-x lg:gap-3 scroll-smooth"
          >
            <FilterTypes />
          </div>

          <button onClick={() => scrollTypes(114)}>
            <ChevronRightIcon
              width={24}
              height={24}
              color="#fff"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-2/5">
        <Input />
      </div>
    </div>
  );
}