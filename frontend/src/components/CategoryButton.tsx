import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import PostCard from '@/components/PostCard'
import axios from 'axios'
import { Post, Posts } from '@/typings/db'

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
  //겹치는 보더라인 제거
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`

const PostsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  '디저트',
]

const CategoryButtons: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery<Posts>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('/api/post')
      console.log('ADD ', response.data)
      return response.data
    },
  })

  const handleClick = (category: string) => {
    setSelectedCategory(category)
  }

  // 선택된 카테고리에 따라 포스트 필터링
  const filteredPosts = selectedCategory
    ? posts.posts.filter((post: Post) => post.category === selectedCategory)
    : [...posts.posts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) // 최신순 정렬

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
    </CenteredContainer>
  )
}

export default CategoryButtons
