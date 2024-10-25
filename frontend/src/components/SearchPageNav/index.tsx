import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchPageNavContainer, SearchPageNavItem } from './style'
import { formatCategoryForURL } from '@/utils/formatURl'

const SearchPageNav = () => {
  const categories = [
    '전체',
    '한식',
    '중식',
    '일식',
    '양식',
    '동남아 요리',
    '남미 요리',
    '중동 요리',
    '퓨전 요리',
    '채식 요리',
    '해산물 요리',
    '바베큐 요리',
    '디저트 요리',
  ]

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('search')

  const handleClickCategory = (category: string) => {
    navigate(`/search/category?search=${formatCategoryForURL(category)}`)
  }

  return (
    <SearchPageNavContainer>
      {categories.map((category) => (
        <SearchPageNavItem
          key={category}
          $isActive={category === urlCategory}
          onClick={() => handleClickCategory(category)}
        >
          {category}
        </SearchPageNavItem>
      ))}
    </SearchPageNavContainer>
  )
}

export default SearchPageNav
