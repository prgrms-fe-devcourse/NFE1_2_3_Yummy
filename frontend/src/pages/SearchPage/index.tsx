import SearchPageInput from '@/components/SearchPageInput'
import {
  SearchPageContainer,
  SearchPageResult,
  SearchPageResultContainer,
} from './style'
import SearchPageNav from '@/components/SearchPageNav'
import { mockPosts } from '@/utils/mockPosts'
import PostCard from '@/components/PostCard'

const SearchPage = () => {
  return (
    <SearchPageContainer>
      <SearchPageInput />
      <SearchPageResultContainer>
        <SearchPageNav />
        <SearchPageResult>
          {mockPosts.map(({ author, category, date, imgUrl, text, title }) => (
            <PostCard
              key={author}
              author={author}
              category={category}
              date={date}
              imgUrl={imgUrl}
              text={text}
              title={title}
            />
          ))}
        </SearchPageResult>
      </SearchPageResultContainer>
    </SearchPageContainer>
  )
}

export default SearchPage
