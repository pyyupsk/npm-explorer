import type { MetadataRoute } from "next"

import { BASE_URL } from "@/constants/domain"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
