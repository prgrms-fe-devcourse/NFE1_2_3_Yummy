import { PostPageContainer } from './style'
import LikeButton from '@/components/LikeButton'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'

const PostPage = () => {
  return (
    <PostPageContainer>
      <PostContainer />
      <LikeButton />
      <PostCommentContainer />
    </PostPageContainer>
  )
}

export default PostPage
