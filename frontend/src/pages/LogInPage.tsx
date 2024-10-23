import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    id: '',
    password: '',
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false) // 버튼 클릭 여부 상태 추가
  const navigate = useNavigate()

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = { id: '', password: '' }
    const idRegex = /^\S+$/ // 공백이 없는 문자열

    // 아이디 유효성 검사
    if (!id || !idRegex.test(id)) {
      newErrors.id = '유효한 아이디를 입력해주세요.'
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
    const isFormFilled = id !== '' && password !== ''
    setIsButtonDisabled(!isFormFilled)
  }, [id, password])

  // 버튼 클릭 이벤트
  const handleLogIn = async () => {
    setIsSubmitted(true) // 버튼이 클릭되었음을 저장
    if (validateForm()) {
      try {
        // 로그인 POST 요청 보내기
        const response = await axios.post('https://your-server.com/login', {
          id,
          password,
        })

        const { user, token } = response.data

        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', token)

        // 로그인 성공 메시지
        message.success('로그인 성공!')

        // 메인 페이지로 네비게이션
        navigate('/')
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
      {/* ID 폼 */}
      <StyledInput
        size='large'
        placeholder='ID'
        prefix={<UserOutlined />}
        onChange={(e) => setId(e.target.value)}
      />
      {isSubmitted && errors.id && <ErrorText>{errors.id}</ErrorText>}

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

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`

export default LoginPage
