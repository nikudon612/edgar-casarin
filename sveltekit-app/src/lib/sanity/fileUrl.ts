// src/lib/sanity/fileUrl.ts
import { client } from './client';  

// Given a Sanity file‐ref string ("file-<assetId>-<ext>"), spit back the CDN URL
export function fileUrlFor(ref: string): string {
  // e.g. ref = "file-d71db57f172e85372324df9ae1c4026503d3a03c-webm"
  const m = ref.match(/^file-([^-]+)-([^.]+)$/);
  if (!m) return '';
  const [, assetId, ext] = m;
  const { projectId, dataset } = client.config();
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
}
