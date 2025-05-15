export type DownloadsRange = {
  start: string
  end: string
  package: string
  downloads: Download[]
}

type Download = {
  downloads: number
  day: string
}
