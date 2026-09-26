import type { Workout } from '@/types/workout'
import WorkoutCard from './WorkoutCard'

interface WorkoutGridProps {
  workouts: Workout[]
}

export default function WorkoutGrid({ workouts }: WorkoutGridProps) {
  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-bold uppercase text-foreground">The Library</h2>
      <p className="mt-2 text-muted">Twelve lifts covering every major muscle group.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  )
}