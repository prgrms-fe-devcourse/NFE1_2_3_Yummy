import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import PostCard from '@/components/PostCard'
import { Post, Posts } from '@/typings/db'
import postApi from '@/apis/postService'
import { Pagination } from "antd";

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
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PageNav = styled(Pagination)`
  color: #1c1c1c !important;

  &.ant-pagination .ant-pagination-item-active,
  :where(.css-dev-only-do-not-override-1hpnbz2).ant-pagination
    .ant-pagination-item-active {
    background-color: white !important;
    border-color: #1c1c1c !important;
    border-width: 2px !important;
  }

  :where(.css-dev-only-do-not-override-1hpnbz2).ant-pagination
    .ant-pagination-item-active:hover
    a {
    color: #1c1c1c !important;
  }
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
    setSelectedCategory(category)
    setPageNumber(1)
  }

  const handlePageChange = (page: number) => {
    setPageNumber(page)
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
      <PageNav
        current={pageNumber}
        pageSize={pageSize}
        total={posts.totalCount}
        onChange={handlePageChange}
      />
    </CenteredContainer>
  )
}

export default CategoryButtons
