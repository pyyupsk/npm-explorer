import type { NextRequest } from "next/server"

import { ImageResponse } from "next/og"

import { BASE_URL } from "@/constants/domain"
import { formatNumber } from "@/features/package/utils/format-number"
import { client } from "@/lib/client"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pkg = searchParams.get("q")

  if (!pkg) return new Response("No package provided", { status: 400 })

  try {
    const metadataRes = await client.package.metadata.$get({ name: pkg })
    const metadata = await metadataRes.json()

    if (!metadata || Object.keys(metadata).length === 0) {
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1b1b1b",
              fontFamily: "Inter, sans-serif",
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#dbdbdb",
                  marginBottom: "24px",
                }}
              >
                Package Not Found
              </h1>
              <p
                style={{
                  fontSize: "32px",
                  color: "#808080",
                  maxWidth: "800px",
                  margin: "0",
                }}
              >
                The npm package {pkg} could not be found
              </p>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        },
      )
    }

    const downloadsRes = await client.downloads.range.$get({ name: pkg, period: "last-month" })

    let downloadsText = "Download data unavailable"
    if (downloadsRes.ok) {
      const downloadsData = await downloadsRes.json()
      downloadsText = `${formatNumber(downloadsData.downloads.reduce((sum: number, item) => sum + item.downloads, 0))} downloads in the last month`
    }

    const version = metadata["dist-tags"]?.latest ?? "Unknown version"
    const description = metadata.description ?? "No description available"
    const license = metadata.license ?? "No license specified"

    const truncatedDescription =
      description.length > 200 ? description.substring(0, 197) + "..." : description

    // Generate the image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1b1b1b",
            fontFamily: "Inter, sans-serif",
            padding: "40px",
          }}
        >
          {/* Header with NPM logo and package name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #dbdbdb, #808080)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {pkg}
            </h1>
          </div>

          {/* Package description */}
          <p
            style={{
              fontSize: "32px",
              color: "#dbdbdb",
              flex: "1",
            }}
          >
            {truncatedDescription}
          </p>

          {/* Stats section */}
          <div
            style={{
              display: "flex",
              gap: "24px",
            }}
          >
            {/* Version */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1f1f1f",
                borderRadius: "8px",
                padding: "16px 24px",
                flex: "1",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  color: "#808080",
                  margin: "0 0 4px 0",
                }}
              >
                VERSION
              </p>
              <p
                style={{
                  fontSize: "32px",
                  color: "#dbdbdb",
                  margin: "0",
                  fontWeight: "bold",
                }}
              >
                {version}
              </p>
            </div>

            {/* Downloads */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1f1f1f",
                borderRadius: "8px",
                padding: "16px 24px",
                flex: "1",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  color: "#808080",
                  margin: "0 0 4px 0",
                }}
              >
                DOWNLOADS
              </p>
              <p
                style={{
                  fontSize: "32px",
                  color: "#dbdbdb",
                  margin: "0",
                  fontWeight: "bold",
                }}
              >
                {downloadsText}
              </p>
            </div>

            {/* License */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1f1f1f",
                borderRadius: "8px",
                padding: "16px 24px",
                flex: "1",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  color: "#808080",
                  margin: "0 0 4px 0",
                }}
              >
                LICENSE
              </p>
              <p
                style={{
                  fontSize: "32px",
                  color: "#dbdbdb",
                  margin: "0",
                  fontWeight: "bold",
                }}
              >
                {license}
              </p>
            </div>
          </div>

          {/* Footer with app name */}
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                background: "linear-gradient(to right, #dbdbdb, #808080)",
                backgroundClip: "text",
                color: "transparent",
                margin: "0",
              }}
            >
              NPM Explorer
            </p>
            <p
              style={{
                fontSize: "24px",
                color: "#808080",
                margin: "0",
              }}
            >
              {BASE_URL}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)

    // Return a fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1b1b1b",
            fontFamily: "Inter, sans-serif",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #dbdbdb, #808080)",
                backgroundClip: "text",
                color: "transparent",
                marginBottom: "24px",
              }}
            >
              NPM Explorer
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#808080",
                maxWidth: "800px",
                margin: "0",
              }}
            >
              Error generating package preview
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  }
}
