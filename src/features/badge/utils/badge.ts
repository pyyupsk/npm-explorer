import createDOMPurify from "dompurify"
import { JSDOM } from "jsdom"

const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

export type BadgeConfig = {
  label: string
  value: string
  labelColor?: string
  valueColor?: string
  scale?: number
  labelFontSize?: number
  valueFontSize?: number
}

export const BADGE_COLORS = {
  default: {
    label: "#555",
    value: "#4c1",
  },
  error: {
    label: "#555",
    value: "#e05d44",
  },
}

function sanitize(str: string): string {
  // Use DOMPurify with svg profile enabled for SVG-safe sanitization
  return DOMPurify.sanitize(str, { USE_PROFILES: { svg: true } })
}

export function generateBadge({
  label,
  value,
  labelColor = BADGE_COLORS.default.label,
  valueColor = BADGE_COLORS.default.value,
  scale = 0.1,
  labelFontSize = 110,
}: BadgeConfig): string {
  const charWidth = 6
  const minLabelWidth = 40
  const minValueWidth = 20
  const padding = 5

  const sanitizedLabel = sanitize(label)
  const sanitizedValue = sanitize(value)

  const labelWidth = Math.max(charWidth * label.length + padding * 2, minLabelWidth)
  const valueWidth = Math.max(charWidth * value.length + padding * 2, minValueWidth)
  const totalWidth = labelWidth + valueWidth

  const labelX = labelWidth / 2
  const valueX = labelWidth + valueWidth / 2

  const labelTextLength = labelWidth * 10 - padding * 20
  const valueTextLength = valueWidth * 10 - padding * 20

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${sanitizedLabel}: ${sanitizedValue}">
    <title>${sanitizedLabel}: ${sanitizedValue}</title>
    <linearGradient id="s" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="r">
      <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#r)">
      <rect width="${labelWidth}" height="20" fill="${labelColor}"/>
      <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${valueColor}"/>
      <rect width="${totalWidth}" height="20" fill="url(#s)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="${labelFontSize}">
      <text aria-hidden="true" x="${labelX * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(${scale})" textLength="${labelTextLength}">${sanitizedLabel}</text>
      <text x="${labelX * 10}" y="140" transform="scale(${scale})" fill="#fff" textLength="${labelTextLength}">${sanitizedLabel}</text>
      <text aria-hidden="true" x="${valueX * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(${scale})" textLength="${valueTextLength}">${sanitizedValue}</text>
      <text x="${valueX * 10}" y="140" transform="scale(${scale})" fill="#fff" textLength="${valueTextLength}">${sanitizedValue}</text>
    </g>
  </svg>`
}
