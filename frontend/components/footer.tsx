export default function Footer() {
    return (
        <footer className="w-full bg-[var(--color-papaya)] px-6 py-8 text-sm text-stone-600" style={{ borderTop: "2px solid #000" }}>
            <div className="mx-auto max-w-6xl text-center flex flex-col items-center gap-1">
                <span
                    className="font-bold"
                    style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "#000" }}
                >
                    Seri-Seri Sweets
                </span>
                <span>@instagram</span>
            </div>
        </footer>
    );
}