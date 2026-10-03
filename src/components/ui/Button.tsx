import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-200 hover:brightness-110 active:brightness-95',
  secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
  outline: 'border border-slate-200 text-slate-700 bg-white hover:border-indigo-300 hover:text-indigo-700',
  ghost: 'text-slate-600 hover:bg-slate-100',
  danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
  lg: 'text-base px-6 py-3 gap-2 rounded-xl',
}

const base =
  'inline-flex items-center justify-center font-semibold transition disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, iconRight, fullWidth, className = '', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
})

interface LinkButtonProps extends BaseProps {
  to: string
  className?: string
  children: ReactNode
}

export function LinkButton({ to, variant = 'primary', size = 'md', icon, iconRight, fullWidth, className = '', children }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon}
      {children}
      {iconRight}
    </Link>
  )
}
