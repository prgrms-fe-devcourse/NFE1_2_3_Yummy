import { useNavigateTo } from '@/hooks/useNavigateTo'
import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  padding: 16px;
  margin: 0 50px;
  margin-bottom: 16px;
  background-color: #fff;
  cursor: pointer;
`

const PostImage = styled.img`
  width: 150px;
  height: 150px;
  height: auto;
  margin-right: 20px;
`

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
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

const PostDate = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  margin: 4px 0;
`

const PostText = styled.p`
  font-size: 1rem;
  color: #1c1c1c;
  margin-top: 8px;
`

// author 속성은 추후 확인해야됨

function PostCard({
  title,
  author,
  createdAt,
  content,
  category,
  image_url,
  _id,
}: Post) {
  const handleNavigateTo = useNavigateTo()

  const handleOpenPost = () => {
    handleNavigateTo(`/post/${_id}`)
  }

  return (
    <Card onClick={handleOpenPost}>
      <PostImage
        src={image_url}
        alt='Post Thumbnail'
      />
      <PostContent>
        <PostCategory>{category}</PostCategory>
        <PostTitle>{title}</PostTitle>
        <PostAuthor>{author}</PostAuthor>
        <PostDate>{formatDate(createdAt)}</PostDate>
        <PostText>{content}</PostText>
      </PostContent>
    </Card>
  )
}

export default PostCard
