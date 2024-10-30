import { Radio } from 'antd'
import styled from 'styled-components'

export const SearchPageInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1.5px solid rgb(176, 184, 193);
  font-family: 'Noto Sans KR', sans-serif !important;

  & button {
    border: none;
    background-color: transparent;
  }

  & input {
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

export const SearchPageRadio = styled(Radio)`
  font-size: 0.9rem;
  font-weight: 500;

  &:hover .ant-radio-inner {
    border-color: #7d7d7d !important;
  }

  &.ant-radio-wrapper .ant-radio-checked .ant-radio-inner,
  :where(.css-dev-only-do-not-override-1hpnbz2).ant-radio-wrapper
    .ant-radio-checked
    .ant-radio-inner {
    border-color: #7d7d7d !important;
    background-color: #1c1c1c !important;
  }
`
