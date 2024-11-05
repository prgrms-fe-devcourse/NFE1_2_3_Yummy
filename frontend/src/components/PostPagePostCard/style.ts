import styled from 'styled-components'

export const PostPagePostCardContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;

  & p {
    color: #7d7d7d;
  }

  & h1 {
    text-align: center;
    word-break: keep-all;
    word-wrap: break-word;
  }
`
export const PostDetail = styled.div`
  display: flex;
  align-items: center;
`

export const AuthorDetail = styled.p`
  display: flex;
  align-items: center;

  & span {
    margin-left: 0.5rem;
  }
`

export const AuthorProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

export const Dot = styled.p`
  margin-inline: 0.5rem;
`

export const PostContent = styled.div`
  font-family: 'Noto Sans KR', sans-serif !important;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  word-break: keep-all;
  line-height: 2;
  margin-block: 3.5rem;
  gap: 1rem;

  * {
    margin: 0 !important;
    padding: 0 !important;
    list-style-position: inside;
  }
`
