import SearchPageInput from '@/components/SearchPageInput'
import {
  SearchPageContainer,
  SearchPageResult,
  SearchPageResultContainer,
} from './style'
import SearchPageNav from '@/components/SearchPageNav'
import { mockPosts } from '@/utils/mockPosts'
import PostCard from '@/components/PostCard'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '@/apis/api'
import { Post } from '@/typings/db'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('search') || '전체'

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPost(),
  })

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>{error.message}</div>
  }

  if (data) {
    const filteredPosts: Post[] =
      category === '전체'
        ? data
        : data.filter((post) => post.category === category)

    content = filteredPosts.map((post, index) => (
      <PostCard
        key={index}
        {...post}
      />
    ))
  }

  return (
    <SearchPageContainer>
      <SearchPageInput />
      <SearchPageResultContainer>
        <SearchPageNav />
        <SearchPageResult>{content}</SearchPageResult>
      </SearchPageResultContainer>
    </SearchPageContainer>
  )
}

export default SearchPage
