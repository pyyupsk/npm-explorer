"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { client } from "@/lib/client"

import { DownloadsChart } from "./downloads-chart"

export function DownloadStatistics({ pkg }: { pkg: string }) {
  const [period, setPeriod] = useState<string>("last-day")

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

  function handlePeriodChange(value: string) {
    setPeriod(value)
    handleRefetch()
  }

  return (
    <Card>
      <CardContent>
        <h2 className="mb-4 text-xl font-semibold">Download Statistics</h2>

        <Tabs defaultValue={period} onValueChange={handlePeriodChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="last-day">Last Day</TabsTrigger>
            <TabsTrigger value="last-week">Last Week</TabsTrigger>
            <TabsTrigger value="last-month">Last Month</TabsTrigger>
            <TabsTrigger value="last-year">Last Year</TabsTrigger>
          </TabsList>

          <TabsContent value={period} className="mt-0">
            {isPending ? (
              <div className="flex h-[348px] items-center justify-center">
                Loading chart data...
              </div>
            ) : data ? (
              <DownloadsChart data={data} period={period} />
            ) : (
              <div className="flex h-[348px] items-center justify-center">No data available</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
