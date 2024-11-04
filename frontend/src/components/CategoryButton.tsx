import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import PostCard from '@/components/PostCard'
import { Post } from '@/typings/db'
import postApi from '@/apis/postService'
import { SearchPageNav } from './SearchResultContainer/style'

interface CategoryButtonProps {
  label: string
  onClick: () => void
  isSelected: boolean
}

const Button = styled.button<{ $isSelected: boolean }>`
  height: 125px;
  width: 125px;
  border: 1px solid #7d7d7d;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#1c1c1c' : '#ffffff'};
  color: ${({ $isSelected }) => ($isSelected ? '#ffffff' : '#1c1c1c')};
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #1c1c1c;
    color: #ffffff;
  }
  padding: 0;
  margin-right: -1px;
  &:not(:last-child) {
    margin-bottom: -1px;
  }
`
const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 5rem 2rem;
  gap: 3rem;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding-block: 3rem;
`

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  onClick,
  isSelected,
}) => {
  return (
    <Button
      onClick={onClick}
      $isSelected={isSelected}
    >
      {label}
    </Button>
  )
}

const categories = [
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

const CategoryButtons: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [pageNumber, setPageNumber] = useState(1)

  const PAGE_SIZE = 5

  const {
    data: filterPosts = [],
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ['categoryPosts', selectedCategory],
    queryFn: async () => postApi.getCategoryPosts(selectedCategory),
    enabled: !!selectedCategory,
  })

  const handleClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? '전체' : category,
    )
    setPageNumber(1)
  }

  let content

  if (isLoading) content = <div>Loading...</div>

  if (error) content = <div>Something went wrong!</div>

  if (filterPosts) {
    const startIndex = (pageNumber - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE

    content = filterPosts.slice(startIndex, endIndex).map((post: Post) => (
      <PostCard
        key={post._id}
        {...post}
      />
    ))
  }

  if (filterPosts.length === 0) {
    content = <div>게시물이 없습니다.</div>
  }

  return (
    <CategoryContainer>
      <ButtonGrid>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            label={category}
            onClick={() => handleClick(category)}
            isSelected={selectedCategory === category}
          />
        ))}
      </ButtonGrid>

      <PostsContainer>{content}</PostsContainer>

      <PaginationControl
        currentPage={pageNumber}
        pageSize={PAGE_SIZE}
        total={filterPosts.length}
        onPageChange={setPageNumber}
      />
    </CategoryContainer>
  )
}

// 페이지네이션 컴포넌트 분리
const PaginationControl: React.FC<{
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}> = ({ currentPage, total, onPageChange }) => {
  return (
    <SearchPageNav
      current={currentPage}
      pageSize={5}
      total={total}
      onChange={onPageChange}
      style={{ marginTop: '20px' }}
    />
  )
}

export default CategoryButtons
