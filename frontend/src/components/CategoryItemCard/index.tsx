import { HeartFilled, UserOutlined } from '@ant-design/icons'
import { CardAuthor, CardContent, CardInfo, Content, ItemCard } from './style'
import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { Avatar } from 'antd'

const CategoryItemCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/post/${post._id}`)
  }

  const { content } = post
  const sanitizedData = DOMPurify.sanitize(content)

  const authorProfileImage = post.user.profileImageUrl ? (
    <img
      src={post.user.profileImageUrl}
      alt='user Img'
    />
  ) : (
    <Avatar
      icon={<UserOutlined />}
      style={{ width: '1.6rem', height: '1.6rem' }}
    />
  )

  return (
    <ItemCard>
      <img
        src={post.image_url}
        alt='postImage'
      />
      <CardContent onClick={handleNavigate}>
        <Content>
          <h3>
            {post.title}
            <span>{post.category}</span>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: sanitizedData }} />
          <CardInfo>
            <p>{formatDate(post.createdAt)}</p>
          </CardInfo>
        </Content>
        <CardAuthor>
          <p>
            {authorProfileImage}
            {post.user.nickname}
          </p>
          <p>
            <HeartFilled style={{ color: '#EE3441' }} />
            <span>{post.hearts.length}</span>
          </p>
        </CardAuthor>
      </CardContent>
    </ItemCard>
  )
}

export default CategoryItemCard
