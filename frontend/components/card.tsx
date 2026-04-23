type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
};

export default function ProductCard({ product }: { product : Product }) {
    return (
        <div className="rounded-none border bg-white p-4">
            <img 
                src={product.image}
                alt={product.name}
                className="h-32 w-full rounded-xl object-cover"
            ></img>
            <h2 className="mt-4 text-lg font-semibold">
                {product.name}
            </h2>
        </div>
    );
}