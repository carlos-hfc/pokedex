import { useSearchParams } from "next/navigation"

import { useFilter } from "@/contexts/FilterContext"
import { cn } from "@/utils"

interface TypeProps {
  name: string
}

export function Type(props: TypeProps) {
  const { handleType } = useFilter()

  const searchParams = useSearchParams()

  return (
    <button
      className={cn(
        `capitalize text-white rounded flex items-center w-max px-3 py-1 shadow-md h-min transition-opacity duration-250`,
        `bg-${props.name}`,
        searchParams.get("type")?.toString() &&
          searchParams.get("type")?.toString() !== props.name &&
          "opacity-50",
      )}
      onClick={() => handleType(props.name)}
    >
      {props.name}
    </button>
  )
}
