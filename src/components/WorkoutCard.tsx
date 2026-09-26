import Link from 'next/link'
import Image from 'next/image'
import type { Workout } from '@/types/workout'

interface WorkoutCardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout

  return (
    <Link
      href={`/workout/${id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-accent"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold uppercase text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted">{equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted">
          <span className="flex items-center gap-1">⏱ {duration} min</span>
          <span className="flex items-center gap-1">🔥 {caloriesBurned} kcal</span>
          <span className="ml-auto flex items-center gap-1 font-semibold text-foreground">
            ⭐ {rating}
          </span>
        </div>
      </div>
    </Link>
  )
}