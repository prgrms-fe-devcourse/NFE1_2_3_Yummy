import UserProfileCard from '@/components/UserProfileCard'
import { Container, MyPostTitle } from './style'
import PostCard from '@/components/PostCard'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Post } from '@/typings/db'
import postApi from '@/apis/postService'

const userProfile = {
  nickname: '애드워드 리',
  bio: '심사위원에게 가는 길은 길었어요. 가끔은 "잠깐만, 돌아가서 뭔가 고치고 싶다"라는 생각이 들기도 해요. 하지만 한 번 걷기 시작하면 끝까지 가봐야 하는 겁니다. 해봅시다.',
  profileImageUrl: 'https://static.inews24.com/v1/0ea0b53518da00.jpg',
}

const MyPage = () => {
  const { data, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ['userPost'],
    queryFn: async () => await postApi.getPost(),
  })

  let content

  if (data) {
    content = data.map((post) => (
      <PostCard
        key={post._id}
        {...post}
      />
    ))
  }

  if (isLoading) {
    content = <div>Loading ...</div>
  }

  if (isError) {
    content = <div>{error.message}</div>
  }

  return (
    <Container>
      <Outlet />
      <UserProfileCard
        {...userProfile}
        isDisplay={true}
      />

      <MyPostTitle>
        <h3>My Post</h3>
        <hr />
      </MyPostTitle>

      {content}
    </Container>
  )
}

export default MyPage
