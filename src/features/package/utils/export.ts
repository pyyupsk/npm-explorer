export type ExportData = {
  package: string
  period: string
  start: string
  end: string
  downloads: { day: string; downloads: number }[]
}

export function exportAsCSV(data: ExportData) {
  if (!data?.downloads) return

  let csv = "Date,Downloads\n"
  data.downloads.forEach((item) => {
    csv += `${item.day},${item.downloads}\n`
  })

  downloadFile(csv, `${data.package}-${data.period}-downloads.csv`, "text/csv;charset=utf-8;")
}

export function exportAsJSON(data: ExportData) {
  if (!data?.downloads) return

  const exportData = {
    package: data.package,
    period: data.period,
    start: data.start,
    end: data.end,
    downloads: data.downloads,
  }

  downloadFile(
    JSON.stringify(exportData, null, 2),
    `${data.package}-${data.period}-downloads.json`,
    "application/json",
  )
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
