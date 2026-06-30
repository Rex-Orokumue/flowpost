export default function Select({ label, error, id, options = [], className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        id={id}
        className={`h-9 rounded border px-3 text-sm outline-none transition-colors bg-white
          ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}
          ${className}`}
        {...props}
      >
        {options.map(({ value, label: optLabel }) => (
          <option key={value} value={value}>{optLabel}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
