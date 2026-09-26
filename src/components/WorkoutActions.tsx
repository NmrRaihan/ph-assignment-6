'use client'

import { toast } from 'react-toastify'
import { usePlan } from '@/context/PlanContext'
import type { Workout } from '@/types/workout'

interface WorkoutActionsProps {
  workout: Workout
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { plan, addToPlan, addToSaved } = usePlan()
  const isInPlan = plan.some((w) => w.id === workout.id)
  const planFull = plan.length >= 5

  function handleAddToPlan() {
    const added = addToPlan(workout)
    if (added) {
      toast.success('Added to today\'s plan')
    } else if (isInPlan) {
      toast.warn('Already in today\'s plan')
    } else {
      toast.warn('Plan is full — remove something first')
    }
  }

  function handleSave() {
    const added = addToSaved(workout)
    if (added) {
      toast.success('Saved for later')
    } else {
      toast.warn('Already saved')
    }
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        disabled={isInPlan || planFull}
        className={
          isInPlan || planFull
            ? 'cursor-not-allowed rounded-full bg-border px-6 py-3 text-sm font-semibold text-muted'
            : 'rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90'
        }
      >
        {isInPlan ? '✓ In Today\'s Plan' : '+ Add to Today\'s Plan'}
      </button>
      <button
        onClick={handleSave}
        className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
      >
        ♡ Save for Later
      </button>
    </div>
  )
}