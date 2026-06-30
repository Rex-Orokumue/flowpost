export default function Textarea({ label, error, id, maxLength, className = '', value, onChange, ...props }) {
  const count = typeof value === 'string' ? value.length : 0
  const nearLimit = maxLength && count >= maxLength * 0.85
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`min-h-[120px] rounded border px-3 py-2 text-sm outline-none transition-colors resize-y
          ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}
          ${className}`}
        {...props}
      />
      <div className="flex justify-between">
        {error && <p className="text-xs text-red-500">{error}</p>}
        {maxLength && (
          <p className={`ml-auto text-xs ${nearLimit ? 'text-amber-500' : 'text-gray-400'}`}>
            {count}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
