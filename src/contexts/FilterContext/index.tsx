"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, ReactNode, createContext, use, useContext, useMemo, useState } from "react";

interface FilterContextProps {
  name: string;
  type: string;
  handleName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleType: (type: string) => void;
  sendFilter: (event: FormEvent) => void;
}

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext({} as FilterContextProps);

export const useFilter = () => useContext(FilterContext);

export function FilterProvider(props: Readonly<FilterProviderProps>) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const value = useMemo(() => ({
    name,
    type,
    handleName,
    handleType,
    sendFilter
  }), [name, type]);

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleType(type: string) {
    setType(prev => prev === type ? '' : type);

    params.set('type', type);

    router.replace(`/?${params.toString()}`);
  }

  function sendFilter(event: FormEvent) {
    event.preventDefault();

    if (!name) return;

    params.set('name', name);

    router.replace(`/?${params.toString()}`);
  }

  return (
    <FilterContext.Provider value={value}>
      {props.children}
    </FilterContext.Provider>
  );
}