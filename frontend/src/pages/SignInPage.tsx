import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    id: '', // email을 id로 변경
    password: '',
    confirmPassword: '',
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  // const navigate = useNavigate()

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = { id: '', password: '', confirmPassword: '' }
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

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)

    // 모든 폼이 유효한지 체크
    return !Object.values(newErrors).some((error) => error !== '')
  }

  // 입력값이 변경될 때마다 유효성 검사 실행
  useEffect(() => {
    const isValid = validateForm()
    setIsButtonDisabled(!isValid)
  }, [id, password, confirmPassword])

  // 회원가입 버튼 클릭 이벤트
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await axios.get('./userMockUp.json')
        const users = response.data.users

        // 동일한 id가 있는지 확인
        const existingUser = users.find((user) => user.id === id)
        if (existingUser) {
          message.error('이미 존재하는 사용자입니다.')
        } else {
          // 새로운 사용자 추가
          const newUser = {
            id,
            password,
            token: 'newToken123', // 실제로는 서버에서 생성된 토큰이 필요
          }

          // 로그인된 상태로 JWT 토큰을 로컬 스토리지에 저장
          localStorage.setItem('token', newUser.token)

          // 회원가입 성공 메시지
          message.success('회원가입 성공!')

          // 메인 페이지로 네비게이션
          // navigate('/')
        }
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error)
        message.error('회원가입 중 문제가 발생했습니다.')
      }
    } else {
      message.error('입력한 정보를 확인해주세요.')
    }
  }
  return (
    <Container>
      <Title>회원가입</Title>
      {/* ID 폼 */}
      <StyledInput
        size='large'
        placeholder='ID'
        value={id}
        onChange={(e) => setId(e.target.value)}
        prefix={<UserOutlined />}
      />
      {errors.id && <ErrorText>{errors.id}</ErrorText>}
      {/* 비밀번호 폼 */}
      <StyledInput
        size='large'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        prefix={<LockOutlined />}
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}
      {/* 비밀번호 확인 폼 */}
      <StyledInput
        size='large'
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        prefix={<LockOutlined />}
      />
      {errors.confirmPassword && (
        <ErrorText>{errors.confirmPassword}</ErrorText>
      )}
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

const StyledButton = styled(Button)`
  width: 324px;
  height: 63px;
  background-color: black;
  /* border-color: black; */
  font-size: 18px;
  border-radius: 10px;
  margin-top: 80px;
`

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`

export default SignUpPage
