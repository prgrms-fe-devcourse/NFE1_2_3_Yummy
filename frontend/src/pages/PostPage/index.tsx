import { PostPageContainer } from './style'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'
import PostSideButton from '@/components/PostSideButton'

const PostPage = () => {
  return (
    <PostPageContainer>
      <PostContainer />
      <PostCommentContainer />
      <PostSideButton />
    </PostPageContainer>
  )
}

export default PostPage
