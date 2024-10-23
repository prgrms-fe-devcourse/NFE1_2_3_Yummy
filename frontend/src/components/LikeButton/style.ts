import styled from 'styled-components'

export const LikeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1c1c1c;
  padding: 0.8rem 1.3rem;
  border-radius: 5rem;

  & p {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin-inline: 1rem;
  }
`
export const ButtonLike = styled.button`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  border: none;
  background-color: white;
  font-size: 1.2rem;
`
