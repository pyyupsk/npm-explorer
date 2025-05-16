import { z } from "zod"

import type { DownloadPeriod } from "@/hooks/use-downloads"
import type { DownloadsRange } from "@/server/types/downloads/range"

import { DOWNLOAD_PERIODS } from "@/constants/downloads"
import { j, publicProcedure } from "@/server/jstack"

export const downloadsRouter = j.router({
  range: publicProcedure
    .input(z.object({ name: z.string(), period: z.custom<DownloadPeriod>() }))
    .query(async ({ c, input }) => {
      const { name, period } = input

      if (!DOWNLOAD_PERIODS.includes(period)) {
        throw new Error(`Invalid period: ${period}`)
      }

      let dateRange: string
      const today = new Date()

      switch (period) {
        case "last-day": {
          const lastDay = new Date(today)
          lastDay.setDate(today.getDate() - 1)
          dateRange = `${formatDate(lastDay)}:${formatDate(today)}`
          break
        }
        case "last-week": {
          const lastWeek = new Date(today)
          lastWeek.setDate(today.getDate() - 7)
          dateRange = `${formatDate(lastWeek)}:${formatDate(today)}`
          break
        }
        case "last-month": {
          const lastMonth = new Date(today)
          lastMonth.setDate(today.getDate() - 30)
          dateRange = `${formatDate(lastMonth)}:${formatDate(today)}`
          break
        }
        case "last-year": {
          const lastYear = new Date(today)
          lastYear.setFullYear(today.getFullYear() - 1)
          dateRange = `${formatDate(lastYear)}:${formatDate(today)}`
          break
        }
        default:
          dateRange = `${formatDate(today)}:${formatDate(today)}`
          break
      }

      try {
        const response = await fetch(`https://api.npmjs.org/downloads/range/${dateRange}/${name}`, {
          headers: {
            Accept: "application/json",
          },
          next: { revalidate: 3600 },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch downloads data for ${name}`, { cause: response })
        }

        const data = (await response.json()) as DownloadsRange

        return c.superjson(data)
      } catch (error) {
        console.error(`Error fetching downloads data for ${name}:`, error)
        throw new Error("Failed to fetch downloads data", { cause: error })
      }
    }),
})

function formatDate(date: Date) {
  return date.toISOString().split("T")[0]
}
