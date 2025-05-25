import type { NextRequest } from "next/server"

import { BADGE_COLORS, generateBadge } from "@/features/badge/utils/badge"
import { generateETag } from "@/features/badge/utils/e-tag"
import { handleRequest } from "@/features/badge/utils/handle-request"

export async function GET(request: NextRequest) {
  const { pkg, metadata, label, labelColor, valueColor } = await handleRequest(request, "version")

  try {
    const version = metadata["dist-tags"]?.latest ?? "unknown"

    const svg = generateBadge({
      label,
      value: version,
      labelColor,
      valueColor,
    })

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        ETag: generateETag(pkg, label, version),
      },
    })
  } catch (error) {
    console.error(`Error generating badge for ${pkg}:`, error)

    const value = error instanceof Error ? error.message : "error"

    return new Response(
      generateBadge({
        label,
        value,
        labelColor: BADGE_COLORS.error.label,
        valueColor: BADGE_COLORS.error.value,
      }),
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache",
        },
        status: 500,
      },
    )
  }
}
