import type { NextRequest } from "next/server"

import { BADGE_COLORS, generateBadge } from "@/features/badge/utils/badge"
import { generateETag } from "@/features/badge/utils/e-tag"
import { handleRequest } from "@/features/badge/utils/handle-request"

export async function GET(request: NextRequest) {
  const { pkg, metadata, label, labelColor, valueColor } = await handleRequest(request, "license")

  try {
    const license = metadata.license ?? "unknown"

    const svg = generateBadge({
      label,
      value: license,
      labelColor,
      valueColor,
    })

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        ETag: generateETag(pkg, label, license),
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
