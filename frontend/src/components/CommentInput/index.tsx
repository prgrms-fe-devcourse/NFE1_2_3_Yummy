import { useState } from 'react'
import {
  CommentButton,
  CommentButtonContainer,
  CommentInputContainer,
  CommentTextArea,
} from './style'
import { useMutation } from '@tanstack/react-query'

const CommentInput = () => {
  const [comment, setComment] = useState('')
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (comment: string) => {},
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    console.log(comment)
    setComment('')
  }

  return (
    <CommentInputContainer>
      <CommentTextArea
        placeholder='댓글을 입력해주세요.'
        value={comment}
        onChange={handleChange}
      />
      <CommentButtonContainer>
        {/* 추후 대댓글 기능 추가 시 사용 */}
        {/* <CommentButton
          $isDisplay={false}
          $isCancel={true}
        >
          <p>취소</p>
        </CommentButton> */}
        <CommentButton
          $isDisplay={true}
          disabled={isPending || comment.trim() === ''}
          onClick={handleSubmit}
        >
          <p>댓글 작성</p>
        </CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
