import Link from "next/link"

import { buttonVariants } from "./ui/button"

export function NotFound({ title, description }: { title: string; description: string }) {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-3 py-9 text-center">
      <h1 className="text-4xl font-bold">Oops! {title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Link href="/" className={buttonVariants({ className: "mt-4" })}>
        Go back
      </Link>
    </main>
  )
}
