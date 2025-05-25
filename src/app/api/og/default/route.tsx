import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  try {
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h1
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #dbdbdb, #808080)",
                  backgroundClip: "text",
                  color: "transparent",
                  marginLeft: "24px",
                }}
              >
                NPM Explorer
              </h1>
            </div>
            <p
              style={{
                fontSize: "32px",
                color: "#808080",
                maxWidth: "800px",
                margin: "0",
              }}
            >
              Explore npm package metadata and download statistics
            </p>
            <div
              style={{
                display: "flex",
                marginTop: "48px",
                padding: "12px 24px",
                backgroundColor: "#1f1f1f",
                borderRadius: "8px",
                color: "#dbdbdb",
                fontSize: "24px",
              }}
            >
              Metadata • Downloads • Analyze
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating default OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
