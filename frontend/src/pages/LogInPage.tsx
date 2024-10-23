import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErros] = useState({
    id: '',
    password: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false) // 버튼 클릭 여부 상태 추가
  const navigate = useNavigate()

  return (
    <Container>
      <Title>로그인</Title>
      <StyledInput
        size='large'
        placeholder='ID'
        prefix={<UserOutlined />}
      />
      <StyledInput
        size='large'
        type='password'
        placeholder='Password'
        prefix={<LockOutlined />}
      />
      <LinkText>회원가입하기</LinkText>
      <StyledButton
        type='primary'
        size='large'
      >
        Login
      </StyledButton>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`

const Title = styled.h1`
  font-size: 33px;
  margin-bottom: 40px;
`

const StyledInput = styled(Input)`
  width: 324px;
  height: 63px;
  margin-bottom: 20px;
  border-radius: 10px;
  .ant-input-prefix {
    margin-right: 15px; // prefix와 placeholder 간의 간격을 벌림
  }
`
const LinkText = styled.p`
  margin-top: 65px;
  margin-bottom: 15px;
  font-size: 14px;
  cursor: pointer;
  color: black;
`

const StyledButton = styled(Button)`
  width: 324px;
  height: 63px;
  background-color: black;
  font-size: 18px;
  border-radius: 10px;
`

export default LoginPage
