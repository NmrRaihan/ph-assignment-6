export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-32">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      <p className="text-sm text-muted">Loading workouts…</p>
    </div>
  )
}