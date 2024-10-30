import { SearchPageNav, SearchPageResult, SearchResultContainer } from './style'

interface SearchContainerProps {
  children: React.ReactNode
  handlePageChange: (pageNumber: number) => void
  totalCount: number
  pageSize: number
  currentPage: number
  isLoading: boolean
}

const SearchResult = ({
  children,
  handlePageChange,
  totalCount,
  pageSize,
  currentPage,
  isLoading,
}: SearchContainerProps) => {
  return (
    <>
      <SearchResultContainer>
        <SearchPageResult>{children}</SearchPageResult>
        <SearchPageNav
          current={currentPage}
          pageSize={pageSize}
          total={totalCount}
          onChange={handlePageChange}
          disabled={isLoading}
        />
      </SearchResultContainer>
    </>
  )
}

export default SearchResult
