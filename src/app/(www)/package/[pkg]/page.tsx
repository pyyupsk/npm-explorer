import { client } from "@/lib/client"

import { DownloadStatistics } from "./_components/download-statistics"
import { MetadataCard } from "./_components/metadata-card"

export default async function Page({ params }: { params: Promise<{ pkg: string }> }) {
  const { pkg } = await params

  const metadataRes = await client.package.metadata.$get({ name: pkg })
  const metadata = await metadataRes.json()

  return (
    <main className="container flex flex-col gap-6 py-9">
      <MetadataCard metadata={metadata} />
      <DownloadStatistics pkg={pkg} />
    </main>
  )
}
