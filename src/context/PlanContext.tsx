'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Workout } from '@/types/workout'

interface PlanContextValue {
  plan: Workout[]
  saved: Workout[]
  addToPlan: (workout: Workout) => boolean
  addToSaved: (workout: Workout) => boolean
  removeFromPlan: (id: number) => void
  removeFromSaved: (id: number) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

const PLAN_KEY = 'fitlog-plan'
const SAVED_KEY = 'fitlog-saved'
const PLAN_CAP = 5

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([])
  const [saved, setSaved] = useState<Workout[]>([])

  // Load from localStorage once, on first mount in the browser.
  useEffect(() => {
    const storedPlan = localStorage.getItem(PLAN_KEY)
    const storedSaved = localStorage.getItem(SAVED_KEY)
    if (storedPlan) setPlan(JSON.parse(storedPlan))
    if (storedSaved) setSaved(JSON.parse(storedSaved))
  }, [])

  // Keep localStorage in sync whenever either list changes.
  useEffect(() => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan))
  }, [plan])

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
  }, [saved])

  function addToPlan(workout: Workout): boolean {
    if (plan.some((w) => w.id === workout.id)) return false
    if (plan.length >= PLAN_CAP) return false
    setPlan((prev) => [...prev, workout])
    return true
  }

  function addToSaved(workout: Workout): boolean {
    if (saved.some((w) => w.id === workout.id)) return false
    setSaved((prev) => [...prev, workout])
    return true
  }

  function removeFromPlan(id: number) {
    setPlan((prev) => prev.filter((w) => w.id !== id))
  }

  function removeFromSaved(id: number) {
    setSaved((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved }}>
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const ctx = useContext(PlanContext)
  if (!ctx) {
    throw new Error('usePlan must be used inside a PlanProvider')
  }
  return ctx
}