import type { Metadata } from "next"

import { DownloadStatistics } from "@/components/download-statistics"
import { MetadataCard } from "@/components/metadata-card"
import { NotFound } from "@/components/not-found"
import { client } from "@/lib/client"
import { commonMetadata } from "@/lib/metadata"

type PackagePageProps = {
  searchParams: Promise<{ name: string | undefined }>
}

export async function generateMetadata({ searchParams }: PackagePageProps): Promise<Metadata> {
  const { name } = await searchParams

  if (!name) {
    return commonMetadata({
      title: "NPM Explorer",
      description: "Explore npm package metadata and download statistics",
      image: "/api/og/default",
    })
  }

  const DEFAULT_TITLE = `${name} | NPM Explorer`
  const DEFAULT_DESCRIPTION = `Explore ${name} npm package statistics and metadata`

  try {
    const metadataRes = await client.package.metadata.$get({ name })
    const metadata = await metadataRes.json()

    if (!metadata || Object.keys(metadata).length === 0) {
      return {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
      }
    }

    const description = metadata.description || DEFAULT_DESCRIPTION

    return commonMetadata({
      title: name,
      description: description,
      image: `/api/og/pkg?q=${name}`,
    })
  } catch (error) {
    console.error(`Error generating metadata for ${name}:`, error)
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    }
  }
}

export default async function Page({ searchParams }: PackagePageProps) {
  const { name } = await searchParams

  if (!name) {
    return (
      <NotFound
        title="Something went wrong"
        description="Please provide a valid package name, e.g. `/package?name=next`"
      />
    )
  }

  const metadataRes = await client.package.metadata.$get({ name })
  const metadata = await metadataRes.json()

  if (!metadata || Object.keys(metadata).length === 0) {
    return (
      <NotFound
        title="Package not found"
        description="The package you are looking for does not exist."
      />
    )
  }

  return (
    <main className="container flex min-h-[calc(100vh-65px)] flex-col gap-6 py-9">
      <MetadataCard metadata={metadata} />
      <DownloadStatistics pkg={name} />
    </main>
  )
}
