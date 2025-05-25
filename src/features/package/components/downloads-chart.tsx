"use client"

import { Download, FileJson, FileSpreadsheet } from "lucide-react"
import { useMemo } from "react"
import { XAxis, CartesianGrid, AreaChart, Area, YAxis } from "recharts"

import type { ChartConfig } from "@/components/ui/chart"
import type { DownloadPeriod } from "@/features/package/hooks/use-downloads"
import type { ExportData } from "@/features/package/utils/export"
import type { InferOutput } from "@/server"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CHART_MARGIN } from "@/constants/downloads"
import { calculateTotalDownloads, prepareChartData } from "@/features/package/utils/chart"
import { exportAsCSV, exportAsJSON } from "@/features/package/utils/export"
import { formatNumber } from "@/features/package/utils/format-number"

type DownloadsChartProps = {
  data: InferOutput["downloads"]["range"]
  period: string
}

const chartConfig = {} satisfies ChartConfig

export function DownloadsChart({ data, period }: DownloadsChartProps) {
  const chartData = useMemo(() => prepareChartData(data, period as DownloadPeriod), [data, period])
  const totalDownloads = useMemo(() => calculateTotalDownloads(data?.downloads), [data])

  if (!data || !data.downloads || data.downloads.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No download data available</p>
      </Card>
    )
  }

  const formatData: ExportData = {
    package: data.package,
    period: period,
    start: data.start,
    end: data.end,
    downloads: data.downloads,
  }

  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <h3 className="text-lg font-medium">Downloads: {data.package}</h3>
        <div className="flex items-center justify-between gap-3 md:justify-end">
          <div className="text-muted-foreground text-sm">
            Total: <span className="font-medium">{totalDownloads.toLocaleString()}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportAsCSV(formatData)}>
                <FileSpreadsheet className="h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportAsJSON(formatData)}>
                <FileJson className="h-4 w-4" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart accessibilityLayer data={chartData} margin={CHART_MARGIN}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" tickMargin={8} />
          <YAxis tickFormatter={formatNumber} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="downloads"
            fill="var(--primary)"
            fillOpacity={0.4}
            stroke="var(--primary)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
