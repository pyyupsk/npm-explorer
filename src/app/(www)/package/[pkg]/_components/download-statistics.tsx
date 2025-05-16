"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="mb-3" variant="outline">
              Change Period
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["last-day", "last-week", "last-month", "last-year"].map((item) => (
              <DropdownMenuItem key={item} onClick={() => handlePeriodChange(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tabs defaultValue={period} value={period}>
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
