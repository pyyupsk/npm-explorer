"use client"

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
import { useDownloads } from "@/hooks/use-downloads"

import { DownloadsChart } from "./downloads-chart"

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
