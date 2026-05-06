import { useRef, useEffect } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  goNext: () => void;
  goPrev: () => void;
  isPageMenuOpen: boolean;
  setIsPageMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectPage: (page: number) => void;
};

export default function MenuHeader({
  currentPage,
  totalPages,
  goNext,
  goPrev,
  isPageMenuOpen,
  setIsPageMenuOpen,
  selectPage,
}: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPageMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPageMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPageMenuOpen, setIsPageMenuOpen]);

  const btnBase: React.CSSProperties = {
    border: "1.5px solid #000",
    borderRadius: "8px",
    fontFamily: "var(--font-body)",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "6px 16px",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  };

  return (
    <div
      style={{
        background: "var(--color-papaya)",
        borderBottom: "2px solid #000",
        borderRadius: "10px 10px 0 0",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {/* Left: page picker + arrows */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <div style={{ position: "relative" }} ref={menuRef}>
          <button
            onClick={() => setIsPageMenuOpen((prev) => !prev)}
            disabled={totalPages <= 1}
            style={{
              ...btnBase,
              background: "var(--color-tender-rose)",
              boxShadow: "2px 2px 0 #000",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
          >
            Page {currentPage}
          </button>

          {isPageMenuOpen && (
            <div style={{
              position: "absolute",
              left: 0,
              top: "calc(100% + 4px)",
              zIndex: 10,
              minWidth: "100px",
              background: "#fff",
              border: "1.5px solid #000",
              borderRadius: "8px",
              boxShadow: "3px 3px 0 #000",
              overflow: "hidden",
            }}>
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => selectPage(page)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 16px",
                      textAlign: "left",
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      fontWeight: currentPage === page ? "bold" : "normal",
                      background: currentPage === page ? "var(--color-smooth-pink)" : "transparent",
                      cursor: "pointer",
                      border: "none",
                      borderBottom: page < totalPages ? "1px solid #eee" : "none",
                    }}
                  >
                    Page {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          style={{
            ...btnBase,
            background: "var(--color-smooth-pink)",
            padding: "6px 12px",
            opacity: currentPage === 1 ? 0.4 : 1,
            pointerEvents: currentPage === 1 ? "none" : "auto",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
        >
          ◀
        </button>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          style={{
            ...btnBase,
            background: "var(--color-smooth-pink)",
            padding: "6px 12px",
            opacity: currentPage === totalPages ? 0.4 : 1,
            pointerEvents: currentPage === totalPages ? "none" : "auto",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
        >
          ▶
        </button>
      </div>

      {/* Center: title — grows to fill remaining space and centers itself */}
      <h2 style={{
        fontFamily: "var(--font-body)",
        fontWeight: "bold",
        fontSize: "clamp(13px, 2vw, 18px)",
        textAlign: "center",
        flex: "1 1 120px",
        minWidth: 0,
      }}>
        View Our Tasty Products!
      </h2>
    </div>
  );
}
