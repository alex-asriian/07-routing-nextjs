import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={selectedItem => onPageChange(selectedItem.selected + 1)}
      forcePage={currentPage - 1}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
    />
  )
}
