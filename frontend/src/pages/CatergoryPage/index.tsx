import CategoryTopRate from '@components/CategoryTopRate'
import {
  CategoryPageContainer,
  CategoryTitle,
  ItemCardContainer,
} from './style'
import CategoryItemCard from '@/components/CategoryItemCard'
import useCategoryPost from '@/hooks/useCategoryPost'
import { useParams } from 'react-router-dom'

const CategoryPage = () => {
  const { category } = useParams()
  const { categoryPosts, isCategoryPostsLoading, isCategoryPostsError } =
    useCategoryPost(category || '')

  let content

  if (isCategoryPostsLoading) content = <div>Loading...</div>
  if (isCategoryPostsError) content = <div>Error...</div>

  if (categoryPosts) {
    content = (
      <>
        <CategoryTopRate posts={categoryPosts} />
        <ItemCardContainer>
          {categoryPosts.map((post) => (
            <CategoryItemCard
              key={post._id}
              post={post}
            />
          ))}
        </ItemCardContainer>
      </>
    )
  }

  return (
    <CategoryPageContainer>
      <CategoryTitle>
        <h3>{'title'}</h3>
        <hr />
      </CategoryTitle>
      {content}
    </CategoryPageContainer>
  )
}

export default CategoryPage
