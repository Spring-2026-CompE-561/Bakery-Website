import { products } from "@/data/menu";
import ProductCard from "@/components/card";

export default function ProductsPage() {
    return (
        <main className="px-6 py-16">
            <h1 className="text-3xl font-bold text-center">
                View Our Tasty Products!
            </h1>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    )
}