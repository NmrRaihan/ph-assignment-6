'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import type { Workout } from '@/types/workout'
import { usePlan } from '@/context/PlanContext'

interface PlanWorkoutItemProps {
  workout: Workout
  variant: 'plan' | 'saved'
}

export default function PlanWorkoutItem({ workout, variant }: PlanWorkoutItemProps) {
  const { removeFromPlan, removeFromSaved } = usePlan()
  const { id, name, image, equipment, duration, caloriesBurned, rating } = workout

  function handleRemove() {
    if (variant === 'plan') {
      removeFromPlan(id)
    } else {
      removeFromSaved(id)
    }
    toast.info(`${name} removed`)
  }

  function handleMarkDone() {
    removeFromPlan(id)
    toast.success(`${name} marked as done!`)
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
        <Image src={image} alt={name} fill sizes="64px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display font-bold uppercase text-foreground">{name}</p>
        <p className="text-xs text-muted">{equipment}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted">
          <span>⏱ {duration} min</span>
          <span>🔥 {caloriesBurned} kcal</span>
          <span>⭐ {rating}</span>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        <Link
          href={`/workout/${id}`}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-accent"
        >
          View Details
        </Link>
        {variant === 'plan' && (
          <button
            onClick={handleMarkDone}
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground"
          >
            ✓ Done
          </button>
        )}
        <button
          onClick={handleRemove}
          aria-label={`Remove ${name}`}
          className="rounded-full border border-border px-2.5 py-1.5 text-xs text-muted transition hover:border-red-500 hover:text-red-400"
        >
          ✕
        </button>
      </div>
    </div>
  )
}