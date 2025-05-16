import type { Metadata } from "next"
import type { TemplateString } from "next/dist/lib/metadata/types/metadata-types"

import { BASE_URL } from "@/constants/domain"

type MetadataOptions = {
  additionalMetadata?: Partial<Metadata>
  description: string
  image: string
  title: string | TemplateString
}

const DEFAULT_IMAGE_DIMENSIONS = { height: 630, width: 1200 }

export function commonMetadata({
  additionalMetadata = {},
  description,
  image = new URL("/api/og", BASE_URL).href,
  title,
}: MetadataOptions): Metadata {
  const baseMetadata: Metadata = {
    description,
    icons: [
      {
        rel: "icon",
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    metadataBase: new URL(BASE_URL),
    openGraph: {
      description,
      images: image
        ? [
            {
              alt: description,
              url: image,
              ...DEFAULT_IMAGE_DIMENSIONS,
            },
          ]
        : undefined,
      title,
      type: "website",
    },
    title,
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }

  return {
    ...baseMetadata,
    ...additionalMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      ...additionalMetadata.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...additionalMetadata.twitter,
    },
  }
}
