// TODO: Use logos after getting permission from npm
// import { SiNpm } from "@icons-pack/react-simple-icons"
import Link from "next/link"

import { ThemeSwitcher } from "@/components/theme-switcher"
import { Separator } from "@/components/ui/separator"

import SearchForm from "./search-form"

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <Link href="/" className="flex items-center space-x-3">
          {/* TODO: Use logos after getting permission from npm */}
          {/* <SiNpm className="h-8 w-8" /> */}
          <span className="text-lg font-bold">NPM Package Explorer</span>
        </Link>
        <div className="flex items-center space-x-3">
          <SearchForm popular={undefined} />
          <Separator orientation="vertical" className="min-h-6" />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
