import type { NextRequest } from "next/server"

import { BADGE_COLORS, generateBadge } from "@/features/badge/utils/badge"
import { generateETag } from "@/features/badge/utils/e-tag"
import { handleRequest } from "@/features/badge/utils/handle-request"
import { formatNumber } from "@/features/package/utils/format-number"
import { client } from "@/lib/client"

export async function GET(request: NextRequest) {
  const { pkg, label, labelColor, valueColor } = await handleRequest(request, "downloads", false)

  try {
    const response = await client.downloads.total.$get({ name: pkg })

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    const total = await response.json()

    if (total === -1) {
      throw new Error("not found")
    }

    const formattedCount = formatNumber(total)

    const svg = generateBadge({
      label,
      value: formattedCount,
      labelColor,
      valueColor,
    })

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        ETag: generateETag(pkg, label, formattedCount),
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
