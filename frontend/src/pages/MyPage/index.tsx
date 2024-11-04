import UserProfileCard from '@/components/UserProfileCard'
import { Container, MyPostTitle } from './style'
import PostCard from '@/components/PostCard'
import { Outlet, useParams } from 'react-router-dom'
import { checkAuthor } from '@/utils/user'
import { useUserInfoQuery } from '@/hooks/useUserInfoQuery'

const MyPage = () => {
  const { id: userId } = useParams()

  // 추후 핸들링 예정
  if (!userId) return <div>유저 아이디가 없습니다.</div>

  const { userData, isUserDataLoading, isUserDataError, userDataError } =
    useUserInfoQuery(userId)

  // 추후 스켈레톤을 위해 랜더링 분리
  const renderUserContent = () => {
    if (isUserDataLoading) return <div>Loading ...</div>

    if (isUserDataError) return <div>{userDataError?.message}</div>

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
    if (isUserDataLoading) return <div>Loading ...</div>

    if (isUserDataError) return <div>{userDataError?.message}</div>

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
      {renderPostContent()}
    </Container>
  )
}

export default MyPage
