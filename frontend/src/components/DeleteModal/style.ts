import { Modal } from 'antd'
import styled from 'styled-components'

export const DeleteModalContainer = styled(Modal)`
  font-family: 'Noto Sans KR', sans-serif !important;

  & p {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 500;
  }

  & button {
    &:first-child {
      border: none;
      box-shadow: none;
      font-size: 1rem;
      font-weight: 500;

      span {
        color: #1c1c1c !important;
        animation: none;
      }
    }

    &:last-child {
      background-color: #1c1c1c;
      color: #fff;

      &:hover {
        background-color: #1c1c1c !important;
        color: #fff;

        span {
          background-color: #1c1c1c;
          color: #fff;
        }
      }
    }

    div {
      display: none;
    }

    &[aria-label='Close'] {
      display: none;
    }
  }
`
