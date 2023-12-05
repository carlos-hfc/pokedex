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

  function handleType(newType: string) {
    if (newType === type) {
      params.delete("type");

      setType("");

      return router.push(`/?${params.toString()}`);
    }

    setType(newType);

    params.delete('name');
    params.delete('page');
    params.set('type', newType);

    return router.push(`/?${params.toString()}`);
  }

  function sendFilter(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      params.delete("name");

      return router.push("/");
    }

    params.delete('page');
    params.delete('type');
    params.set('name', name);

    router.push(`/?${params.toString()}`);
  }

  return (
    <FilterContext.Provider value={value}>
      {props.children}
    </FilterContext.Provider>
  );
}