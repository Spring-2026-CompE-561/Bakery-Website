import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Menu from './page'
import { getMenu } from '@/data/menu'

const mockAddToCart = vi.fn()

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}))

vi.mock('@/data/menu', () => ({
  getMenu: vi.fn(),
}))

vi.mock('@/components/productmodal', () => ({
  ProductModal: ({ product, onClose, onAddToCart }: any) => (
    <div>
      <p>Product Modal</p>
      <p>{product.name}</p>
      <button onClick={() => onAddToCart(2)}>Add To Cart</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

vi.mock('@/components/ui/menuHeader', () => ({
  default: ({
    currentPage,
    totalPages,
    goNext,
    goPrev,
    setIsPageMenuOpen,
    selectPage,
  }: any) => (
    <div>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <button onClick={goPrev}>Header Prev</button>
      <button onClick={goNext}>Header Next</button>
      <button onClick={() => setIsPageMenuOpen(true)}>Open Page Menu</button>
      <button onClick={() => selectPage(2)}>Select Page 2</button>
    </div>
  ),
}))

vi.mock('@/components/ui/menuPager', () => ({
  default: ({ goNext, goPrev }: any) => (
    <div>
      <button onClick={goPrev}>Prev</button>
      <button onClick={goNext}>Next</button>
    </div>
  ),
}))

const mockProducts = [
  {
    id: 1,
    name: 'Croissant',
    description: 'Buttery',
    price: '3.50',
    picture_url: 'placehold.co/600x400/100010/FFF',
    badge: 'Popular',
    is_available: true,
  },
  {
    id: 2,
    name: 'Ube Cake',
    description: 'Purple yam cake',
    price: '5.00',
    picture_url: 'placehold.co/600x400/100010/FFF',
    badge: null,
    is_available: false,
  },
]

const manyProducts = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description ${i + 1}`,
  price: '4.00',
  img: '',
  picture_url: 'placehold.co/600x400/100010/FFF',
  badge: null,
  is_available: true,
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(getMenu).mockResolvedValue(mockProducts)
})

describe('MenuPage', () => {
  it('shows loading message while menu is loading', () => {
    vi.mocked(getMenu).mockImplementation(() => new Promise(() => {}))

    render(<Menu />)

    expect(screen.getByText('Loading menu...')).toBeDefined()
  })

  it('renders menu hero content', async () => {
    render(<Menu />)

    expect(screen.getByText('Our Menu')).toBeDefined()
    expect(
        screen.getByText(
        'Filipino-inspired mini cakes baked fresh to order. Click any item to add it to your cart.'
        )
    ).toBeDefined()

    await waitFor(() => {
        expect(screen.queryByText('Loading menu...')).toBeNull()
    })
  })

  it('renders menu products after loading', async () => {
    render(<Menu />)

    expect(await screen.findByText('Croissant')).toBeDefined()
    expect(screen.getByText('Buttery')).toBeDefined()
    expect(screen.getByText('$3.50')).toBeDefined()
  })

  it('shows product badge when product has a badge and is available', async () => {
    render(<Menu />)

    expect(await screen.findByText('Popular')).toBeDefined()
  })

  it('shows sold out label when product is unavailable', async () => {
    render(<Menu />)

    expect(await screen.findByText('SOLD OUT')).toBeDefined()
    expect(screen.getByText('Ube Cake')).toBeDefined()
  })

  it('opens product modal when product card is clicked', async () => {
    render(<Menu />)

    fireEvent.click(await screen.findByText('Croissant'))

    expect(screen.getByText('Product Modal')).toBeDefined()
  })

  it('closes product modal when close is clicked', async () => {
    render(<Menu />)

    fireEvent.click(await screen.findByText('Croissant'))
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByText('Product Modal')).toBeNull()
  })

  it('calls addToCart when available product is added from modal', async () => {
    render(<Menu />)

    fireEvent.click(await screen.findByText('Croissant'))
    fireEvent.click(screen.getByRole('button', { name: 'Add To Cart' }))

    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0], 2)
  })

  it('does not call addToCart when unavailable product is added from modal', async () => {
    render(<Menu />)

    fireEvent.click(await screen.findByText('Ube Cake'))
    fireEvent.click(screen.getByRole('button', { name: 'Add To Cart' }))

    expect(mockAddToCart).not.toHaveBeenCalled()
  })

  it('goes to next page when Next is clicked', async () => {
    vi.mocked(getMenu).mockResolvedValue(manyProducts)

    render(<Menu />)

    expect(await screen.findByText('Product 1')).toBeDefined()

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('Product 7')).toBeDefined()
    expect(screen.queryByText('Product 1')).toBeNull()
  })

  it('goes back to previous page when Prev is clicked', async () => {
    vi.mocked(getMenu).mockResolvedValue(manyProducts)

    render(<Menu />)

    expect(await screen.findByText('Product 1')).toBeDefined()

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }))

    expect(screen.getByText('Product 1')).toBeDefined()
  })

  it('selects a page from the menu header', async () => {
    vi.mocked(getMenu).mockResolvedValue(manyProducts)

    render(<Menu />)

    expect(await screen.findByText('Product 1')).toBeDefined()

    fireEvent.click(screen.getByRole('button', { name: 'Select Page 2' }))

    expect(screen.getByText('Product 7')).toBeDefined()
  })
})