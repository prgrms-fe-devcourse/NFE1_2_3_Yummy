import { useNavigateTo } from '@/hooks/useNavigateTo'
import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import React from 'react'
import styled from 'styled-components'

const TopPostContainer = styled.div<{ $imgUrl: string }>`
  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 600px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  padding: 1rem;
  margin-left: 3rem;
  width: 450px;
  height: 450px;
  cursor: pointer;
  justify-content: space-evenly;
`
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const PostCategory = styled.p`
  font-size: 1.25rem;
  color: #7d7d7d;
  font-weight: bold;
`

const PostTitle = styled.h2`
  font-size: 2rem;
`

const PostAuthor = styled.p`
  font-size: 1rem;
  color: #7d7d7d;
`
const PostText = styled.p`
  font-size: 1rem;
  color: #1c1c1c;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  text-overflow: ellipsis;

  & * {
    line-height: 1.5;
    text-align: left !important;
    font-size: 1rem !important;
  }
`

const TopPost: React.FC<Post> = ({
  image_url,
  category,
  title,
  user,
  createdAt,
  content,
  _id,
}) => {
  const handleNavigateTo = useNavigateTo()

  const handleOpenPost = () => {
    handleNavigateTo(`/post/${_id}`)
  }
  return (
    <TopPostContainer $imgUrl={image_url}>
      <ContentContainer onClick={handleOpenPost}>
        <PostInfo>
          <PostCategory>{category}</PostCategory>
          <PostTitle>{title}</PostTitle>
          <PostAuthor>
            {user?.nickname || 'Anonymous'} | {formatDate(createdAt)}
          </PostAuthor>
        </PostInfo>
        <PostText dangerouslySetInnerHTML={{ __html: content }} />
      </ContentContainer>
    </TopPostContainer>
  )
}

export default TopPost
