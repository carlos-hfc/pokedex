import { Metadata, ResolvingMetadata } from "next";

import { getByName } from "@/services/fetches";

interface Props {
  params: {
    name: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: params.name.charAt(0).toUpperCase() + params.name.slice(1),
  };
}

export default async function Pokemon({ params }: { params: { name: string; }; }) {
  const pokemon = await getByName(params.name);

  return (
    <pre>
      {pokemon.name}
    </pre>
  );
}