import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getWorkoutById } from '@/lib/api'
import WorkoutActions from '@/components/WorkoutActions'

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const { id } = await params
  const workout = await getWorkoutById(id)

  if (!workout) {
    notFound()
  }

  const {
    name,
    image,
    description,
    muscleGroups,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    instructions,
  } = workout

  const specs = [
    { label: 'Equipment', value: equipment },
    { label: 'Difficulty', value: difficulty },
    { label: 'Sets', value: sets },
    { label: 'Reps', value: reps },
    { label: 'Duration', value: `${duration} min` },
    { label: 'Calories', value: `${caloriesBurned} kcal` },
    { label: 'Rating', value: rating },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-xl border border-border lg:h-full">
          <Image src={image} alt={name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-foreground sm:text-4xl">
            {name}
          </h1>
          <p className="mt-3 text-muted">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="uppercase tracking-wide text-muted">{spec.label}</span>
                <span className="font-semibold text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase text-foreground">Instructions</h2>
            <ol className="mt-3 flex flex-col gap-3">
              {instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </main>
  )
}