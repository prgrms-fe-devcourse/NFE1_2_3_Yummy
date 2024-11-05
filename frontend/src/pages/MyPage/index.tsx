import UserProfileCard from '@/components/UserProfileCard'
import { Container, MyPostTitle, PostsContainer } from './style'
import PostCard from '@/components/PostCard'
import { Outlet, useParams } from 'react-router-dom'
import { checkAuthor } from '@/utils/user'
import { useUserInfoQuery } from '@/hooks/useUserInfoQuery'
import { PostLoading } from '../PostPage/style'
import ErrorPage from '../ErrorPage'

const MyPage = () => {
  const { id: userId } = useParams()

  if (!userId)
    return (
      <ErrorPage
        title='유저 아이디가 없습니다.'
        message='다시 시도해주세요.'
      />
    )

  const { userData, isUserDataLoading, isUserDataError } =
    useUserInfoQuery(userId)

  // 추후 스켈레톤을 위해 랜더링 분리
  const renderUserContent = () => {
    if (isUserDataLoading) return <PostLoading />

    if (userData) {
      const { posts, ...rest } = userData
      return (
        <UserProfileCard
          {...rest}
          isDisplay={true}
        />
      )
    }
  }
  const renderPostContent = () => {
    if (isUserDataLoading) return <PostLoading />

    if (userData) {
      const { posts } = userData

      return posts?.map((post) => (
        <PostCard
          key={post._id}
          {...post}
        />
      ))
    }
  }

  if (isUserDataError)
    return (
      <ErrorPage
        title='유저 정보를 불러오는 중 오류가 발생했습니다.'
        message='다시 시도해주세요.'
      />
    )

  // Author 여부 체크
  const isAuthor = userId && checkAuthor(userId)
  const title = isAuthor ? 'My Post' : 'User Post'

  return (
    <Container>
      <Outlet context={userData} />
      {renderUserContent()}
      <MyPostTitle>
        <h3>{title}</h3>
        <hr />
      </MyPostTitle>
      <PostsContainer>{renderPostContent()}</PostsContainer>
    </Container>
  )
}

export default MyPage
