"use client";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";

export default function PagingIndicator({ currentPage, maxPage }) {
  const router = useRouter();

  const handlePageClick = (data) => {
    const selected = data.selected + 1;
    router.push(`/blog/page/${selected}`);
  };

  return (
    <div className="flex flex-col items-center py-0 pb-12">
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"px-2"}
        pageCount={maxPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={
          "font-light flex flex-row px-8 text-sm dark:text-white"
        }
        activeClassName={"font-semibold"}
        forcePage={currentPage}
        pageClassName={"px-3"}
      />
    </div>
  );
}
