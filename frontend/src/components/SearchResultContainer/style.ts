import { Pagination } from 'antd'
import styled from 'styled-components'

export const SearchResultContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`
export const SearchPageNav = styled(Pagination)`
  color: #1c1c1c !important;

  &.ant-pagination .ant-pagination-item-active,
  :where(.css-dev-only-do-not-override-1hpnbz2).ant-pagination
    .ant-pagination-item-active {
    background-color: white !important;
    border-color: #1c1c1c !important;
    border-width: 2px !important;
  }

  &.ant-pagination .ant-pagination-item-active:hover a,
  :where(.css-dev-only-do-not-override-1hpnbz2).ant-pagination
    .ant-pagination-item-active:hover
    a {
    color: #1c1c1c !important;
  }

  &.ant-pagination .ant-pagination-item-active a,
  :where(.css-dev-only-do-not-override-1hpnbz2).ant-pagination
    .ant-pagination-item-active
    a {
    color: #1c1c1c !important;
  }
`

export const SearchPageResult = styled.div`
  width: 100%;
  min-height: 116.2vh;
`
