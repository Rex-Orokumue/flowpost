import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../components/Button'

test('renders children', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})

test('calls onClick', async () => {
  const handler = vi.fn()
  render(<Button onClick={handler}>Go</Button>)
  await userEvent.click(screen.getByText('Go'))
  expect(handler).toHaveBeenCalledTimes(1)
})

test('shows spinner and disables when loading', () => {
  render(<Button loading>Save</Button>)
  expect(screen.getByRole('button')).toBeDisabled()
})

test('ghost variant has no background', () => {
  render(<Button variant="ghost">Ghost</Button>)
  expect(screen.getByRole('button')).toHaveClass('bg-transparent')
})
