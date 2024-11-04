import { HeartFilled } from '@ant-design/icons'
import {
  CategoryTopRateContainer,
  CategoryTopRateItem,
  PostHeader,
  PostInfo,
  TopRateBedge,
} from './style'
import { Post } from '@/typings/db'
import { formatDate } from '@/utils/formatDate'
import { useNavigate } from 'react-router-dom'

const TopRateItem = ({ post }: { post: Post }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/post/${post._id}`)
  }

  return (
    <CategoryTopRateItem onClick={handleNavigate}>
      <PostHeader>
        <TopRateBedge>
          <p>{'인기'}</p>
        </TopRateBedge>
        <h3>{post.title}</h3>
      </PostHeader>
      <PostInfo>
        <p>{post.user.nickname}</p>
        <p>{formatDate(post.createdAt)}</p>
        <p>
          {<HeartFilled style={{ marginTop: '0.1rem', color: '#EE3441' }} />}
          <span>{post.hearts.length}</span>
        </p>
      </PostInfo>
    </CategoryTopRateItem>
  )
}

const CategoryTopRate = ({ posts }: { posts: Post[] }) => {
  const topFiveHeartPredicate = (a: Post, b: Post) =>
    b.hearts.length - a.hearts.length
  const topPosts = posts.sort(topFiveHeartPredicate).slice(0, 5)

  return (
    <CategoryTopRateContainer>
      {topPosts.map((post) => (
        <TopRateItem
          key={post._id}
          post={post}
        />
      ))}
    </CategoryTopRateContainer>
  )
}

export default CategoryTopRate
