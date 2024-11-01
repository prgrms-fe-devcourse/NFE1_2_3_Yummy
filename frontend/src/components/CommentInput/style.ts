import styled from 'styled-components'

interface CommentInputContainerProps {
  $isEdit: boolean
}

export const CommentInputContainer = styled.div<CommentInputContainerProps>`
  width: 100%;
  padding: ${({ $isEdit }) => ($isEdit ? '1rem' : '0')};
  margin-top: ${({ $isEdit }) => ($isEdit ? '1rem' : '0')};
  background-color: ${({ $isEdit }) => ($isEdit ? '#eee' : 'transparent')};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
`
export const CommentTextArea = styled.textarea`
  width: 100% !important;
  height: 8rem;
  padding: 1rem;
  margin-block: 1rem;
  resize: none;
  border: 1px solid #eee;
  border-radius: 1rem;
  font-size: 1rem;
  box-sizing: border-box;
`
export const CommentButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`

interface CommentButtonProps {
  $isDisplay: boolean
  $isCancel?: boolean
}

export const CommentButton = styled.button<CommentButtonProps>`
  display: ${({ $isDisplay }) => ($isDisplay ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$isCancel ? '5rem' : '8.5rem')};
  height: 3rem;
  border: none;
  border-radius: 1rem;
  background-color: ${({ $isCancel }) =>
    $isCancel ? 'transparent' : '#1c1c1c'};
  color: ${({ $isCancel }) => ($isCancel ? '#1c1c1c' : 'white')};
  font-weight: ${({ $isCancel }) => ($isCancel ? '600' : '400')};
  font-size: 1rem;
`
