import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Modal, Avatar } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const NavigationBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigate = useNavigate()

  //로그인 버튼 -> 네비게이터
  const handleLoginClick = () => {
    navigate('/login')
  }

  // 로그인 여부 확인
  const isLoggedIn = () => {
    return !!localStorage.getItem('token') // JWT 토큰이 있으면 true 반환
  }
  // 로그인 상태 체크
  const loggedIn = isLoggedIn()

  // 모달 열기/닫기 (토글)
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev) // 이전 상태 반대로 변경
  }

  // 모달 닫기
  const hideModal = () => {
    setIsModalVisible(false)
  }

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token') // JWT 토큰 삭제
    setIsModalVisible(false)
    navigate('/') // 로그아웃 후 메인 페이지로 이동
  }

  // 내 정보 페이지 이동
  const handleProfile = () => {
    navigate('/profile') // 프로필 페이지로 이동
  }

  return (
    <NavContainer>
      <LogoSection>
        <Logo
          src='/Logo.png'
          alt='Logo'
        />
        <NavLinks>
          <StyledLink to='/'>Home</StyledLink>
          <StyledLink to='/category'>Category</StyledLink>
        </NavLinks>
      </LogoSection>
      <SearchLoginSection>
        <SearchInput
          placeholder='검색어를 입력해 주세요.'
          prefix={<SearchOutlined />}
        />
        <LogInBtnContainer>
          {loggedIn ? (
            <AvatarContainer>
              <StyledAvatar
                size={64}
                icon={<UserOutlined />}
                src='https://your-avatar-image-url' // 사용자 아바타 이미지로 변경 가능
                onClick={toggleModal} // 아바타 클릭 시 모달 열기/닫기 토글
              />

              {/* 모달창 */}
              {isModalVisible && (
                <CustomModal>
                  <ModalContent>
                    <ModalButton onClick={handleProfile}>내 정보</ModalButton>
                    <ModalDivider />
                    <ModalButton onClick={handleLogout}>로그아웃</ModalButton>
                  </ModalContent>
                </CustomModal>
              )}
            </AvatarContainer>
          ) : (
            // <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
            <AvatarContainer>
              <StyledAvatar
                size={64}
                icon={<UserOutlined />}
                src='https://your-avatar-image-url' // 사용자 아바타 이미지로 변경 가능
                onClick={toggleModal} // 아바타 클릭 시 모달 열기/닫기 토글
              />

              {/* 모달창 */}
              {isModalVisible && (
                <CustomModal>
                  <ModalContent>
                    <ModalButton onClick={handleProfile}>내 정보</ModalButton>
                    <ModalDivider />
                    <ModalButton onClick={handleLogout}>로그아웃</ModalButton>
                  </ModalContent>
                </CustomModal>
              )}
            </AvatarContainer>
          )}
        </LogInBtnContainer>
      </SearchLoginSection>
    </NavContainer>
  )
}

// Styled Components
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 200px;
  margin-right: 20px;
`

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
`

const StyledLink = styled(Link)`
  font-family: 'Libre Baskerville';
  font-size: 20px;
  color: black;
  margin-right: 20px;
  text-decoration: none;

  &:hover {
    color: #555;
  }
`

const SearchLoginSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const SearchInput = styled(Input)`
  width: 350px;
  height: 46px;
  margin-right: 10px;
  border-radius: 10px;
  .ant-input-prefix {
    margin-right: 10px; // prefix와 placeholder 간의 간격을 벌림
  }
`
const LogInBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginButton = styled.button`
  width: 135px;
  height: 46px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
`

const StyledAvatar = styled(Avatar)`
  border: 2px solid #ddd;
`

// 커스텀 모달 스타일링 (아바타 바로 밑에 위치)
const CustomModal = styled.div`
  position: absolute;
  top: 75px;
  left: -125px;
  width: 170px;
  background-color: black;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ModalButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: black;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`

const ModalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 5px 0;
`

export default NavigationBar
