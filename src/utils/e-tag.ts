export function generateETag(pkg: string, label: string, value: string): string {
  return `W/"${pkg}-${label}-${value}"`
}
