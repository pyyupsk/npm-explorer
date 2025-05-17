export type PackageMetadata = {
  _id: string
  _rev: string
  name: string
  versions: Record<string, VersionMetadata>
  // Optional fields
  "dist-tags"?: DistTags
  description?: string
  time?: Time
  maintainers?: Maintainer[]
  repository?: Repository
  license?: string
  readme?: string
  homepage?: string
  keywords?: string[]
  author?: Author
  bugs?: Bugs
}

type VersionMetadata = {
  name: string
  version: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  scripts?: Record<string, string>
  main?: string
  module?: string
  types?: string
  bin?: string | Record<string, string>
  files?: string[]
  license?: string
  repository?: Repository
  author?: Author | string
  maintainers?: Maintainer[]
  engines?: Record<string, string>
  homepage?: string
  keywords?: string[]
  bugs?: Bugs
}

type DistTags = {
  latest?: string
  [tag: string]: string | undefined
}

type Time = {
  created?: string
  modified?: string
  [version: string]: string | undefined
}

type Maintainer = {
  name: string
  email?: string
}

type Repository = {
  type?: string
  url?: string
}

type Author = {
  name?: string
  email?: string
  url?: string
}

type Bugs = {
  url?: string
  email?: string
}
