import { ExternalLink, Calendar, User } from "lucide-react"

import type { InferOutput } from "@/server"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type MetadataCardProps = {
  metadata: InferOutput["package"]["metadata"]
}

export function MetadataCard({ metadata }: MetadataCardProps) {
  const latestVersion = metadata["dist-tags"]?.latest || "Unknown"
  const description = metadata.description || "No description available"
  const repository = metadata.repository?.url?.replace(/^git\+|\.git$/g, "") || null
  const homepage = metadata.homepage || null
  const license = metadata.license || "Not specified"
  const maintainers = metadata.maintainers || []
  const createdDate = metadata.time?.created
    ? new Date(metadata.time.created).toLocaleDateString()
    : "Unknown"
  const modifiedDate = metadata.time?.modified
    ? new Date(metadata.time.modified).toLocaleDateString()
    : "Unknown"
  const keywords = metadata.keywords || []

  return (
    <Card>
      <CardContent>
        <div className="mb-3 flex flex-col items-start justify-between gap-3 md:flex-row">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold">{metadata.name}</h3>
            <Badge>v{latestVersion}</Badge>
            {license && <Badge variant="secondary">{license}</Badge>}
          </div>
          <div className="flex gap-3">
            {repository && (
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                Repository
              </a>
            )}
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                Homepage
              </a>
            )}
          </div>
        </div>

        <p className="mb-3">{description}</p>

        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
          <div>
            <div className="text-muted-foreground mb-2 flex items-center gap-3">
              <Calendar className="h-4 w-4" />
              <span>Created: {createdDate}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-3">
              <Calendar className="h-4 w-4" />
              <span>Last modified: {modifiedDate}</span>
            </div>
          </div>

          <div>
            <div className="text-muted-foreground mb-2 flex items-center gap-3">
              <User className="h-4 w-4" />
              <span>Maintainers:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {maintainers.length > 0 ? (
                maintainers.slice(0, 5).map((maintainer, index) => (
                  <Badge key={index} variant="outline">
                    {maintainer.name}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">No maintainers listed</span>
              )}
              {maintainers.length > 5 && (
                <Badge variant="outline">+{maintainers.length - 5} more</Badge>
              )}
            </div>
          </div>
        </div>

        {keywords.length > 0 && (
          <div className="mt-4">
            <p className="text-muted-foreground mb-2 text-sm">Keywords:</p>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword: string, index: number) => (
                <Badge key={index} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
