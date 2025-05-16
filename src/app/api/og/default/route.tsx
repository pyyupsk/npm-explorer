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
            backgroundColor: "#121212",
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
              {/* TODO: Use logos after getting permission from npm */}
              {/* <svg
                id="n"
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 16 16"
              >
                <path fill="#C12127" d="M0,16V0H16V16ZM3,3V13H8V5h3v8h2V3Z" />
                <path fill="#FFFFFF" d="M3,3H13V13H11V5H8v8H3Z" />
              </svg> */}
              <h1
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #ffffff, #a4a4a4)",
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
                color: "#a4a4a4",
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
                color: "#ffffff",
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
