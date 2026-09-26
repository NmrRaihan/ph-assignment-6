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
                        ? 'flex items-center gap-2 cursor-not-allowed rounded-full bg-border px-6 py-3 text-sm font-semibold text-muted'
                        : 'flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90'
                }
            >
                {isInPlan ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                    </svg>
                )}
                {isInPlan ? "In Today's Plan" : "Add to Today's Plan"}
            </button>

            <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
                </svg>
                Save for Later
            </button>
        </div>
    )
}