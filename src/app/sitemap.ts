import type { MetadataRoute } from "next"

import type { GitHubCommitsResponse } from "@/types/github"

import { BASE_URL } from "@/constants/domain"

const routeToPath: Record<string, string> = {
  "/": "src/app/page.tsx",
  "/package": "src/app/package/page.tsx",
  "/badge": "src/app/badge",
  "/badge/downloads": "src/app/badge/downloads/route.tsx",
}

async function getLastModified(path: string): Promise<string> {
  const res = await fetch(
    `https://api.github.com/repos/pyyupsk/npm-explorer/commits?path=${path}&per_page=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  )
  const data: GitHubCommitsResponse = await res.json()

  if (data.length > 0 && data[0]?.commit?.committer?.date) {
    return data[0].commit.committer.date as string
  }

  return new Date().toISOString()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = await Promise.all(
    Object.entries(routeToPath).map(async ([route, path]) => {
      const lastModified = await getLastModified(path)
      return {
        url: `${BASE_URL}${route === "/" ? "" : route}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 1,
        images: [`${BASE_URL}/api/og/default`],
      }
    }),
  )

  return entries
}
