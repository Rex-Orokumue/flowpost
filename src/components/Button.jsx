import Spinner from './Spinner'

const base = 'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded'

const variants = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
  secondary: 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
}

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
