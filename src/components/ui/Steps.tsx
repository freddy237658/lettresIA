interface StepsProps {
  steps: string[]
  current: number
}

export function Steps({ steps, current }: StepsProps) {
  return (
    <ol className="flex items-center gap-3 sm:gap-6">
      {steps.map((label, i) => {
        const index = i + 1
        const state = index < current ? 'done' : index === current ? 'active' : 'todo'
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                state === 'done'
                  ? 'bg-emerald-500 text-white'
                  : state === 'active'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {state === 'done' ? <i className="bi bi-check-lg" aria-hidden /> : index}
            </span>
            <span className={`hidden text-sm font-medium sm:inline ${state === 'todo' ? 'text-slate-400' : 'text-slate-800'}`}>
              {label}
            </span>
            {index < steps.length && <span className="hidden h-px w-8 bg-slate-200 sm:inline-block" />}
          </li>
        )
      })}
    </ol>
  )
}
