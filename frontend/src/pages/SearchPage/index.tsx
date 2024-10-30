import SearchPageInput from '@/components/SearchPageInput'
import {
  SearchPageContainer,
  SearchPageResult,
  SearchPageResultContainer,
} from './style'
import SearchPageNav from '@/components/SearchPageNav'
import PostCard from '@/components/PostCard'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { Post } from '@/typings/db'
import { ChangeEvent, useState } from 'react'
import { RadioChangeEvent } from 'antd'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchParam {
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

  const STALE_TIME = 10000
  const ITEMS_PER_PAGE = 10
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', keyword, searchParam.type, pageNumber],
    queryFn: async () => {
      if (keyword.trim() !== '') {
        const searchParams = {
          ...searchParam,
          length: ITEMS_PER_PAGE,
          page: pageNumber,
        }

        return postApi.searchPost(searchParams)
      }

      return postApi.getPost()
    },
    staleTime: STALE_TIME,
  })

  // API 호출 시 사용할 검색 타입
  const handleSearchParam = (e: RadioChangeEvent) => {
    const currentType = e.target.value
    if (
      currentType === 'title' ||
      currentType === 'content' ||
      currentType === 'nickname'
    ) {
      setSearchParam((prevParam) => ({ ...prevParam, type: currentType }))
    }
    return
  }

  // 검색어 입력 시 키워드 설정
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam((prevParam) => ({ ...prevParam, keyword: e.target.value }))
  }

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>{error.message}</div>
  }

  if (data) {
    const { posts } = data
    const category = searchParams.get('search') || '전체'
    const totalCount = data.totalCount

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

  return (
    <SearchPageContainer>
      <SearchPageInput
        onHandleSearch={handleSearch}
        handleSearchParam={handleSearchParam}
      />
      <SearchPageResultContainer>
        <SearchPageNav />
        <SearchPageResult>{content}</SearchPageResult>
      </SearchPageResultContainer>
    </SearchPageContainer>
  )
}

export default SearchPage
