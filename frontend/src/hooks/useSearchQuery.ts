import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { SearchParam } from '@/pages/SearchPage'

const STALE_TIME = 10000
const QUERY_KEY = 'posts'

export const POST_SEARCH_QUERY = (
  keyword: string,
  searchParam: SearchParam,
  pageNumber: number,
) => [QUERY_KEY, keyword, searchParam.type, pageNumber]

const getSearchParams = (
  keyword: string,
  searchParam: SearchParam,
  pageNumber: number,
  ITEMS_PER_PAGE = 10,
) => {
  if (typeof keyword === 'string' && keyword.trim() !== '') {
    const searchParams = {
      ...searchParam,
      length: ITEMS_PER_PAGE,
      page: pageNumber,
    }
    return postApi.searchPost(searchParams)
  }
  return postApi.getPost(ITEMS_PER_PAGE, pageNumber)
}

export const useSearchQuery = (
  keyword: string,
  searchParam: SearchParam,
  pageNumber: number,
) => {
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: POST_SEARCH_QUERY(keyword, searchParam, pageNumber),
    queryFn: async () => getSearchParams(keyword, searchParam, pageNumber),

    staleTime: STALE_TIME,
  })

  return { searchData, isSearchLoading, isSearchError, searchError }
}
