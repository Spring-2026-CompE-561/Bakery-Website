export default function Footer() {
    return (
      <>
        <div style={{ background: "var(--color-smooth-pink)", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 36" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "30px" }}>
            <path d="M0,28 L720,0 L1440,28 L1440,36 L0,36 Z" fill="var(--color-papaya)" />
          </svg>
        </div>
        <footer className="w-full bg-(--color-papaya) px-6 py-8 text-sm text-stone-600">
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
      </>
    );
}