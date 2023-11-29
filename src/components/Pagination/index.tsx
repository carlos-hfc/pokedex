import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";

import { DOTS } from '@/constants';
import { usePagination } from "@/hooks/usePagination";

interface PaginationProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  siblingCount?: number;
  totalCount: number;
}

export function Pagination(props: PaginationProps) {
  const paginationRange = usePagination(props);

  if (props.currentPage === 0 || paginationRange.length < 2) return null;

  const nextPage = useCallback(() => {
    props.onPageChange(props.currentPage + 1);
  }, [props.currentPage]);

  const prevPage = useCallback(() => {
    props.onPageChange(props.currentPage - 1);
  }, [props.currentPage]);

  const LAST_PAGE = paginationRange[paginationRange?.length - 1];

  return (
    <nav aria-label="Paginação de Pokémons" className="pagination">
      <ul className="flex gap-2 items-center justify-center">
        <li className="flex items-center justify-center">
          <button
            className="border-2 border-white rounded-lg w-10 h-10 flex items-center justify-center text-2xl disabled:opacity-60 disabled:pointer-events-none"
            aria-label="Anterior"
            onClick={prevPage}
            disabled={props.currentPage === 1}
          >
            <ChevronLeftIcon
              className="stroke-white"
              aria-hidden="true"
              width={24}
              height={24}
              strokeWidth={2.5}
            />
          </button>
        </li>

        {paginationRange?.map((page, i) => (
          <li
            key={`${page}--${i}`}
            className={`flex items-center justify-center ${props.currentPage === page ? "active" : ""}`}
            aria-current={props.currentPage === page ? "page" : "false"}
          >
            <button
              className="border-2 border-white rounded-lg w-10 h-10 flex items-center justify-center text-2xl font-semibold text-white"
              onClick={() => page !== DOTS && props.onPageChange(Number(page))}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="flex items-center justify-center">
          <button
            className="border-2 border-white rounded-lg w-10 h-10 flex items-center justify-center text-2xl disabled:opacity-60 disabled:pointer-events-none"
            aria-label="Próximo"
            onClick={nextPage}
            disabled={props.currentPage === LAST_PAGE}
          >
            <ChevronRightIcon
              className="stroke-white"
              aria-hidden="true"
              width={24}
              height={24}
              strokeWidth={2.5}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}