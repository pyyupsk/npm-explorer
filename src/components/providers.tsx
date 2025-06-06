"use client"

import type { PropsWithChildren } from "react"

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HTTPException } from "hono/http-exception"
import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { Provider as WrapBalancerProvider } from "react-wrap-balancer"

import { Toaster } from "@/components/ui/sonner"

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              // global error handling, e.g. toast notification ...
            }
          },
        }),
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <WrapBalancerProvider>{children}</WrapBalancerProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
