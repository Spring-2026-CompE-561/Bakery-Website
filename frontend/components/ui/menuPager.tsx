type Props = {
  currentPage: number;
  totalPages: number;
  goNext: () => void;
  goPrev: () => void;
};

export default function MenuPager({ currentPage, totalPages, goNext, goPrev }: Props) {
  const btnBase: React.CSSProperties = {
    border: "1.5px solid #000",
    borderRadius: "8px",
    fontFamily: "var(--font-body)",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "8px 20px",
    cursor: "pointer",
    transition: "transform 0.15s ease",
    background: "var(--color-papaya)",
    boxShadow: "2px 2px 0 #000",
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      borderTop: "2px solid #000",
      padding: "12px 0 4px",
    }}>
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        style={{
          ...btnBase,
          opacity: currentPage === 1 ? 0.4 : 1,
          pointerEvents: currentPage === 1 ? "none" : "auto",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
      >
        ← Prev
      </button>

      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        style={{
          ...btnBase,
          opacity: currentPage === totalPages ? 0.4 : 1,
          pointerEvents: currentPage === totalPages ? "none" : "auto",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
      >
        Next →
      </button>
    </div>
  );
}
