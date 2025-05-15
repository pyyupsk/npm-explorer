import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { client } from "@/lib/client"

import { DownloadStatistics } from "./_components/download-statistics"
import { MetadataCard } from "./_components/metadata-card"

export default async function Page({ params }: { params: Promise<{ pkg: string }> }) {
  const { pkg } = await params

  const metadataRes = await client.package.metadata.$get({ name: pkg })
  const metadata = await metadataRes.json()
  if (!metadata || Object.keys(metadata).length === 0) {
    return (
      <main className="container flex h-[calc(100vh-130px)] flex-col items-center justify-center gap-3 py-9 text-center">
        <h1 className="text-4xl font-bold">Oops! Package not found</h1>
        <p className="text-muted-foreground">The package you are looking for does not exist.</p>
        <Link href="/" className={buttonVariants({ className: "mt-4" })}>
          Go back
        </Link>
      </main>
    )
  }

  return (
    <main className="container flex flex-col gap-6 py-9">
      <MetadataCard metadata={metadata} />
      <DownloadStatistics pkg={pkg} />
    </main>
  )
}
