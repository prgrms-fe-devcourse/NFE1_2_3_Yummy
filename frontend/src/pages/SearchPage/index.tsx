import SearchPageInput from '@/components/SearchPageInput'
import { SearchPageContainer, SearchPageResultContainer } from './style'
import SearchPageNav from '@/components/SearchPageNav'
import PostCard from '@/components/PostCard'
import { useSearchParams } from 'react-router-dom'
import { useSearchQuery } from '@/hooks/useSearchQuery'
import { Post } from '@/typings/db'
import { ChangeEvent, useState } from 'react'
import { RadioChangeEvent } from 'antd'
import { useDebounce } from '@/hooks/useDebounce'
import SearchResult from '@/components/SearchResultContainer'

export interface SearchParam {
  type: 'title' | 'content' | 'nickname'
  keyword: string
}

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const [searchParam, setSearchParam] = useState<SearchParam>({
    type: 'title',
    keyword: '',
  })
  const [pageNumber, setPageNumber] = useState(1)

  // 디바운스 처리
  const DEBOUNCE_DELAY = 300
  const keyword = useDebounce(searchParam.keyword, DEBOUNCE_DELAY)

  const { searchData, isSearchLoading, isSearchError, searchError } =
    useSearchQuery(keyword, searchParam, pageNumber)

  // API 호출 시 사용할 검색 타입
  const handleSearchParam = (e: RadioChangeEvent) => {
    const currentType: SearchParam['type'] = e.target.value

    if (searchParam.keyword.trim() === '') return
    setSearchParam((prevParam) => ({ ...prevParam, type: currentType }))
  }

  // 검색어 입력 시 키워드 설정
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam((prevParam) => ({ ...prevParam, keyword: e.target.value }))
    setPageNumber(1)
  }

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  let content

  if (isSearchLoading) {
    content = <div>Loading...</div>
  }

  if (isSearchError) {
    content = <div>{searchError?.message}</div>
  }

  if (searchData) {
    const { posts } = searchData
    const category = searchParams.get('search') || '전체'

    const filterPostsIndicate = (post: Post) => post.category === category
    const filteredPosts =
      category === '전체' ? posts : posts.filter(filterPostsIndicate)

    content = filteredPosts.map((post) => (
      <PostCard
        key={post._id}
        {...post}
      />
    ))
  }

  const ITEMS_PER_PAGE = 10

  return (
    <SearchPageContainer>
      <SearchPageInput
        onHandleSearch={handleSearch}
        handleSearchParam={handleSearchParam}
      />
      <SearchPageResultContainer>
        {/* <SearchPageNav /> */}
        <SearchResult
          handlePageChange={handlePageChange}
          totalCount={searchData?.totalCount || 0}
          isLoading={isSearchLoading}
          pageSize={ITEMS_PER_PAGE}
          currentPage={pageNumber}
        >
          {content}
        </SearchResult>
      </SearchPageResultContainer>
    </SearchPageContainer>
  )
}

export default SearchPage
