import { useNavigateTo } from '@/hooks/useNavigateTo'
import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  background-color: #fff;
  font-family: sans-serif;
  cursor: pointer;
  align-items: center;
`

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`

const PostImage = styled.img`
  width: 260px !important;
  height: 200px;
  object-fit: cover;
  margin-right: 1rem;
`

const PostContent = styled.div`
  width: calc(100% - 276px);
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
`

const PostCategory = styled.p`
  font-size: 1rem;
  color: #7d7d7d;
  font-weight: bold;
`

const PostTitle = styled.h2`
  font-size: 1.5rem;
`

const PostAuthor = styled.p`
  font-size: 1rem;
  color: #7d7d7d;
`

const Content = styled.p`
  font-size: 1rem;
  color: #1c1c1c;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;

  & * {
    line-height: 1.5;
    text-align: left !important;
    font-size: 1rem !important;
    word-break: break-all;
  }
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
        <PostInfo>
          <PostCategory>{category}</PostCategory>
          <PostTitle>{title}</PostTitle>
          <PostAuthor>
            {user ? user.nickname : 'Anonymous'} | {formatDate(createdAt)}
          </PostAuthor>
        </PostInfo>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </PostContent>
    </Card>
  )
}

export default PostCard
