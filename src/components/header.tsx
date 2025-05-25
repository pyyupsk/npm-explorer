import Link from "next/link"

import SearchForm from "./search-form"

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between space-x-6">
        <Link href="/">
          <span className="text-lg font-bold text-nowrap">NPM Explorer</span>
        </Link>
        <SearchForm popular={undefined} />
      </div>
    </header>
  )
}
