import Link from "next/link"

import { socials } from "@/constants/socials"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container flex h-16 items-center justify-between">
        <p className="text-muted-foreground text-sm leading-loose">
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/pyyupsk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline decoration-dotted underline-offset-3"
          >
            @pyyupsk
          </Link>
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <social.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
