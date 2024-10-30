import UserProfileCard from '@/components/UserProfileCard'
import { Container, MyPostTitle } from './style'
import PostCard from '@/components/PostCard'
import { Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userApi from '@/apis/userService'

const MyPage = () => {
  const { id: userId } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userData', userId],
    queryFn: () => {
      if (userId) {
        return userApi.getUserData(userId)
      }
    },
    enabled: !!userId,
  })

  // 추후 스켈레톤을 위해 랜더링 분리

  const renderUserContent = () => {
    if (isLoading) {
      return <div>Loading ...</div>
    }

    if (isError) {
      return <div>{error.message}</div>
    }

    if (data) {
      const { posts, ...rest } = data
      return (
        <UserProfileCard
          {...rest}
          isDisplay={true}
        />
      )
    }
  }

  const renderPostContent = () => {
    if (isLoading) {
      return <div>Loading ...</div>
    }

    if (isError) {
      return <div>{error.message}</div>
    }

    if (data) {
      const { posts } = data
      return posts?.map((post) => (
        <PostCard
          key={post._id}
          {...post}
        />
      ))
    }
  }

  return (
    <Container>
      <Outlet context={data} />
      {renderUserContent()}
      <MyPostTitle>
        <h3>My Post</h3>
        <hr />
      </MyPostTitle>
      {renderPostContent()}
    </Container>
  )
}

export default MyPage
