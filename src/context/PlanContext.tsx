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

interface StoredState {
  plan: Workout[]
  saved: Workout[]
  hydrated: boolean
}

const PlanContext = createContext<PlanContextValue | null>(null)

const PLAN_KEY = 'fitlog-plan'
const SAVED_KEY = 'fitlog-saved'
const PLAN_CAP = 5

export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>({ plan: [], saved: [], hydrated: false })
  const { plan, saved, hydrated } = state

  // Load from localStorage once, on first mount in the browser — one setState call.
  useEffect(() => {
    const storedPlan = localStorage.getItem(PLAN_KEY)
    const storedSaved = localStorage.getItem(SAVED_KEY)
    setState({
      plan: storedPlan ? JSON.parse(storedPlan) : [],
      saved: storedSaved ? JSON.parse(storedSaved) : [],
      hydrated: true,
    })
  }, [])

  // Only start writing back to localStorage AFTER the initial load above has
  // completed — otherwise this fires on mount with the empty initial state
  // and wipes out whatever was just loaded.
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan))
  }, [plan, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
  }, [saved, hydrated])

  function addToPlan(workout: Workout): boolean {
    if (plan.some((w) => w.id === workout.id)) return false
    if (plan.length >= PLAN_CAP) return false
    setState((prev) => ({ ...prev, plan: [...prev.plan, workout] }))
    return true
  }

  function addToSaved(workout: Workout): boolean {
    if (saved.some((w) => w.id === workout.id)) return false
    setState((prev) => ({ ...prev, saved: [...prev.saved, workout] }))
    return true
  }

  function removeFromPlan(id: number) {
    setState((prev) => ({ ...prev, plan: prev.plan.filter((w) => w.id !== id) }))
  }

  function removeFromSaved(id: number) {
    setState((prev) => ({ ...prev, saved: prev.saved.filter((w) => w.id !== id) }))
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