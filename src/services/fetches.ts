import axios from "axios";

import { api } from "./api";
import { PokemonResponse, PokemonType } from "@/@types";

export async function getAll() {
  const response = await api.get<PokemonResponse>("/pokemon");

  return response.data.results;
}

export async function getByUrl(url: string) {
  const response = await axios.get<PokemonType>(url);

  return response.data;
}

export async function getByName(name: string) {
  const response = await api.get(`/pokemon/${name}`);

  return response.data;
}