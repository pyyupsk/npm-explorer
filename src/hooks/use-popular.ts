import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/client"

export function usePopular() {
  const { data, isPending } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const res = await client.package.popular.$get()
      return await res.json()
    },
  })

  return {
    data,
    isPending,
  }
}
