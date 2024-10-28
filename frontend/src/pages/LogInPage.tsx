import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false) // 버튼 클릭 여부 상태 추가
  const navigate = useNavigate()

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = { email: '', password: '' }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      newErrors.email = '유효한 이메일을 입력해주세요.'
    }
    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        '비밀번호는 영문, 숫자, 특수문자를 포함하여 8~16자여야 합니다.'
    }

    setErrors(newErrors)

    // 모든 폼이 유효한지 체크
    return !Object.values(newErrors).some((error) => error !== '')
  }

  // 버튼 활성화 상태 관리
  useEffect(() => {
    const isFormFilled = email !== '' && password !== ''
    setIsButtonDisabled(!isFormFilled)
  }, [email, password])

  // 버튼 클릭 이벤트
  const handleLogIn = async () => {
    setIsSubmitted(true) // 버튼이 클릭되었음을 저장
    if (validateForm()) {
      try {
        // 로그인 POST 요청 보내기
        const response = await axios.post('api/auth/login', {
          email,
          password,
        })

        if (response.status === 201) {
          // JWT 토큰을 로컬 스토리지에 저장
          const { token } = response.data // 응답에서 토큰 추출
          localStorage.setItem('token', token)

          message.success('로그인이 완료되었습니다.')
          navigate('/') // 홈으로 이동
        }
      } catch (error) {
        message.error('로그인 중 문제가 발생했습니다.')
      }
    } else {
      message.error('입력한 정보를 확인해주세요.')
    }
  }

  return (
    <Container>
      <Title>로그인</Title>

      {/* Email 폼 */}
      <StyledInput
        size='large'
        placeholder='Email'
        prefix={<UserOutlined />}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isSubmitted && errors.email && <ErrorText>{errors.email}</ErrorText>}

      {/* PW 폼 */}
      <StyledInput
        size='large'
        type='password'
        placeholder='Password'
        prefix={<LockOutlined />}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isSubmitted && errors.password && (
        <ErrorText>{errors.password}</ErrorText>
      )}

      <LinkText onClick={() => navigate('/')}>회원가입하기</LinkText>

      {/* 버튼 */}
      <StyledButton
        type='primary'
        size='large'
        onClick={handleLogIn}
        disabled={isButtonDisabled}
      >
        로그인
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
  background-color: #f0f0f0;
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

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`

export default LoginPage
