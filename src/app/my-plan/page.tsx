'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePlan } from '@/context/PlanContext'
import PlanMetrics from '@/components/PlanMetrics'
import PlanWorkoutItem from '@/components/PlanWorkoutItem'

type Tab = 'plan' | 'saved'

export default function MyPlanPage() {
  const { plan, saved } = usePlan()
  const [tab, setTab] = useState<Tab>('plan')

  const activeList = tab === 'plan' ? plan : saved
  const minutes = plan.reduce((sum, w) => sum + w.duration, 0)
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0)

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase text-foreground sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8">
        <PlanMetrics count={plan.length} minutes={minutes} calories={calories} />
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        <button
          onClick={() => setTab('plan')}
          className={
            tab === 'plan'
              ? 'border-b-2 border-accent px-4 py-2 text-sm font-semibold text-accent'
              : 'px-4 py-2 text-sm font-semibold text-muted'
          }
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setTab('saved')}
          className={
            tab === 'saved'
              ? 'border-b-2 border-accent px-4 py-2 text-sm font-semibold text-accent'
              : 'px-4 py-2 text-sm font-semibold text-muted'
          }
        >
          Saved
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {activeList.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
            <p className="font-display text-lg font-bold uppercase text-foreground">Nothing Here Yet</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Go to Workouts
            </Link>
          </div>
        ) : (
          activeList.map((workout) => (
            <PlanWorkoutItem
              key={workout.id}
              workout={workout}
              variant={tab === 'plan' ? 'plan' : 'saved'}
            />
          ))
        )}
      </div>
    </main>
  )
}