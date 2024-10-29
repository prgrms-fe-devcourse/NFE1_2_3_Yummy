import CategoryButtons from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'
import TopPost from '@/components/TopPost'
import { Post } from '@/typings/db'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import styled from 'styled-components'

const Header = styled.h1`
  text-align: center;
  margin: 20px 0;
`

const MainPage = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('/api/post')
      console.log('ADD ', response.data)
      return response.data
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>오류 발생: {error.message}</p>
  if (!Array.isArray(posts)) {
    return <p>포스트 데이터가 올바르지 않습니다.</p>
  }

  // 추후에 좋아요 데이터 넘어오면 확인해야할듯
  const sortedPosts = posts.sort((a, b) => b.heartCount - a.heartCount)
  const topPost = sortedPosts[0]

  return (
    <div>
      <TopPost {...topPost} />
      <Header>Trending Now</Header>
      {sortedPosts.map((post) => (
        <PostCard
          key={post._id}
          {...post}
        />
      ))}
      <Header>Category</Header>
      <CategoryButtons />
    </div>
  )
}

export default MainPage
