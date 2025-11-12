// src/lib/api.ts
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${res.statusText} – ${msg}`);
  }
  return res.json() as Promise<T>;
}

export type Session = {
  id: string;
  type: "prepa" | "shoot_studio" | "shoot_decor" | "depose";
  start_at: string; // ISO
  end_at: string;   // ISO
  lieu_id: string;
  title?: string | null;
  notes?: string | null;
};

export const api = {
  listSessions: (p?: { from?: string; to?: string; type?: Session["type"]; lieu_id?: string }) => {
    const q = new URLSearchParams(p as any).toString();
    return json<Session[]>(`/sessions${q ? `?${q}` : ""}`);
  },
  listPrestataires: () => json(`/prestataires`),
  listLieux:        () => json(`/lieux`),
  listArticles:     () => json(`/articles`),
};
