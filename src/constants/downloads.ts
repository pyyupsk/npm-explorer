import type { DownloadPeriod } from "@/hooks/use-downloads"

export const DOWNLOAD_PERIODS: DownloadPeriod[] = [
  "last-day",
  "last-week",
  "last-month",
  "last-year",
]

export const CHART_HEIGHT = 300
export const CHART_MARGIN = {
  left: 12,
  right: 12,
}
