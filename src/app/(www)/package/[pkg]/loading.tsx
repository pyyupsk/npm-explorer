import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <main className="container flex h-[calc(100vh-65px)] flex-col items-center justify-center py-9 text-center">
      <Loader2 className="text-muted-foreground size-14 animate-spin" />
    </main>
  )
}
