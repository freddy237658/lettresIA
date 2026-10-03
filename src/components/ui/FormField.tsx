import type { TemplateField } from '@/types'

interface FormFieldProps {
  field: TemplateField
  value: string
  onChange: (value: string) => void
  error?: string
}

const inputBase =
  'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-100'

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  const borderClass = error ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-indigo-400'

  return (
    <div className={field.half ? 'sm:col-span-1' : 'sm:col-span-2'}>
      <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {field.label}
        {field.required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={4}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${borderClass} resize-none`}
        />
      ) : field.type === 'select' ? (
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${borderClass}`}
        >
          <option value="">Sélectionner…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${borderClass}`}
        />
      )}

      {error && <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  )
}
