import CategoryTopRate from '@components/CategoryTopRate'
import {
  CategoryPageContainer,
  CategoryTitle,
  ItemCardContainer,
} from './style'
import CategoryItemCard from '@/components/CategoryItemCard'

const CategoryPage = () => {
  return (
    <CategoryPageContainer>
      <CategoryTitle>
        <h3>{'title'}</h3>
        <hr />
      </CategoryTitle>
      <CategoryTopRate />
      <ItemCardContainer>
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
        <CategoryItemCard />
      </ItemCardContainer>
    </CategoryPageContainer>
  )
}

export default CategoryPage
