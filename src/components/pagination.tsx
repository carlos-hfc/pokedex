"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useRouter, useSearchParams } from "next/navigation"

import { DOTS } from "@/constants"
import { usePagination } from "@/hooks/usePagination"
import { cn } from "@/utils"

interface PaginationProps {
  siblingCount?: number
  totalCount: number
}

export function Pagination(props: PaginationProps) {
  const searchParams = useSearchParams()

  const router = useRouter()
  const params = new URLSearchParams(searchParams)

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1

  const paginationRange = usePagination({
    currentPage,
    ...props,
  })

  if (currentPage === 0 || paginationRange.length < 2) return <></>

  const nextPage = () => {
    params.set("page", String(currentPage + 1))

    router.replace(`/?${params.toString()}`)
  }

  const prevPage = () => {
    params.set("page", String(currentPage - 1))

    router.replace(`/?${params.toString()}`)
  }

  const onPageChange = (page: number) => {
    params.set("page", String(page))

    router.replace(`/?${params.toString()}`)
  }

  const LAST_PAGE = paginationRange[paginationRange?.length - 1]

  return (
    <nav aria-label="Paginação de Pokémons">
      <ul className="flex gap-2 items-center justify-center flex-wrap">
        <li className="flex items-center justify-center">
          <button
            className="border-2 border-white rounded-lg w-10 h-10 flex items-center justify-center text-lg disabled:opacity-60 disabled:pointer-events-none"
            aria-label="Anterior"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon
              className="stroke-white"
              aria-hidden
              width={20}
              height={20}
              strokeWidth={2.5}
            />
          </button>
        </li>

        {paginationRange?.map((page, i) => (
          <li
            key={`${page}--${i}`}
            className="flex items-center justify-center"
            aria-current={searchParams.get("page") === page ? "page" : "false"}
          >
            <button
              className={cn(
                "border-2 border-white rounded-lg w-10 h-10 flex items-center justify-center text-lg font-semibold text-white",
                currentPage === page && "bg-pokemon-blue",
              )}
              onClick={() => page !== DOTS && onPageChange(Number(page))}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="flex items-center justify-center">
          <button
            className="border-2 border-white rounded-lg w-10 h-10 flex items-center justify-center text-lg disabled:opacity-60 disabled:pointer-events-none"
            aria-label="Próximo"
            onClick={nextPage}
            disabled={currentPage === LAST_PAGE}
          >
            <ChevronRightIcon
              className="stroke-white"
              aria-hidden
              width={20}
              height={20}
              strokeWidth={2.5}
            />
          </button>
        </li>
      </ul>
    </nav>
  )
}
