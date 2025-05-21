import { useMemo } from "react"

import { DOTS, PAGE_SIZE } from "@/constants"

interface UsePaginationProps {
  totalCount: number
  currentPage: number
  siblingCount?: number
}

function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, i) => i + start)
}

export function usePagination({
  siblingCount = 2,
  totalCount,
  currentPage,
}: UsePaginationProps) {
  const paginationRange = useMemo<Array<number | string>>(() => {
    const totalPageCount = Math.ceil(totalCount / PAGE_SIZE)

    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    )

    const shoudlShowLeftDots = leftSiblingIndex > 2
    const shoudlShowRightDots = rightSiblingIndex < totalPageCount - 2

    if (!shoudlShowLeftDots && shoudlShowRightDots) {
      const leftItemCount = 5 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shoudlShowLeftDots && !shoudlShowRightDots) {
      const rightItemCount = 5 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      )

      return [1, DOTS, ...rightRange]
    }

    if (shoudlShowLeftDots && shoudlShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [1, DOTS, ...middleRange, DOTS, totalPageCount]
    }

    return []
  }, [siblingCount, totalCount, currentPage])

  return paginationRange
}
