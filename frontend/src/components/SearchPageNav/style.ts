import styled from 'styled-components'

export const SearchPageNavContainer = styled.ul`
  font-family: 'Noto Sans KR', sans-serif;
  width: 18%;
`
interface SearchPageNavItemProps {
  $isActive: boolean
}

export const SearchPageNavItem = styled.a<SearchPageNavItemProps>`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  list-style: none;
  padding: 1rem 0 1rem 1rem;
  font-size: 1.1rem;
  border-radius: 0.7rem;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
  color: ${({ $isActive }) => ($isActive ? '#1c1c1c' : '#7d7d7d')};
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
