import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="border-b bg-[]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold">
                    Seri-Seri Sweets
                </Link>
                <div className="flex gap-6 text-sm font-medium">
                    <Link href="/">Home</Link>
                    <Link href="/menu">Menu</Link>
                    <Link href="/checkout">Checkout</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </nav>
    );
}