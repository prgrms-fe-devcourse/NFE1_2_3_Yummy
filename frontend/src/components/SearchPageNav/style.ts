import styled from 'styled-components'

export const SearchPageNavContainer = styled.ul`
  font-family: 'Noto Sans KR', sans-serif;
`
export const SearchPageNavItem = styled.a`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  list-style: none;
  padding: 1rem 4rem 1rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.7rem;
  color: #7d7d7d;
  letter-spacing: -0.05rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    color: #1c1c1c;
  }

  &:active {
    background-color: #e0e0e0;
    color: #1c1c1c;
  }
`
