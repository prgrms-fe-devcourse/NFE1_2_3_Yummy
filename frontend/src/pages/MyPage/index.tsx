import UserProfileCard from '@/components/UserProfileCard'
import { Container, MyPostTitle } from './style'
import { mockPosts } from '@/utils/mockPosts'
import PostCard from '@/components/PostCard'

const MyPage = () => {
  return (
    <Container>
      <UserProfileCard
        name='애드워드 리'
        description="심사위원에게 가는 길은 길었어요. 가끔은 '잠깐만, 돌아가서 뭔가 고치고 싶다'라는 생각이 들기도 해요. 하지만 한 번 걷기 시작하면 끝까지 가봐야 하는 겁니다. 해봅시다."
        imageUrl='https://static.inews24.com/v1/0ea0b53518da00.jpg'
        isDisplay={false}
      />

      <MyPostTitle>
        <h3>My Post</h3>
        <hr />
      </MyPostTitle>

      {mockPosts.map(({ author, category, date, imgUrl, text, title }) => (
        <PostCard
          key={author}
          author={author}
          category={category}
          date={date}
          imgUrl={imgUrl}
          text={text}
          title={title}
        />
      ))}
    </Container>
  )
}

export default MyPage
