import CategoryTopRate from '@components/CategoryTopRate'
import {
  CategoryPageContainer,
  CategoryPageContent,
  CategoryTitle,
  ItemCardContainer,
  NoPostMessage,
} from './style'
import CategoryItemCard from '@/components/CategoryItemCard'
import useCategoryPost from '@/hooks/useCategoryPost'
import { useParams } from 'react-router-dom'
import { SearchPageNav } from '@/components/SearchResultContainer/style'
import { useEffect, useState } from 'react'
import { Post } from '@/typings/db'

const CategoryPage = () => {
  const { category } = useParams()
  const [currentPage, setCurrentPage] = useState(1)

  const {
    categoryPosts,
    isCategoryPostsLoading,
    isCategoryPostsError,
    categoryPostsError,
  } = useCategoryPost(category || '')

  // 카테고리가 변경될 때 페이지 번호 초기화
  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  const PAGE_SIZE = 12
  const TOTAL_COUNT = categoryPosts?.length || 0

  let content

  if (isCategoryPostsLoading) {
    content = <div>Loading...</div>
  }
  if (isCategoryPostsError) {
    content = <div>{categoryPostsError?.message}</div>
  }

  if (categoryPosts) {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE

    const recentPredicate = (a: Post, b: Post) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    const sortedPosts = categoryPosts.sort(recentPredicate)

    content = (
      <>
        <CategoryTopRate posts={sortedPosts} />
        <ItemCardContainer>
          {sortedPosts
            .map((post) => (
              <CategoryItemCard
                key={post._id}
                post={post}
              />
            ))
            .slice(startIndex, endIndex)}
        </ItemCardContainer>
      </>
    )
  }

  if (categoryPosts?.length === 0) {
    content = <NoPostMessage>게시물이 없습니다.</NoPostMessage>
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <CategoryPageContainer>
      <CategoryTitle>
        <h3>{category}</h3>
        <hr />
      </CategoryTitle>
      <CategoryPageContent>{content}</CategoryPageContent>
      <SearchPageNav
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={TOTAL_COUNT}
        onChange={handlePageChange}
      />
    </CategoryPageContainer>
  )
}

export default CategoryPage
