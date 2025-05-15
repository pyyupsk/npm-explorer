import { SiNpm } from "@icons-pack/react-simple-icons"
import Link from "next/link"

import SearchForm from "./search-form"

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <Link href="/" className="flex items-center space-x-3">
          <SiNpm className="h-8 w-8" />
          <span className="text-lg font-bold">NPM Package Explorer</span>
        </Link>
        <div className="flex items-center space-x-3">
          <SearchForm popular={undefined} />
        </div>
      </div>
    </header>
  )
}
