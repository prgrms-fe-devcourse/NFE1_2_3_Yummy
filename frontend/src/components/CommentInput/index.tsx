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
          <p>취소</p>
        </CommentButton>
        <CommentButton $isDisplay={true}>
          <p>댓글 작성</p>
        </CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
