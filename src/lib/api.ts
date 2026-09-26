import type { Workout } from '@/types/workout'

const API_BASE = 'https://api.api-store.workers.dev/api/fitlog'

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE)
  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`)
  }
  return res.json()
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const url = `${API_BASE}/${id}`
  console.log('Fetching:', url)
  const res = await fetch(url)
  console.log('Status:', res.status)
  if (!res.ok) {
    return null
  }
  return res.json()
}