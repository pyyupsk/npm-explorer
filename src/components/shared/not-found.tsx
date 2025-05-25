import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

type Props = {
  title: string
  description: string
}

export function NotFound({ title, description }: Props) {
  return (
    <main className="bg-background fixed inset-0 z-[9999]">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-3 py-9 text-center">
        <h1 className="text-4xl font-bold">Oops! {title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <Link href="/" className={buttonVariants({ className: "mt-4" })}>
          Go back
        </Link>
      </div>
    </main>
  )
}
