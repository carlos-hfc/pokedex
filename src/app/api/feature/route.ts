import { NextResponse } from "next/server";

import { api } from "@/services/api";
import { getAll } from "@/services/fetches";

export async function GET() {
  const { total } = await getAll({ page: '0' });

  const random = (Math.random() * (total - 1) + 1).toFixed(0);

  const feature = await api.get(`/pokemon/${random}`);

  return NextResponse.json(feature.data)
}