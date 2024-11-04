import { useNavigateTo } from '@/hooks/useNavigateTo'
import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import styled from 'styled-components'
import NoPhoto from '../assets/NoPhoto.jpg'

const Card = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 100%;
  height: 200px;
  background-color: #fff;
  font-family: sans-serif;
  cursor: pointer;
  align-items: center;
`

const PostImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
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

const Content = styled.p`
  font-size: 1rem;
  color: #1c1c1c;
  margin-top: 8px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
`

function PostCard({
  title,
  user,
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
        <PostAuthor>
          {user ? user.nickname : 'Anonymous'} | {formatDate(createdAt)}
        </PostAuthor>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </PostContent>
    </Card>
  )
}

export default PostCard
