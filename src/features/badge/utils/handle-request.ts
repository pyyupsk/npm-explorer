import type { NextRequest } from "next/server"

import type { PackageMetadata } from "@/server/types/package/metadata"

import { BADGE_COLORS } from "@/features/badge/utils/badge"
import { client } from "@/lib/client"

type BadgeData = {
  pkg: string
  metadata: PackageMetadata
  label: string
  labelColor: string
  valueColor: string
}

export async function handleRequest(
  request: NextRequest,
  defaultLabel: string,
  includeMetadata = true,
): Promise<BadgeData> {
  const searchParams = request.nextUrl.searchParams
  const pkg = searchParams.get("q")

  if (!pkg?.trim()) {
    throw new Error("Package name is required")
  }

  const label = searchParams.get("label")?.trim() ?? defaultLabel
  const labelColor = searchParams.get("labelColor")?.trim() ?? BADGE_COLORS.default.label
  const valueColor = searchParams.get("valueColor")?.trim() ?? BADGE_COLORS.default.value

  try {
    let metadata = {} as PackageMetadata

    if (includeMetadata) {
      const response = await client.package.metadata.$get({ name: pkg })

      if (!response.ok) {
        throw new Error(
          `Failed to fetch package metadata: ${response.status} ${response.statusText}`,
        )
      }

      const data = await response.json()

      if (!data || typeof data !== "object") {
        throw new Error("Invalid package metadata response")
      }

      metadata = data as PackageMetadata
    }

    return { pkg, metadata, label, labelColor, valueColor }
  } catch (error) {
    console.error(`Error fetching package ${pkg}:`, error)
    throw new Error("Failed to fetch package data", { cause: error })
  }
}
