import { SiMaildotru, SiGithub, SiBluesky } from "@icons-pack/react-simple-icons"

type Social = {
  href: string
  icon: React.ElementType
  name: string
}

const email: Social = {
  href: "mailto:contact@fasu.dev",
  icon: SiMaildotru,
  name: "Email",
}

const gitHub: Social = {
  href: "https://github.com/pyyupsk",
  icon: SiGithub,
  name: "GitHub",
}

const bluesky: Social = {
  href: "https://bsky.app/profile/fasu.dev",
  icon: SiBluesky,
  name: "Bluesky",
}

export const socials: Social[] = [email, gitHub, bluesky]
