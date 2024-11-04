import CategoryButtons from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'
import TopPost from '@/components/TopPost'
import { Posts } from '@/typings/db'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import DOMPurify from 'dompurify'
import postApi from '@/apis/postService'
import { FloatButton } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { CategoryTitle } from './CatergoryPage/style'

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Top = styled.div`
  width: 100%;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PostsContainer = styled.div`
  width: 50%;
  padding-block: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const MainPage = () => {
  const navigate = useNavigate()
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery<Posts>({
    queryKey: ['topPosts'],
    queryFn: postApi.getTopPosts,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>오류 발생: {error.message}</p>

  if (!postsData || postsData.posts.length === 0) return null

  const sanitizedPosts = postsData.posts.map((post) => ({
    ...post,
    content: DOMPurify.sanitize(post.content),
  }))

  const topPost = sanitizedPosts[0]
  const sortedPosts = sanitizedPosts
    .sort((a, b) => b.hearts.length - a.hearts.length)
    .slice(1, 5)

  return (
    <MainContainer>
      <Top>
        <TopPost {...topPost} />
      </Top>
      <Main>
        <CategoryTitle>
          <h3>Trending Now</h3>
          <hr />
        </CategoryTitle>
        <PostsContainer>
          {sortedPosts.map((post) => (
            <PostCard
              key={post._id}
              {...post}
            />
          ))}
        </PostsContainer>
      </Main>
      <CategoryContainer>
        <CategoryTitle>
          <h3>Category</h3>
          <hr />
        </CategoryTitle>
        <CategoryButtons />
      </CategoryContainer>
      <FloatButton.BackTop
        icon={<FormOutlined />}
        tooltip='게시물 작성'
        onClick={() => navigate('/write')}
        style={{ right: 24, bottom: 80 }}
      />
      <FloatButton.BackTop style={{ right: 24, bottom: 24 }} />
    </MainContainer>
  )
}
export default MainPage
