import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './navbar'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

const mockUseCart = vi.fn()
vi.mock('@/context/CartContext', () => ({
  useCart: () => mockUseCart(),
}))

beforeEach(() => {
  mockUseCart.mockReturnValue({ items: [] })
})

describe('Navbar', () => {
  it('renders the store name', () => {
    render(<Navbar />)
    expect(screen.getByText('Seri Seri Sweets')).toBeDefined()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getAllByRole('link', { name: 'Home' })).toBeDefined()
    expect(screen.getAllByRole('link', { name: 'Menu' })).toBeDefined()
    expect(screen.getAllByRole('link', { name: 'About' })).toBeDefined()
  })

  it('does not show cart badge when cart is empty', () => {
    render(<Navbar />)
    expect(screen.queryByText('0')).toBeNull()
  })

  it('shows cart item count badge when items are in cart', () => {
    mockUseCart.mockReturnValue({
      items: [
        { product: { id: 1, name: 'Croissant', price: '3.50' }, quantity: 2 },
        { product: { id: 2, name: 'Muffin', price: '2.00' }, quantity: 1 },
      ],
    })
    render(<Navbar />)
    expect(screen.getByText('3')).toBeDefined()
  })

  it('mobile menu is hidden by default', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link', { name: 'Home' })
    expect(links.length).toBe(1)
  })

  it('hamburger button opens mobile menu', () => {
    render(<Navbar />)
    const hamburger = screen.getByRole('button', { name: 'Toggle menu' })
    fireEvent.click(hamburger)
    const links = screen.getAllByRole('link', { name: 'Home' })
    expect(links.length).toBe(2)
  })

  it('clicking a mobile menu link closes the menu', () => {
    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
    const mobileLinks = screen.getAllByRole('link', { name: 'Home' })
    fireEvent.click(mobileLinks[mobileLinks.length - 1])
    const linksAfter = screen.getAllByRole('link', { name: 'Home' })
    expect(linksAfter.length).toBe(1)
  })
})
