import PostPagePostCard from '@/components/PostPagePostCard'
import { CommentContainer, PostImage, PostPageContainer } from './style'
import LikeButton from '@/components/LikeButton'
import CommentInput from '@/components/CommentInput'
import CommentCard from '@/components/CommentCard'

const PostPage = () => {
  return (
    <PostPageContainer>
      <PostImage src='https://img.freepik.com/free-photo/tofu-yolk-boiled-spicy-soup_1150-42896.jpg?t=st=1729664573~exp=1729668173~hmac=8f7746c1984bd6b33e717938f2338678ea050f458235f370e94d836ae8760181&w=1380' />
      <PostPagePostCard />
      <LikeButton />
      <CommentContainer>
        <h3>1개의 댓글</h3>
        <CommentInput />
        <CommentCard />
      </CommentContainer>
    </PostPageContainer>
  )
}

export default PostPage
