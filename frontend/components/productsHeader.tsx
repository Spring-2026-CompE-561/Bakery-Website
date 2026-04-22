// product header aka navbar for the menu
// dropdown menu for pages as well as arrows to navigate
// hover, opacity, click off menu functionality with buttons

type Props = {
  currentPage: number;
  totalPages: number;
  goNext: () => void;
  goPrev: () => void;
  isPageMenuOpen: boolean;
  setIsPageMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectPage: (page: number) => void;
}; // types 
   // handles paginations and simple ui/ux

import { useRef, useEffect } from "react";

export default function ProductsHeader({
  currentPage,
  totalPages,
  goNext,
  goPrev,
  isPageMenuOpen,
  setIsPageMenuOpen,
  selectPage,
}: Props) {

  const menuRef = useRef<HTMLDivElement | null>(null); // off click make menu disappear

  useEffect(() => {
    if (!isPageMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsPageMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPageMenuOpen, setIsPageMenuOpen]);

  return (
    <div className="flex items-center justify-between border-b border-black px-3 py-2 sm:px-4">
      <div className="flex items-center gap-2">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsPageMenuOpen((prev) => !prev)}
            disabled={totalPages === 1}
            className="rounded border border-black bg-[#999d55] px-3 py-1 text-xs text-stone-700 hover:bg-[#4c4e2a] hover:text-stone-400 disabled:pointer-events-none"
          >
            Page {currentPage}
          </button>

          {isPageMenuOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 w-24 rounded border border-black bg-[#fff8fb] shadow-md">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => selectPage(page)}
                    className={`block w-full px-3 py-2 text-left text-xs transition hover:bg-[#f1d8e3] ${
                      currentPage === page
                        ? "bg-[#f6e7ee] font-semibold text-stone-800"
                        : "text-stone-700"
                    }`}
                  >
                    Page {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-[#999d55]">
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="text-sm transition hover:text-[#4c4e2a] disabled:opacity-40 disabled:pointer-events-none"
          >
            ◀
          </button>
          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="text-sm transition hover:text-[#4c4e2a] disabled:opacity-40 disabled:pointer-events-none"
          >
            ▶
          </button>
        </div>
      </div>

      <h1 className="text-center text-lg font-medium text-stone-700 sm:text-xl">
        View Our Tasty Products!
      </h1>

      <div className="w-20" />
    </div>
  );
}