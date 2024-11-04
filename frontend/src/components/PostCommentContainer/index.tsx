import { CommentContainer } from '@/pages/PostPage/style'
import CommentCard from '../CommentCard'
import CommentInput from '../CommentInput'
import { Comment } from '@/typings/db'
import { useParams } from 'react-router-dom'
import { useCommentQuery } from '@/hooks/userCommentQuery'
import ErrorPage from '@/pages/ErrorPage'

const PostCommentContainer = () => {
  const { id: postId } = useParams()

  if (!postId)
    return (
      <ErrorPage
        title='포스트 아이디가 없습니다.'
        message='다시 시도해주세요.'
      />
    )

  const { commentData, isCommentLoading, isCommentError, commentError } =
    useCommentQuery(postId)

  let content

  if (isCommentLoading) {
    content = <div>Loading...</div>
  }

  if (isCommentError) {
    content = (
      <div style={{ marginInline: 'auto', marginTop: '1rem' }}>
        댓글 호출 시 오류 발생. {commentError?.message}
      </div>
    )
  }

  if (commentData) {
    content = commentData.map((comment: Comment, index: number) => (
      <CommentCard
        key={`comment-${index}`}
        {...comment}
      />
    ))
  }

  if (commentData?.length === 0) {
    content = (
      <div style={{ marginInline: 'auto', marginTop: '1rem' }}>
        댓글이 없습니다.
      </div>
    )
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
