import CategoryButtons from '@/components/CategoryButton'
import PostCard from '@/components/PostCard'
import TopPost from '@/components/TopPost'
import { Posts } from '@/typings/db'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import DOMPurify from 'dompurify'
import postApi from '@/apis/postService'
import { FloatButton } from "antd";

const Top = styled.div`
  width: 100vw;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
`
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
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainPage = () => {
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
    const sortedPosts = sanitizedPosts.slice(1)

    return (
      <div>
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
        <FloatButton.BackTop/>
      </div>
    )
  }

  return null
}

export default MainPage
