'use client'

export type SortOption = 'duration' | 'caloriesBurned' | 'rating'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Duration', value: 'duration' },
  { label: 'Calories', value: 'caloriesBurned' },
  { label: 'Rating', value: 'rating' },
]

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded-full border border-border bg-surface py-2 pl-4 pr-9 text-sm font-medium text-foreground outline-none transition hover:border-accent"
        aria-label="Sort by"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort By: {opt.label}
          </option>
        ))}
      </select>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}