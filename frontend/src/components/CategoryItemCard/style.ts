import styled from 'styled-components'

export const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background-color: white;

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
  justify-content: space-between;
  height: 12rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 64%;
  justify-content: space-between;
  cursor: pointer;

  & p {
    text-align: left !important;
    margin: 0 !important;
    padding: 0 !important;

    color: #666;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    & * {
      font-size: inherit !important;
      line-height: 1.5 !important;
      font-weight: normal !important;
      text-decoration: none !important;
      text-align: left !important;
    }
  }
`

export const CardInfo = styled.div`
  display: flex;
  color: #666;
`

export const CardAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 0.6rem;

  & p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & p:last-child {
    gap: 0.2rem;

    & svg {
      margin-top: 0.2rem;
    }
  }

  & img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
`
