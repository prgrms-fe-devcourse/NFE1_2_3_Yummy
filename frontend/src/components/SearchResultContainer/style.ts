import { Pagination } from 'antd'
import styled from 'styled-components'

export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`
export const SearchPageNav = styled(Pagination)`
  width: 100%;
`

export const SearchPageResult = styled.div`
  width: 100%;
  min-height: 100vh;
`
