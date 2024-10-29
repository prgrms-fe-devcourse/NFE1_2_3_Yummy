import { PostPageContainer } from './style'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'
import PostSideButton from '@/components/PostSideButton'
import DeleteModal from '@/components/DeleteModal'

const PostPage = () => {
  return (
    <PostPageContainer>
      <DeleteModal type='post' />
      <PostContainer />
      <PostCommentContainer />
      <PostSideButton />
    </PostPageContainer>
  )
}

export default PostPage
