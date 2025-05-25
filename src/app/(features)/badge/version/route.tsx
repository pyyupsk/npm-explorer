import type { NextRequest } from "next/server"

import { BADGE_COLORS, generateBadge } from "@/features/badge/utils/badge"
import { generateETag } from "@/features/badge/utils/e-tag"
import { client } from "@/lib/client"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const pkg = searchParams.get("q")

  if (!pkg) {
    return new Response("No package provided", { status: 400 })
  }

  const label = searchParams.get("label") ?? "version"
  const labelColor = searchParams.get("labelColor") ?? BADGE_COLORS.default.label
  const valueColor = searchParams.get("valueColor") ?? BADGE_COLORS.default.value

  try {
    const response = await client.package.metadata.$get({ name: pkg })

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    const metadata = await response.json()
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
