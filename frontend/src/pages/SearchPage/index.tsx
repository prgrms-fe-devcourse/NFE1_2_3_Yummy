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
import { useState } from 'react'

const SearchPage = () => {
  const [search, setSearch] = useState('')

  const [searchParams] = useSearchParams()
  const category = searchParams.get('search') || '전체'

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => postApi.getPost(),
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

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
        : data.filter((post: Post) => post.category === category)

    const searchPredicate = ({ title, content }: Post) =>
      title.includes(search) || content.includes(search)

    const filteredPostsBySearch = filteredPosts.filter(searchPredicate)

    content = filteredPostsBySearch.map((post, index) => (
      <PostCard
        key={index}
        {...post}
      />
    ))
  }

  return (
    <SearchPageContainer>
      <SearchPageInput onHandleSearch={handleSearch} />
      <SearchPageResultContainer>
        <SearchPageNav />
        <SearchPageResult>{content}</SearchPageResult>
      </SearchPageResultContainer>
    </SearchPageContainer>
  )
}

export default SearchPage
