import { z } from "zod"

import type { PackageMetadata } from "@/server/types/package/metadata"

import { j, publicProcedure } from "@/server/jstack"

export const packageRouter = j.router({
  metadata: publicProcedure.input(z.object({ name: z.string() })).query(async ({ c, input }) => {
    const pkg = input.name

    try {
      const response = await fetch(`https://registry.npmjs.org/${pkg}`, {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      })

      if (!response.ok) {
        throw new Error(`Package ${pkg} not found`, { cause: response })
      }

      const data = (await response.json()) as PackageMetadata

      return c.superjson(data)
    } catch (error) {
      console.error(`Error fetching package ${pkg}:`, error)
      throw new Error("Failed to fetch package data", { cause: error })
    }
  }),

  popular: publicProcedure.query(async ({ c }) => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/anvaka/8e8fa57c7ee1350e3491/raw/b6f3ebeb34c53775eea00b489a0cea2edd9ee49c/01.most-dependent-upon.md",
        {
          next: { revalidate: 3600 },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch popular packages", { cause: response })
      }

      const text = await response.text()

      const top3 = [...text.matchAll(/^\d+\. \[(.+?)\]\(.+?\) - \d+/gm)]
        .slice(0, 3)
        .map((match) => match[1])

      return c.superjson(top3)
    } catch (error) {
      console.error("Error fetching popular packages:", error)
      throw new Error("Failed to fetch popular packages", { cause: error })
    }
  }),
})
