interface PlanMetricsProps {
  count: number
  minutes: number
  calories: number
}

export default function PlanMetrics({ count, minutes, calories }: PlanMetricsProps) {
  const stats = [
    { label: 'Exercises', value: count },
    { label: 'Minutes', value: minutes },
    { label: 'Calories', value: calories },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-surface p-4 text-center">
          <p className="font-display text-3xl font-bold text-accent">{stat.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}