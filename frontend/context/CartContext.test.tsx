import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

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

beforeEach(() => localStorageMock.clear())

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })

  it('adds a new item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 2))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('increments quantity when adding an existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 1))
    act(() => result.current.addToCart(mockProduct, 3))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(4)
  })

  it('removes an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 1))
    act(() => result.current.removeFromCart(mockProduct.id))
    expect(result.current.items).toHaveLength(0)
  })

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 1))
    act(() => result.current.updateQuantity(mockProduct.id, 5))
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('removes item when quantity updated to less than 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 1))
    act(() => result.current.updateQuantity(mockProduct.id, 0))
    expect(result.current.items).toHaveLength(0)
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 2))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
  })

  it('calculates total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(mockProduct, 3))
    expect(result.current.total).toBeCloseTo(10.5)
  })

  it('throws when useCart is used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider')
  })
})
