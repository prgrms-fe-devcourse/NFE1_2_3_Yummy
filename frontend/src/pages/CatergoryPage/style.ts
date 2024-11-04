import styled from 'styled-components'
import { MyPostTitle } from '../MyPage/style'

export const CategoryPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding-block: 3rem;
  min-height: 75vh;
  gap: 2rem;
`

export const CategoryTitle = styled(MyPostTitle)`
  margin-block: 0;
`

export const ItemCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  gap: calc(6% / 3);
`
