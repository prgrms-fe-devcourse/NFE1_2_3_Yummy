import React, { useEffect, useState } from 'react'
import { Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false) // 버튼 클릭 여부 상태 추가
  const navigate = useNavigate()

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      newErrors.email = '유효한 이메일을 입력해주세요.'
    }

    // 닉네임 유효성 검사
    const nicknameRegex = /^\S+$/ // 공백이 없는 문자열
    if (!nickname || !nicknameRegex.test(nickname)) {
      newErrors.nickname = '유효한 닉네임을 입력해주세요.'
    }

    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        '비밀번호는 영문, 숫자, 특수문자를 포함하여 8~16자여야 합니다.'
    }

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)

    // 모든 폼이 유효한지 체크
    return !Object.values(newErrors).some((error) => error !== '')
  }

  // 버튼 활성화 상태 관리
  useEffect(() => {
    const isFormFilled =
      email !== '' &&
      nickname !== '' &&
      password !== '' &&
      confirmPassword !== ''
    setIsButtonDisabled(!isFormFilled)
  }, [email, nickname, password, confirmPassword])

  // 버튼 클릭 이벤트
  const handleSignUp = async () => {
    setIsSubmitted(true) // 버튼이 클릭되었음을 저장
    if (validateForm()) {
      try {
        // 회원가입 POST 요청 보내기
        const response = await axios.post('api/auth/register', {
          email,
          nickname,
          password,
        })

        if (response.status === 201) {
          // token, userId를 로컬 스토리지에 저장
          const { access_token } = response.data
          localStorage.setItem('token', access_token)
          const userId = response.data.user.id
          localStorage.setItem('userId', userId)

          message.success('회원가입이 완료되었습니다.')
          navigate('/') // 홈으로 이동
        }
      } catch (error) {
        message.error('회원가입 중 문제가 발생했습니다.')
      }
    } else {
      message.error('입력한 정보를 확인해주세요.')
    }
  }

  return (
    <Container>
      <Title>회원가입</Title>

      {/* Email 폼 */}
      <StyledInput
        size='large'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        prefix={<UserOutlined />}
      />
      {isSubmitted && errors.email && <ErrorText>{errors.email}</ErrorText>}

      {/* Nickname 폼 */}
      <StyledInput
        size='large'
        placeholder='Nickname'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        prefix={<UserOutlined />}
      />
      {isSubmitted && errors.nickname && (
        <ErrorText>{errors.nickname}</ErrorText>
      )}

      {/* Password 폼 */}
      <StyledInput
        size='large'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        prefix={<LockOutlined />}
      />
      {isSubmitted && errors.password && (
        <ErrorText>{errors.password}</ErrorText>
      )}

      {/* Confirm Password 폼 */}
      <StyledInput
        size='large'
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        prefix={<LockOutlined />}
      />
      {isSubmitted && errors.confirmPassword && (
        <ErrorText>{errors.confirmPassword}</ErrorText>
      )}

      {/* 버튼 */}
      <StyledButton
        type='primary'
        size='large'
        onClick={handleSignUp}
        disabled={isButtonDisabled}
      >
        회원가입
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
  background-color: #f8f8f8;
  .ant-input-prefix {
    margin-right: 15px; // prefix와 placeholder 간의 간격을 벌림
  }
  &:hover {
    background-color: white;
    border-color: #7d7d7d;
  }
  .ant-input:focus {
    border-color: white !important;
    box-shadow: none !important;
  }

  &:focus,
  &:active {
    outline: none;
  }
`

const StyledButton = styled(Button)`
  width: 324px;
  height: 63px;
  background-color: black;
  /* border-color: black; */
  font-size: 18px;
  border-radius: 10px;
  margin-top: 80px;
  &:hover {
    background-color: #333 !important;
    color: white !important;
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`

export default SignUpPage
