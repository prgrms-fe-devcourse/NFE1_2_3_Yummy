import styled from 'styled-components'

export const SearchPageInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1.5px solid rgb(176, 184, 193);

  & button {
    border: none;
    background-color: transparent;
  }

  & input {
    font-family: 'Noto Sans KR', sans-serif !important;
    width: 100%;
    height: 4rem;
    border: none;
    background-color: transparent;
    padding-left: 1rem;
    font-size: 1.3rem;
    font-weight: 500;
  }

  & input::placeholder {
    color: #7d7d7d;
  }

  & input:focus {
    outline: none;
  }

  &:focus-within {
    border-bottom: 1.5px solid #1c1c1c;
  }
`
