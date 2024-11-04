import styled from 'styled-components'

export const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background-color: white;
  height: 20rem;

  & img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
  }
`

export const CardContent = styled.div`
  padding: 0.6rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

export const CardInfo = styled.div`
  display: flex;
  color: #666;
  /* gap: 1rem; */
`

export const CardAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
`
