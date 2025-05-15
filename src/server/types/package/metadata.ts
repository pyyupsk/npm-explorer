export type PackageMetadata = {
  _id: string
  _rev: string
  name: string
  "dist-tags": DistTags
  versions: Versions
  time: Time
  bugs: Bugs
  author: Author
  license?: string
  homepage: string
  keywords: string[]
  repository: Repository
  description: string
  maintainers: Maintainer[]
  readme: string
  readmeFilename: string
}

type DistTags = {
  latest: string
}

type Versions = {
  [key: string]: VersionMetadata
}

type VersionMetadata = {
  name: string
  version: string
  author: Author
  license: string
  _id: string
  maintainers: Maintainer[]
  homepage: string
  bugs: Bugs
  dist: Dist
  main: string
  _from: string
  types: string
  module: string
  scripts: Scripts
  _npmUser: NpmUser
  _resolved: string
  _integrity: string
  repository: Repository
  _npmVersion: string
  description: string
  directories: Directories
  _nodeVersion: string
  _hasShrinkwrap: boolean
  dependencies: Dependencies
  devDependencies: Dependencies
  peerDependencies: Dependencies
  optionalDependencies: Dependencies
  _npmOperationalInternal: NpmOperationalInternal
}

type Author = {
  name: string
}

type Maintainer = {
  name: string
  email: string
}

type Bugs = {
  url: string
}

type Dist = {
  shasum: string
  tarball: string
  fileCount: number
  integrity: string
  signatures: Signature[]
  unpackedSize: number
}

type Signature = {
  sig: string
  keyid: string
}

type Scripts = {
  [key: string]: string
}

type NpmUser = {
  name: string
  email: string
}

type Repository = {
  url: string
  type: string
}

type Directories = object

type Dependencies = {
  [key: string]: string
}

type NpmOperationalInternal = {
  tmp: string
  host: string
}

type Time = {
  created: string
  modified: string
  [key: string]: string
}
