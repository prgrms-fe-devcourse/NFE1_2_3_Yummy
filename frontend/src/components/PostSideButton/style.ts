import { FloatButton } from 'antd'
import styled from 'styled-components'

export const PostSideButtonContainer = styled(FloatButton.Group)`
  width: 3.5rem;
`

export const PostSideButtonItem = styled(FloatButton)<{ $isLiked?: boolean }>`
  width: 100%;
  height: 3rem;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 100%;
    height: 100%;
  }

  & svg:first-child {
    color: ${({ $isLiked }) => ($isLiked ? '#EE3441' : '#1c1c1c')};
  }
`
