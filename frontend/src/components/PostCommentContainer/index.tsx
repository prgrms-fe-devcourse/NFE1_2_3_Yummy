import { CommentContainer } from '@/pages/PostPage/style'
import CommentCard from '../CommentCard'
import CommentInput from '../CommentInput'
import { Comment } from '@/typings/db'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import postApi from '@/apis/postService'

const PostCommentContainer = () => {
  const { id: postId } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comment', postId],
    queryFn: async () => {
      if (postId) {
        return postApi.getComment(postId)
      }
    },
    enabled: !!postId,
  })

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>Error: {error.message}</div>
  }

  if (data) {
    content = data.map((comment: Comment) => (
      <CommentCard
        key={comment._id}
        {...comment}
      />
    ))
  }

  return (
    <CommentContainer>
      <h3>{data?.length}개의 댓글</h3>
      <CommentInput />
      {content}
    </CommentContainer>
  )
}
export default PostCommentContainer
