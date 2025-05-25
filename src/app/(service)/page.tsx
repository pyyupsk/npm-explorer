"use client"

import type React from "react"

import Link from "next/link"
import Balancer from "react-wrap-balancer"

import SearchForm from "@/components/search-form"
import { Card, CardContent } from "@/components/ui/card"
import { usePopular } from "@/hooks/use-popular"

export default function Page() {
  const { data: popular, isPending } = usePopular()

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="container flex flex-col items-center gap-3 py-16">
        <h1 className="text-center text-3xl font-bold">NPM Explorer</h1>

        <p className="text-muted-foreground text-center">
          <Balancer>
            Search any npm package to explore its metadata, maintainers, and download trends
          </Balancer>
        </p>

        <Card className="mt-6 w-full max-w-xl">
          <CardContent className="flex flex-col gap-6">
            <SearchForm popular={popular} isPending={isPending} />

            <div className="text-muted-foreground text-center text-sm">
              Popular packages:{" "}
              <div className="inline-flex flex-wrap gap-1.5">
                {isPending
                  ? "Loading..."
                  : popular
                    ? popular.map((pkg) => (
                        <Link
                          key={pkg}
                          href={`/package?name=${pkg}`}
                          className="text-foreground underline-offset-1.5 decoration-dotted hover:underline"
                        >
                          {pkg}
                        </Link>
                      ))
                    : "No popular packages"}
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          This is an unofficial tool and is not affiliated with{" "}
          <Link
            href="https://npmjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-1.5 underline decoration-dotted"
          >
            npm, Inc
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
