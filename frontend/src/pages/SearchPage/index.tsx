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

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('search') || '전체'

  const filteredPosts =
    category === '전체'
      ? mockPosts
      : mockPosts.filter((post) => post.category === category)

  return (
    <SearchPageContainer>
      <SearchPageInput />
      <SearchPageResultContainer>
        <SearchPageNav />
        <SearchPageResult>
          {filteredPosts.map((post, index) => (
            <PostCard
              key={index}
              {...post}
            />
          ))}
        </SearchPageResult>
      </SearchPageResultContainer>
    </SearchPageContainer>
  )
}

export default SearchPage
