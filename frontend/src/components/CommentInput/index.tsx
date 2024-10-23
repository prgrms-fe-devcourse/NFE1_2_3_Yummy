import {
  CommentButton,
  CommentButtonContainer,
  CommentInputContainer,
  CommentTextArea,
} from './style'

const CommentInput = () => {
  return (
    <CommentInputContainer>
      <CommentTextArea placeholder='댓글을 입력해주세요.' />
      <CommentButtonContainer>
        <CommentButton
          $isDisplay={true}
          $isCancel={true}
        >
          취소
        </CommentButton>
        <CommentButton $isDisplay={true}>댓글 작성</CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
