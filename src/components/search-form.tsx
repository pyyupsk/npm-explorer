"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"

type Props = {
  popular: (string | undefined)[] | undefined
  isPending?: boolean
}

export default function SearchForm({ popular, isPending }: Props) {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (inputValue) {
        router.push(`/package?name=${inputValue}`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setInputValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder={
            isPending
              ? "Search for an npm package..."
              : popular
                ? `Search for an npm package (e.g. ${popular.join(", ")})...`
                : "Search for an npm package (e.g. next)..."
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-9"
          aria-label="Package name"
        />
      </div>
    </form>
  )
}
