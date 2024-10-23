import styled from 'styled-components'

export const CommentInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
`
export const CommentTextArea = styled.textarea`
  width: 100% !important;
  height: 10rem;
  resize: none;
  border: 1px solid #eee;
  border-radius: 1rem;
  padding: 1rem;
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
  width: 10rem;
  height: 3rem;
  border: none;
  padding-block: 1.7rem;
  border-radius: 1rem;
  background-color: ${({ $isCancel }) =>
    $isCancel ? 'transparent' : '#1c1c1c'};
  color: ${({ $isCancel }) => ($isCancel ? '#1c1c1c' : 'white')};
  font-weight: ${({ $isCancel }) => ($isCancel ? '600' : '400')};
  font-size: 1rem;
  margin-top: 2rem;
`
