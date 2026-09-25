import type { Workout } from '@/types/workout'

const API_BASE = 'https://api.abcz.workers.dev/api/fitlog'

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE)
  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`)
  }
  return res.json()
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`)
  if (!res.ok) {
    return null
  }
  return res.json()
}