export default function Input({ label, error, id, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        id={id}
        className={`h-9 rounded border px-3 text-sm outline-none transition-colors
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
