"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"

type Props = {
  popular: (string | undefined)[] | undefined
}

export default function SearchForm(props: Props) {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue) {
      router.push(`/package/${inputValue}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder={
            props.popular
              ? `Search for an npm package (e.g. ${props.popular ? props.popular.join(", ") : "geothai"})...`
              : "Search for an npm package..."
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10"
          aria-label="Package name"
        />
      </div>
    </form>
  )
}
