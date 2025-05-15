import type React from "react"

import { SiNpm } from "@icons-pack/react-simple-icons"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { Card, CardContent } from "@/components/ui/card"
import { client } from "@/lib/client"

import SearchForm from "./_components/search-form"

export default async function Page() {
  const res = await client.package.popular.$get()
  const popular = await res.json()

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="container flex flex-col items-center gap-3 py-16">
        <SiNpm className="h-12 w-12" />

        <h1 className="text-center text-3xl font-bold">NPM Package Explorer</h1>

        <p className="text-muted-foreground text-center">
          <Balancer>
            Search any npm package to explore its metadata, maintainers, and download trends
          </Balancer>
        </p>

        <Card className="mt-6 w-full max-w-xl">
          <CardContent className="flex flex-col gap-4">
            <SearchForm popular={popular} />

            <p className="text-muted-foreground text-center text-sm">
              Popular packages:{" "}
              <span className="inline-flex flex-wrap gap-1.5">
                {popular
                  ? popular.map((pkg) => (
                      <Link
                        key={pkg}
                        href={`/package/${pkg}`}
                        className="text-foreground underline-offset-1.5 decoration-dotted hover:underline"
                      >
                        {pkg}
                      </Link>
                    ))
                  : "No popular packages"}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
