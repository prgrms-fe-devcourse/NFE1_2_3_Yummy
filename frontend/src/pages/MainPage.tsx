import CategoryButtons from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'
import TopPost from '@/components/TopPost'
import { Post, Posts } from '@/typings/db'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import styled from 'styled-components'

const Header = styled.h1`
  font-family: 'Libre Baskerville';
  font-size: 42px;
  text-align: center;
  margin: 20px 0;
`
const Hr = styled.hr`
  margin: 16px auto 0;
  height: 0.25rem;
  width: 190px;
  border: none;
  background: black;
`
const PostsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MainPage = () => {
  const {
    data: posts,
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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>오류 발생: {error.message}</p>
  // if (!Array.isArray(posts)) {
  //   return <p>포스트 데이터가 올바르지 않습니다.</p>
  // }

  // 추후에 좋아요 데이터 넘어오면 확인해야할듯

  if (posts) {
    const sortedPosts = posts.posts.sort((a, b) => b.heartCount - a.heartCount)
    const topPost = sortedPosts[0]
    console.log(sortedPosts)
    return (
      <div>
        <TopPost {...topPost} />
        <Header>Trending Now</Header>
        <Hr />
        <PostsContainer>
          {sortedPosts.map((post) => (
            <PostCard
              key={post._id}
              {...post}
            />
          ))}
        </PostsContainer>
        <Header>Category</Header>
        <Hr />
        <CategoryButtons />
      </div>
    )
  }
}

export default MainPage
