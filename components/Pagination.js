import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage, keyword }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="flex items-center justify-between space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex pl-8">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/blog?keyword=${keyword}`
                : `/blog?page=${currentPage - 1}&keyword=${keyword}`
            }
          >
            <button rel="previous">Previous</button>
          </Link>
        )}
      </nav>
      <span>
        {currentPage} of {totalPages}
      </span>
      <nav className="flex pr-8">
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog?page=${currentPage + 1}&keyword=${keyword}`}>
            <button rel="next">Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
