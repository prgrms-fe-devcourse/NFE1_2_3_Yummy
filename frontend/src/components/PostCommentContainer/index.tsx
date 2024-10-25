import { CommentContainer } from '@/pages/PostPage/style'
import CommentCard from '../CommentCard'
import CommentInput from '../CommentInput'

const PostCommentContainer = () => {
  return (
    <CommentContainer>
      <h3>1개의 댓글</h3>
      <CommentInput />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </CommentContainer>
  )
}
export default PostCommentContainer
