import { PostImage } from '@/pages/PostPage/style'
import PostPagePostCard from '../PostPagePostCard'
import UserProfileCard from '../UserProfileCard'

const PostContainer = () => {
  return (
    <>
      <PostImage src='https://img.freepik.com/free-photo/tofu-yolk-boiled-spicy-soup_1150-42896.jpg?t=st=1729664573~exp=1729668173~hmac=8f7746c1984bd6b33e717938f2338678ea050f458235f370e94d836ae8760181&w=1380' />
      <PostPagePostCard />
      <UserProfileCard
        name='애드워드 리'
        description="심사위원에게 가는 길은 길었어요. 가끔은 '잠깐만, 돌아가서 뭔가 고치고 싶다'라는 생각이 들기도 해요. 하지만 한 번 걷기 시작하면 끝까지 가봐야 하는 겁니다. 해봅시다."
        imageUrl='https://static.inews24.com/v1/0ea0b53518da00.jpg'
        isDisplay={false}
      />
    </>
  )
}

export default PostContainer
