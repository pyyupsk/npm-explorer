import type { DownloadPeriod } from "@/hooks/use-downloads"

export function formatChartDate(dateString: string, period: DownloadPeriod) {
  const date = new Date(dateString)

  switch (period) {
    case "last-day":
      return date.toLocaleDateString("en-US", { hour: "numeric", minute: "numeric" })
    case "last-week":
      return date.toLocaleDateString("en-US", { weekday: "long" })
    case "last-month":
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    case "last-year":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }
}

export function calculateTotalDownloads(downloads: { downloads: number }[] | undefined) {
  if (!downloads) return 0
  return downloads.reduce((sum: number, item) => sum + item.downloads, 0)
}

export function prepareChartData(
  data: { downloads: { day: string; downloads: number }[] } | undefined,
  period: DownloadPeriod,
) {
  if (!data?.downloads) return []

  return data.downloads.map((item) => ({
    date: formatChartDate(item.day, period),
    downloads: item.downloads,
  }))
}
