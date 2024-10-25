import { SearchPageNavContainer, SearchPageNavItem } from './style'

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

  return (
    <SearchPageNavContainer>
      {categories.map((category) => (
        <SearchPageNavItem key={category}>{category}</SearchPageNavItem>
      ))}
    </SearchPageNavContainer>
  )
}

export default SearchPageNav
