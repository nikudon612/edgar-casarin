// src/routes/[slug]/+page.server.ts
import { loadProjectPage } from '$lib/loaders/projectPageLoader';

export const load = loadProjectPage;
