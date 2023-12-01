import { useFilter } from "@/contexts/FilterContext";

interface TypeProps {
  name: string;
}

export function Type(props: TypeProps) {
  const { handleType, type } = useFilter();

  return (
    <button
      className={`bg-${props.name} capitalize text-white rounded flex items-center w-max px-3 py-1 shadow-md h-min ${type && type !== props.name ? 'opacity-50' : ''} transition-opacity duration-250`}
      onClick={() => handleType(props.name)}
    >
      {props.name}
    </button>
  );
}