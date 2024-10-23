import styled from 'styled-components'

export const PostPagePostCardContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

  & img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #eee;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`

export const Dot = styled.p`
  margin-inline: 0.5rem;
`

export const PostContent = styled.div`
  width: 70%;
  margin-block: 1rem 4rem;
`
