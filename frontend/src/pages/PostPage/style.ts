import styled from 'styled-components'

export const PostPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
`

export const PostImage = styled.img`
  width: 100%;
  height: 35rem;
  object-fit: cover;
  filter: brightness(0.75);
`
export const CommentContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
