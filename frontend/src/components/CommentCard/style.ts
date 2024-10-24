import styled from 'styled-components'

export const CommentCardContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #eee;
`
export const CommentCardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
  }

  & p {
    font-size: 0.9rem;
  }

  & p:first-child {
    font-weight: 600;
  }
`
export const CommentCardContent = styled.p`
  width: 100%;
  line-height: 1.5;
  padding-block: 1.5rem;
`

export const CommentCardButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  & button {
    border: none;
    background-color: transparent;
  }

  & button:first-child {
    font-size: 1.5rem;
  }
`

export const CommentReplyContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.5rem;
`
