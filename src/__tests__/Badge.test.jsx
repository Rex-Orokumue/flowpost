import { render, screen } from '@testing-library/react'
import Badge from '../components/Badge'

test('renders scheduled status', () => {
  render(<Badge status="scheduled" />)
  expect(screen.getByText('scheduled')).toBeInTheDocument()
})

test('renders pending_draft status', () => {
  render(<Badge status="pending_draft" />)
  expect(screen.getByText('pending draft')).toBeInTheDocument()
})
