import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  //단축키 : rafce
  return (
    <Container>
      <Logo src='/Yum문구.png' />
      <StyledText>
        © 2012-2020 Nordic Rose Co. All rights reserved.{' '}
      </StyledText>
    </Container>
  )
}

//styled
const Container = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  justify-content: center; /* 수직 방향으로 중앙 정렬 */
  align-items: center; /* 가로 방향으로 중앙 정렬 */
  width: auto;
  height: 191px;
  background-color: black;
`

const Logo = styled.img`
  width: 180px;
  margin-bottom: 25px;
`

const StyledText = styled.div`
  font-size: 12px;
  color: white;
`

export default Footer
