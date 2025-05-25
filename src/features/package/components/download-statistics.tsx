"use client"

import type { DownloadsRange } from "@/server/types/downloads/range"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { DOWNLOAD_PERIODS } from "@/constants/downloads"
import { useDownloads } from "@/features/package/hooks/use-downloads"

import { DownloadsChart } from "./downloads-chart"

function renderChartContent(isPending: boolean, data: DownloadsRange | undefined, period: string) {
  const classes = "flex h-[348px] items-center justify-center"

  if (isPending) {
    return <div className={classes}>Loading chart data...</div>
  }

  if (data) {
    return <DownloadsChart data={data} period={period} />
  }

  return <div className={classes}>No data available</div>
}

export function DownloadStatistics({ pkg }: { pkg: string }) {
  const { data, isPending, period, handlePeriodChange } = useDownloads(pkg)

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
            {DOWNLOAD_PERIODS.map((item) => (
              <DropdownMenuItem key={item} onClick={() => handlePeriodChange(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tabs defaultValue={period} value={period}>
          <TabsContent value={period} className="mt-0">
            {renderChartContent(isPending, data, period)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
