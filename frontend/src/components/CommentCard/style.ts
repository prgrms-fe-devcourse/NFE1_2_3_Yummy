import styled from 'styled-components'

export const CommentCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 1rem;
  border-bottom: 1px solid #eee;
`
export const CommentCardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }
`
