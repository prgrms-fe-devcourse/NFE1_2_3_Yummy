import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import React from 'react'
import styled from 'styled-components'

const TopPostContainer = styled.div<{ $imgUrl: string }>`
  position: relative;
  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: flex-start;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  margin: 0 30px;
  max-width: 500px;
  height: 500px;
`

const PostCategory = styled.p`
  font-size: 20px;
  color: #7d7d7d;
  margin: 0;
  font-weight: bold;
`

const PostTitle = styled.h2`
  font-size: 33px;
  margin: 8px 0;
`

const PostAuthor = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  margin: 0;
`
const PostText = styled.p`
  font-size: 16px;
  color: #1c1c1c;
  margin-top: 8px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
`

const TopPost: React.FC<Post> = ({
  image_url,
  category,
  title,
  userId,
  createdAt,
  content,
}) => {
  return (
    <TopPostContainer $imgUrl={image_url}>
      <ContentContainer>
        <PostCategory>{category}</PostCategory>
        <PostTitle>{title}</PostTitle>
        <PostAuthor>
          {userId} | {formatDate(createdAt)}
        </PostAuthor>
        <PostText>{content}</PostText>
      </ContentContainer>
    </TopPostContainer>
  )
}

export default TopPost
