import { CommentContainer } from '@/pages/PostPage/style'
import CommentCard from '../CommentCard'
import CommentInput from '../CommentInput'
import { Comment } from '@/typings/db'
import { getComment } from '@/apis/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const PostCommentContainer = () => {
  const { id: postId } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comment', postId],
    queryFn: async () => await getComment(postId as string),
  })
  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>Error: {error.message}</div>
  }

  if (data) {
    content = data.map((comment: Comment) => <CommentCard {...comment} />)
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
