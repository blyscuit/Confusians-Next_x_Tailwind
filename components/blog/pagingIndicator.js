"use client";

import { useRouter } from "next/navigation";

export default function PagingIndicator({ currentPage, maxPage }) {
  const router = useRouter();

  const handlePageClick = (data) => {
    const selected = data.selected + 1;
    router.push(`/blog/page/${selected}`);
  };

  const handleClick = (page) => {
    if (page < 1 || page > maxPage || page === currentPage + 1) return;
    router.push(`/blog/page/${page}`);
  };

  // Generate page numbers with breaks (similar to react-paginate)
  const getPages = () => {
    const pages = [];
    const page = currentPage + 1; // zero-based to 1-based
    const pageRangeDisplayed = 2;
    const marginPagesDisplayed = 1;

    if (maxPage <= 5) {
      for (let i = 1; i <= maxPage; i++) pages.push(i);
    } else {
      // Left margin
      for (let i = 1; i <= marginPagesDisplayed; i++) pages.push(i);

      // Left break
      if (page > marginPagesDisplayed + pageRangeDisplayed) pages.push("...");

      // Main range
      const start = Math.max(
        marginPagesDisplayed + 1,
        page - pageRangeDisplayed
      );
      const end = Math.min(
        maxPage - marginPagesDisplayed,
        page + pageRangeDisplayed
      );
      for (let i = start; i <= end; i++) pages.push(i);

      // Right break
      if (page < maxPage - marginPagesDisplayed - pageRangeDisplayed + 1)
        pages.push("...");

      // Right margin
      for (let i = maxPage - marginPagesDisplayed + 1; i <= maxPage; i++)
        pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center py-0 pb-12">
      <div className="font-light flex flex-row px-8 text-sm dark:text-white">
        <button
          className="px-3"
          onClick={() => handleClick(currentPage)}
          disabled={currentPage === 0}
        >
          previous
        </button>
        {getPages().map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={p}
              className={`px-3 ${
                p === currentPage + 1 ? "font-semibold" : ""
              }`}
              onClick={() => handleClick(p)}
              disabled={p === currentPage + 1}
            >
              {p}
            </button>
          )
        )}
        <button
          className="px-3"
          onClick={() => handleClick(currentPage + 2)}
          disabled={currentPage + 1 === maxPage}
        >
          next
        </button>
      </div>
    </div>
  );
}
