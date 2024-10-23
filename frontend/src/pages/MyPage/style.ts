import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MyPostTitle = styled.div`
  font-family: 'Libre Baskerville', sans-serif;
  font-size: 2rem;
  text-align: center;
  width: 10rem;

  & h3 {
    margin: 0;
    padding: 0;
  }

  & hr {
    border: none;
    height: 3px;
    background: black;
  }
`
