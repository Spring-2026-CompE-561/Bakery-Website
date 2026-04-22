// bottom pager aka footer for the menu
// same functionality as the header, but only prev/next page buttons
// hover and opacity implemented

type Props = {
  currentPage: number;
  totalPages: number;
  goNext: () => void;
  goPrev: () => void;
};

export default function Pager({
  currentPage,
  totalPages,
  goNext,
  goPrev,
}: Props) {
  return (
    <div className="flex justify-end gap-4 border-t border-black px-4 py-3 sm:px-6">
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className="flex h-12 w-20 flex-col items-center justify-center rounded-md border border-black bg-[var(--color-deep-sage)] text-xs leading-tight text-stone-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-[#4c4e2a] hover:text-stone-400"
      >
        <span>Prev</span>
        <span>Page</span>
      </button>

      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="flex h-12 w-20 flex-col items-center justify-center rounded-md border border-black bg-[var(--color-deep-sage)] text-xs leading-tight text-stone-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-[#4c4e2a] hover:text-stone-400"
      >
        <span>Next</span>
        <span>Page</span>
      </button>
    </div>
  );
}