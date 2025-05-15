import { j, publicProcedure } from "@/server/jstack"

export const packageRouter = j.router({
  popular: publicProcedure.query(async ({ c }) => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/anvaka/8e8fa57c7ee1350e3491/raw/b6f3ebeb34c53775eea00b489a0cea2edd9ee49c/01.most-dependent-upon.md",
        {
          // Cache the response for 1 hour
          next: { revalidate: 3600 },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch popular packages", { cause: response })
      }

      const text = await response.text()

      const top3 = [...text.matchAll(/^\d+\. \[(.+?)\]\(.+?\) - \d+/gm)]
        .slice(0, 3)
        .map((match) => match[1]) // Extract package name

      return c.superjson(top3)
    } catch (error) {
      console.error("Error fetching popular packages:", error)
      throw new Error("Failed to fetch popular packages", { cause: error })
    }
  }),
})
