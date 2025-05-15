export default async function Page({ params }: { params: Promise<{ pkg: string }> }) {
  const { pkg } = await params

  return pkg
}
