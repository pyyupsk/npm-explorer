import { SiMaildotru, SiGithub, SiBluesky } from "@icons-pack/react-simple-icons"

export type Social = {
  href: string
  icon: React.ElementType
  name: string
}

export const email: Social = {
  href: "mailto:contact@fasu.dev",
  icon: SiMaildotru,
  name: "Email",
}

export const gitHub: Social = {
  href: "https://github.com/pyyupsk",
  icon: SiGithub,
  name: "GitHub",
}

export const bluesky: Social = {
  href: "https://bsky.app/profile/fasu.dev",
  icon: SiBluesky,
  name: "Bluesky",
}

export const socials: Social[] = [email, gitHub, bluesky]
