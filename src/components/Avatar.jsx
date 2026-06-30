export default function Avatar({ name = '', size = 'md' }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  const sizes = { sm: 'h-7 w-7 text-xs', md: 'h-8 w-8 text-sm', lg: 'h-10 w-10 text-base' }
  return (
    <div className={`${sizes[size]} flex items-center justify-center rounded-full bg-brand-500 font-semibold text-white select-none`}>
      {initials || '?'}
    </div>
  )
}
