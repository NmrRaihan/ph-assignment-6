import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold uppercase text-foreground sm:text-4xl">
        Nothing Here Yet
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That page doesn&apos;t exist. It might&apos;ve been moved, or the link is broken.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
      >
        Go To Workouts
      </Link>
    </main>
  )
}