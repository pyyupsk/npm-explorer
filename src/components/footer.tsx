import Link from "next/link"

import { ThemeSwitcher } from "@/components/theme-switcher"
import { Separator } from "@/components/ui/separator"
import { socials } from "@/constants/socials"

export function Footer() {
  return (
    <footer className="bg-background border-t py-6">
      <div className="container flex items-center justify-between">
        <p className="text-muted-foreground text-sm leading-loose">
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/pyyupsk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline decoration-dotted underline-offset-3 transition-colors duration-200"
          >
            @pyyupsk
          </Link>
        </p>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hidden transition-colors duration-200 md:inline-flex"
            >
              <social.icon className="h-4 w-4" />
            </Link>
          ))}
          <Separator orientation="vertical" className="hidden min-h-6 md:inline-flex" />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="container mt-3 md:hidden">
        <div className="flex items-center justify-center gap-3 border-t py-3">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <social.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
