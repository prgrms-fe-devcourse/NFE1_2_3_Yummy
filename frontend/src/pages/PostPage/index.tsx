import PostPagePostCard from '@/components/PostPagePostCard'
import { PostImage, PostPageContainer } from './style'
import LikeButton from '@/components/LikeButton'

const PostPage = () => {
  return (
    <PostPageContainer>
      <PostImage src='https://img.freepik.com/free-photo/tofu-yolk-boiled-spicy-soup_1150-42896.jpg?t=st=1729664573~exp=1729668173~hmac=8f7746c1984bd6b33e717938f2338678ea050f458235f370e94d836ae8760181&w=1380' />
      <PostPagePostCard />
      <LikeButton />
    </PostPageContainer>
  )
}

export default PostPage
