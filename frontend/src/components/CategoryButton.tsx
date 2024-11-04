import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import PostCard from '@/components/PostCard'
import { Post, Posts } from '@/typings/db'
import postApi from '@/apis/postService'
import { Pagination } from 'antd'

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
  gap: 0;
  margin-top: 0.5rem;
  padding: 16px;
`
const CenteredContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`
const PostsContainer = styled.div`
  margin-top: 20px;
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 10

  const {
    data: posts = { posts: [], totalCount: 0 },
    isLoading,
    error,
  } = useQuery<Posts>({
    queryKey: ['posts', selectedCategory, pageNumber],
    queryFn: () => postApi.getPost(pageSize, pageNumber),
  })

  const handleClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    )
    setPageNumber(1)
  }

  const filteredPosts = posts.posts.filter((post: Post) =>
    selectedCategory ? post.category === selectedCategory : true,
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong!</div>

  return (
    <CenteredContainer>
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

      <PostsContainer>
        {filteredPosts.map((post: Post) => (
          <PostCard
            key={post._id}
            {...post}
          />
        ))}
      </PostsContainer>

      <PaginationControl
        currentPage={pageNumber}
        total={posts.totalCount}
        onPageChange={setPageNumber}
      />
    </CenteredContainer>
  )
}

// 페이지네이션 컴포넌트 분리
const PaginationControl: React.FC<{
  currentPage: number
  total: number
  onPageChange: (page: number) => void
}> = ({ currentPage, total, onPageChange }) => {
  return (
    <Pagination
      current={currentPage}
      pageSize={10}
      total={total}
      onChange={onPageChange}
      style={{ marginTop: '20px' }}
    />
  )
}

export default CategoryButtons
