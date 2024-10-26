import { useRef } from 'react'
import {
  CommentButton,
  CommentButtonContainer,
  CommentInputContainer,
  CommentTextArea,
} from './style'

const CommentInput = () => {
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = () => {
    const userComment = commentRef.current?.value

    if (userComment?.trim() === '') {
      return
    }
    console.log(userComment)
  }
  return (
    <CommentInputContainer>
      <CommentTextArea
        placeholder='댓글을 입력해주세요.'
        ref={commentRef}
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
          onClick={handleSubmit}
        >
          <p>댓글 작성</p>
        </CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
