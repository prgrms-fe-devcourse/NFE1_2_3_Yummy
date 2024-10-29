import { formatDate } from '@/utils/formatDate'
import {
  CommentCardButtonContainer,
  CommentCardContainer,
  CommentCardContent,
  CommentCardInfo,
} from './style'
import { Comment } from '@/typings/db'
import { queryClient } from '@/apis/api'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import postApi from '@/apis/postService'

const CommentCard = ({ content, author, createdAt, _id }: Comment) => {
  const { id: postId } = useParams()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (comment_id: string) => {
      if (postId) {
        await postApi.deleteComment(postId, comment_id)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] })
    },
  })

  const handleDelete = () => {
    mutate(_id)
  }

  const buttonDisabledPredicate = isPending || isError

  return (
    <CommentCardContainer>
      <CommentCardInfo>
        <img
          src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
          alt='user Img'
        />
        <div>
          <p>{author}</p>
          <p>{formatDate(createdAt)}</p>
        </div>
      </CommentCardInfo>
      <CommentCardContent>{content}</CommentCardContent>
      <CommentCardButtonContainer>
        <button disabled={buttonDisabledPredicate}>
          <p>수정</p>
        </button>
        <button
          onClick={handleDelete}
          disabled={buttonDisabledPredicate}
        >
          <p>삭제</p>
        </button>
      </CommentCardButtonContainer>
    </CommentCardContainer>
  )
}

export default CommentCard
