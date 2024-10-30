import { SearchPageResult, SearchResultContainer } from './style'
import { Pagination } from 'antd'

interface SearchContainerProps {
  children: React.ReactNode
  handlePageChange: (pageNumber: number) => void
  totalCount: number
  pageSize: number
  loading: boolean
  currentPage: number
}

const SearchResult = ({
  children,
  handlePageChange,
  totalCount,
  pageSize,
  loading,
  currentPage,
}: SearchContainerProps) => {
  return (
    <>
      <SearchResultContainer>
        <SearchPageResult>{children}</SearchPageResult>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCount}
          onChange={handlePageChange}
          disabled={loading}
          showSizeChanger={false}
        />
      </SearchResultContainer>
    </>
  )
}

export default SearchResult
