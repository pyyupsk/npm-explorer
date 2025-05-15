"use client"

import type React from "react"

import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Balancer from "react-wrap-balancer"

import { NPMIcon } from "@/components/icons/npm"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { client } from "@/lib/client"

export default function Page() {
  const [inputValue, setInputValue] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const { data: popular, isPending } = useQuery({
    queryKey: ["get-recent-post"],
    queryFn: async () => {
      const res = await client.package.popular.$get()
      return await res.json()
    },
  })

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="container flex flex-col items-center gap-3 py-16">
        <NPMIcon className="h-12 w-12" />

        <h1 className="text-center text-3xl font-bold">NPM Package Explorer</h1>

        <p className="text-muted-foreground text-center">
          <Balancer>
            Search any npm package to explore its metadata, maintainers, and download trends
          </Balancer>
        </p>

        <Card className="mt-6">
          <CardContent className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex w-xl gap-2">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder={`Search for an npm packages (e.g. ${popular ? popular.join(", ") : "geothai"})...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="pl-10"
                  aria-label="Package name"
                />
              </div>
            </form>
            <p className="text-muted-foreground text-center text-sm">
              Popular packages:{" "}
              {isPending ? (
                "Loading..."
              ) : (
                <span className="inline-flex flex-wrap gap-1.5">
                  {popular
                    ? popular.map((pkg) => (
                        <Link
                          key={pkg}
                          href={`/package/${pkg}`}
                          className="text-foreground hover:underline"
                        >
                          {pkg}
                        </Link>
                      ))
                    : "No popular packages"}
                </span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
