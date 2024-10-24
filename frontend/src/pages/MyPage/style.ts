import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding-block: 3rem;
`
export const MyPostTitle = styled.div`
  font-family: 'Libre Baskerville', sans-serif;
  font-size: 2rem;
  text-align: center;
  width: 10rem;
  margin-block: 4rem 6rem;

  & h3 {
    margin: 0;
    padding: 0;
  }

  & hr {
    margin-top: 0.5rem;
    height: 0.25rem;
    border: none;
    background: black;
  }
`
