import CategoryButtons from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'
import TopPost from '@/components/TopPost'
import { Posts } from '@/typings/db'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import DOMPurify from 'dompurify'
import postApi from '@/apis/postService'
import { FloatButton } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const MainContainer = styled.div`
  width: 100%;
`

const Top = styled.div`
  width: 100%;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.h1`
  font-family: 'Libre Baskerville';
  font-size: 42px;
  text-align: center;
  margin: 20px 0 10px 0;
`
const Hr = styled.hr`
  height: 0.25rem;
  width: 190px;
  border: none;
  background: black;
`
const PostsContainer = styled.div`
  margin-top: 20px;
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  if (postsData && postsData.posts.length > 0) {
    // content를 정화
    const sanitizedPosts = postsData.posts.map((post) => ({
      ...post,
      content: DOMPurify.sanitize(post.content),
    }))

    const topPost = sanitizedPosts[0]
    const sortedPosts = sanitizedPosts
      .sort((a, b) => b.hearts.length - a.hearts.length)
      .slice(0, 3)

    return (
      <MainContainer>
        <Top>
          <TopPost {...topPost} />
        </Top>
        <Main>
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
        </Main>
        <FloatButton
          icon={<PlusOutlined />}
          tooltip='게시물 작성'
          onClick={() => navigate('/write')}
          style={{ right: 24, bottom: 80 }}
        />
        <FloatButton.BackTop style={{ right: 24, bottom: 24 }} />
      </MainContainer>
    )
  }

  return null
}

export default MainPage
