import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { client } from "@/lib/client"

export type DownloadPeriod = "last-day" | "last-week" | "last-month" | "last-year"

export function useDownloads(pkg: string) {
  const [period, setPeriod] = useState<DownloadPeriod>("last-day")

  const {
    data,
    isPending,
    refetch: handleRefetch,
  } = useQuery({
    queryKey: ["downloads", period, "data"],
    queryFn: async () => {
      const res = await client.downloads.range.$get({ name: pkg, period })
      return await res.json()
    },
  })

  function handlePeriodChange(value: DownloadPeriod) {
    setPeriod(value)
    handleRefetch()
  }

  return {
    data,
    isPending,
    period,
    handlePeriodChange,
  }
}
