import { useSearchParams } from "next/navigation";

import { useFilter } from "@/contexts/FilterContext";

interface TypeProps {
  name: string;
}

export function Type(props: TypeProps) {
  const { handleType } = useFilter();

  const searchParams = useSearchParams();

  return (
    <button
      className={`bg-${props.name} capitalize text-white rounded flex items-center w-max px-3 py-1 shadow-md h-min ${searchParams.get("type")?.toString() && searchParams.get("type")?.toString() !== props.name ? 'opacity-50' : ''} transition-opacity duration-250`}
      onClick={() => handleType(props.name)}
    >
      {props.name}
    </button>
  );
}