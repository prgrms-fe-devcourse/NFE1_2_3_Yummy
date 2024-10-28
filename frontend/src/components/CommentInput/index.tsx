import { useState } from 'react'
import {
  CommentButton,
  CommentButtonContainer,
  CommentInputContainer,
  CommentTextArea,
} from './style'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { queryClient } from '@/apis/api'
import { CommentForm } from '@/utils/Model/commentModel'
import postApi from '@/apis/postServite'

const CommentInput = () => {
  const { id: postId } = useParams()

  const [comment, setComment] = useState('')

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (commentData: CommentForm) => {
      await postApi.createComment(postId as string, commentData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    const commentData = new CommentForm(
      comment,
      Math.random().toString(36).substring(2, 15),
      postId as string,
    )
    mutate(commentData)
    setComment('')
  }

  const buttonDisabledPredicate = isPending || comment.trim() === ''

  return (
    <CommentInputContainer>
      <CommentTextArea
        placeholder='댓글을 입력해주세요.'
        value={comment}
        onChange={handleChange}
      />
      <CommentButtonContainer>
        <CommentButton
          $isDisplay={true}
          disabled={buttonDisabledPredicate}
          onClick={handleSubmit}
        >
          <p>댓글 작성</p>
        </CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
