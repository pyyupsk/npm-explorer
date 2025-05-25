import type { NextRequest } from "next/server"

import { BADGE_COLORS, generateBadge } from "@/features/badge/utils/badge"
import { generateETag } from "@/features/badge/utils/e-tag"
import { handleRequest } from "@/features/badge/utils/handle-request"

export async function GET(request: NextRequest) {
  try {
    const { pkg, metadata, label, labelColor, valueColor } = await handleRequest(request, "deps")

    const latestVersion = metadata["dist-tags"]?.latest

    if (!latestVersion) {
      throw new Error("Latest version not found")
    }

    const versionData = metadata.versions?.[latestVersion]

    if (!versionData) {
      throw new Error("Version data not found")
    }

    const deps = {
      dependencies: Object.keys(versionData.dependencies ?? {}).length,
      devDependencies: Object.keys(versionData.devDependencies ?? {}).length,
      peerDependencies: Object.keys(versionData.peerDependencies ?? {}).length,
      optionalDependencies: Object.keys(versionData.optionalDependencies ?? {}).length,
    }

    const totalDeps =
      deps.dependencies + deps.devDependencies + deps.peerDependencies + deps.optionalDependencies

    const svg = generateBadge({
      label,
      value: totalDeps.toString(),
      labelColor,
      valueColor,
    })

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
        ETag: generateETag(pkg, label, totalDeps.toString()),
      },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error(`Error generating badge:`, error)

    return new Response(
      generateBadge({
        label: "error",
        value: errorMessage,
        labelColor: BADGE_COLORS.error.label,
        valueColor: BADGE_COLORS.error.value,
      }),
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache",
        },
        status: errorMessage.includes("not found") ? 404 : 500,
      },
    )
  }
}
