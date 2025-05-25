export type GitHubCommitsResponse = GitHubCommitItem[]

export type GitHubCommitItem = {
  sha: string
  node_id: string
  commit: GitCommitData
  url: string
  html_url: string
  comments_url: string
  author: GitUserProfile | null
  committer: GitUserProfile | null
  parents: GitCommitParent[]
}

export type GitCommitData = {
  author: GitCommitPerson
  committer: GitCommitPerson
  message: string
  tree: GitTree
  url: string
  comment_count: number
  verification: GitVerification
}

export type GitCommitPerson = {
  name: string
  email: string
  date: string
}

export type GitTree = {
  sha: string
  url: string
}

export type GitVerification = {
  verified: boolean
  reason: string
  signature: string | null
  payload: string | null
  verified_at: string | null
}

export type GitUserProfile = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  user_view_type: string
}

export type GitCommitParent = {
  sha: string
  url: string
  html_url: string
}
