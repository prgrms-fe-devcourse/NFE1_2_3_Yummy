import Radio from 'antd/es/radio/radio'
import styled from 'styled-components'

export const SearchPageContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  padding-block: 2rem;
  flex-direction: column;
  width: 60%;
  gap: 2rem;
  min-height: 100vh;
`

export const SearchPageResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const SearchRadio = styled(Radio)`
  &:hover {
    outline: none !important;
  }
`
