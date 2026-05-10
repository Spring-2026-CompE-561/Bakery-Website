import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CheckoutPage from './page'

const mockUpdateQuantity = vi.fn()
const mockRemoveFromCart = vi.fn()
const mockClearCart = vi.fn()
const mockUseCart = vi.fn()

vi.mock('@/context/CartContext', () => ({
  useCart: () => mockUseCart(),
}))

const mockProduct = {
  id: 1,
  name: 'Croissant',
  description: 'Buttery',
  price: '3.50',
  img: '',
  picture_url: '',
  badge: null,
  is_available: true,
}

const emptyCart = {
  items: [],
  total: 0,
  updateQuantity: mockUpdateQuantity,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
}

const cartWithItems = {
  items: [{ product: mockProduct, quantity: 2 }],
  total: 7.0,
  updateQuantity: mockUpdateQuantity,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
}

beforeEach(() => {
  vi.clearAllMocks()
  mockUseCart.mockReturnValue(emptyCart)
  vi.stubGlobal('fetch', vi.fn())
})

describe('CheckoutPage', () => {
  it('shows empty cart message when cart is empty', () => {
    render(<CheckoutPage />)
    expect(screen.getByText('Your cart is empty.')).toBeDefined()
  })

  it('renders cart items when cart has products', () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    expect(screen.getByText('Croissant')).toBeDefined()
    expect(screen.getAllByText('$7.00').length).toBeGreaterThan(0)
  })

  it('shows total when cart has items', () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    expect(screen.getByText('Total')).toBeDefined()
  })

  it('Place Order button is disabled when cart is empty', () => {
    render(<CheckoutPage />)
    const button = screen.getByRole('button', { name: 'Place Order' })
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('Place Order button is enabled when cart has items', () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    const button = screen.getByRole('button', { name: 'Place Order' })
    expect(button.hasAttribute('disabled')).toBe(false)
  })

  it('shows validation error when placing order without name and email', async () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Place Order' }))
    await waitFor(() => {
      expect(screen.getByText('Please fill in your name and email.')).toBeDefined()
    })
  })

  it('calls removeFromCart when remove button is clicked', () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: '✕' }))
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id)
  })

  it('calls updateQuantity when + button is clicked', () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 3)
  })

  it('calls updateQuantity when − button is clicked', () => {
    mockUseCart.mockReturnValue(cartWithItems)
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: '−' }))
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 1)
  })

  it('opens the pickup time modal when edit button is clicked', () => {
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: '✏' }))
    expect(screen.getByText('Edit Pickup Time')).toBeDefined()
  })

  it('closes the modal when Cancel is clicked', () => {
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: '✏' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByText('Edit Pickup Time')).toBeNull()
  })

  it('closes the modal when Save is clicked', () => {
    render(<CheckoutPage />)
    fireEvent.click(screen.getByRole('button', { name: '✏' }))
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.queryByText('Edit Pickup Time')).toBeNull()
  })

  it('shows success message after order is placed', async () => {
    mockUseCart.mockReturnValue(cartWithItems)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    render(<CheckoutPage />)
    fireEvent.change(screen.getByPlaceholderText('Jane Smith'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText('jane@example.com'), { target: { value: 'jane@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Place Order' }))
    await waitFor(() => {
      expect(screen.getByText(/Order placed/)).toBeDefined()
    })
    expect(mockClearCart).toHaveBeenCalled()
  })

  it('shows error message when order fails', async () => {
    mockUseCart.mockReturnValue(cartWithItems)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    render(<CheckoutPage />)
    fireEvent.change(screen.getByPlaceholderText('Jane Smith'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText('jane@example.com'), { target: { value: 'jane@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Place Order' }))
    await waitFor(() => {
      expect(screen.getByText('Order failed. Please try again.')).toBeDefined()
    })
  })
})
