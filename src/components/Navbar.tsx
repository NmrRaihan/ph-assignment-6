'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { usePlan } from '@/context/PlanContext'

const NAV_LINKS = [
  { label: 'Workout', href: '/' },
  { label: 'My Plan', href: '/my-plan' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { plan, saved } = usePlan()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          className="rounded-md p-1 text-foreground sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            FitLog
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link href={link.href} className={isActive ? 'text-accent' : 'text-muted transition hover:text-foreground'}>
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
            Plan {plan.length}
          </Link>
          <Link href="/my-plan" className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground">
            Saved {saved.length}
          </Link>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 sm:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    isActive
                      ? 'block rounded-md px-2 py-2 text-sm font-semibold text-accent'
                      : 'block rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-surface'
                  }
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </header>
  )
}