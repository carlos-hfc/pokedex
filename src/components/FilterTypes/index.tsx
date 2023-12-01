import { Type } from "../Type";

import { getTypes } from "@/services/fetches";

export async function FilterTypes() {
  const types = await getTypes();

  return (
    <>
      {types?.map(type => (
        <Type
          key={type.name}
          name={type.name}
        />
      ))}
    </>
  );
}