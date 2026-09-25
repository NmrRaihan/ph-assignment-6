'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Workout', href: '/' },
  { label: 'My Plan', href: '/my-plan' },
]

interface NavbarProps {
  planCount: number
  savedCount: number
}

export default function Navbar({ planCount, savedCount }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          FitLog
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive ? 'text-accent' : 'text-muted transition hover:text-foreground'}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground"
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
          >
            Saved {savedCount}
          </Link>
        </div>
      </nav>
    </header>
  )
}