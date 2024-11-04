import { CommentContainer } from '@/pages/PostPage/style'
import CommentCard from '../CommentCard'
import CommentInput from '../CommentInput'
import { Comment } from '@/typings/db'
import { useParams } from 'react-router-dom'
import { useCommentQuery } from '@/hooks/userCommentQuery'

const PostCommentContainer = () => {
  const { id: postId } = useParams()

  if (!postId) return <div>포스트 아이디가 없습니다.</div>

  const { commentData, isCommentLoading, isCommentError, commentError } =
    useCommentQuery(postId)

  let content

  if (isCommentLoading) {
    content = <div>Loading...</div>
  }

  if (isCommentError) {
    content = <div>Error: {commentError?.message}</div>
  }

  if (commentData) {
    content = commentData.map((comment: Comment) => (
      <CommentCard
        key={comment._id}
        {...comment}
      />
    ))
  }

  return (
    <CommentContainer>
      <h3>{commentData?.length}개의 댓글</h3>
      <CommentInput />
      {content}
    </CommentContainer>
  )
}
export default PostCommentContainer
