import Hero from '@/components/Hero'
import WorkoutGrid from '@/components/WorkoutGrid'
import { getAllWorkouts } from '@/lib/api'


export default async function Home() {
  const workouts = await getAllWorkouts()

  return (
    <main>
      <Hero />
      <WorkoutGrid workouts={workouts} />
    </main>
  )
}