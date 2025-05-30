"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Skeleton className="h-8 min-w-[calc(var(--spacing)*8*3)] rounded-full" />

  return (
    <div className="text-muted-foreground shadow-border inline-flex h-8 items-center rounded-full shadow-[0_0_0_1px]">
      {["system", "light", "dark"].map((t) => (
        <button
          aria-label={`Use ${t} theme`}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors duration-200",
            "hover:text-foreground focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none",
            theme === t && "text-foreground shadow-border shadow-[0_0_0_1px]",
          )}
          key={t}
          onClick={() => setTheme(t)}
        >
          {t === "system" && <MonitorIcon className="size-4" />}
          {t === "light" && <SunIcon className="size-4" />}
          {t === "dark" && <MoonIcon className="size-4" />}
        </button>
      ))}
    </div>
  )
}
