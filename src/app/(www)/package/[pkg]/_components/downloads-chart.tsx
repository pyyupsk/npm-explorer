"use client"

import { Download, FileJson, FileSpreadsheet } from "lucide-react"
import { useMemo } from "react"
import { XAxis, CartesianGrid, AreaChart, Area, YAxis } from "recharts"

import type { ChartConfig } from "@/components/ui/chart"
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
import { formatNumber } from "@/utils/format-number"

type DownloadsChartProps = {
  data: InferOutput["downloads"]["range"]
  period: string
}

const chartConfig = {} satisfies ChartConfig

export function DownloadsChart({ data, period }: DownloadsChartProps) {
  const formatDate = (dateString: string, period: string) => {
    const date = new Date(dateString)

    if (period === "last-day") {
      return date.toLocaleDateString("en-US", { hour: "numeric", minute: "numeric" })
    } else if (period === "last-week") {
      return date.toLocaleDateString("en-US", { weekday: "long" })
    } else if (period === "last-month") {
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    } else if (period === "last-year") {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  const chartData = useMemo(() => {
    if (!data || !data.downloads) return []

    return data.downloads.map((item) => ({
      date: formatDate(item.day, period),
      downloads: item.downloads,
    }))
  }, [data, period])

  const totalDownloads = useMemo(() => {
    if (!data || !data.downloads) return 0
    return data.downloads.reduce((sum: number, item) => sum + item.downloads, 0)
  }, [data])

  const exportAsCSV = () => {
    if (!data || !data.downloads) return

    let csv = "Date,Downloads\n"

    data.downloads.forEach((item) => {
      csv += `${item.day},${item.downloads}\n`
    })

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${data.package}-${period}-downloads.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportAsJSON = () => {
    if (!data || !data.downloads) return

    const exportData = {
      package: data.package,
      period: period,
      start: data.start,
      end: data.end,
      downloads: data.downloads,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${data.package}-${period}-downloads.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!data || !data.downloads || data.downloads.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No download data available</p>
      </Card>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Downloads: {data.package}</h3>
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground mr-2 text-sm">
            Total: <span className="font-medium">{totalDownloads.toLocaleString()}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportAsCSV}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportAsJSON}>
                <FileJson className="mr-2 h-4 w-4" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
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
