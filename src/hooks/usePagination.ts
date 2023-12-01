import { useMemo } from "react";

import { DOTS, PAGE_SIZE } from "@/constants";

interface UsePaginationProps {
  totalCount: number;
  currentPage: number;
  siblingCount?: number;
}

function range(start: number, end: number) {
  let length = end - start + 1;

  return Array.from({ length }, (_, i) => i + start);
}

export function usePagination({ siblingCount = 2, totalCount, currentPage }: UsePaginationProps) {
  const paginationRange = useMemo<Array<number | string>>(() => {
    const totalPageCount = Math.ceil(totalCount / PAGE_SIZE);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shoudlShowLeftDots = leftSiblingIndex > 2;
    const shoudlShowRightDots = rightSiblingIndex < totalPageCount - 2;

    if (!shoudlShowLeftDots && shoudlShowRightDots) {
      let leftItemCount = 5 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shoudlShowLeftDots && !shoudlShowRightDots) {
      let rightItemCount = 5 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

      return [1, DOTS, ...rightRange];
    }

    if (shoudlShowLeftDots && shoudlShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }

    return [];
  }, [siblingCount, totalCount, currentPage, PAGE_SIZE]);

  return paginationRange;
}