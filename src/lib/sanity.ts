import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

type SanityImageSource =
  | { _ref: string }
  | { asset: { _ref: string } }
  | string
  | Record<string, unknown>;

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
