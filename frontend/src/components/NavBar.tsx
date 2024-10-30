import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Avatar, message } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const NavigationBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCategoryVisible, setIsCategoryVisible] = useState(false)
  const navigate = useNavigate()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 로그인 여부 확인
  const isLoggedIn = () => {
    return !!localStorage.getItem('token') // JWT 토큰이 있으면 true 반환
  }
  // 로그인 상태 체크
  const loggedIn = isLoggedIn()

  // 프로필 모달 토글
  const handleProfileMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsModalVisible(true)
  }

  const handleProfileMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsModalVisible(false)
    }, 200)
  }

  // 카테고리 모달 토글
  const handleCategoryMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsCategoryVisible(true)
  }

  const handleCategoryMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoryVisible(false)
    }, 200)
  }

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsModalVisible(false)
    message.success('로그아웃이 완료되었습니다.')
    navigate('/')
  }

  // 내 정보 페이지 이동
  const handleProfile = () => {
    navigate('/profile')
  }

  // 게시물 작성 네비게이션
  const handleWriting = () => {
    navigate('/write')
  }

  // 카테고리 배열
  const categories = [
    '전체',
    '한식',
    '중식',
    '일식',
    '양식',
    '동남아 요리',
    '남미 요리',
    '중동 요리',
    '퓨전 요리',
    '채식 요리',
    '해산물 요리',
    '바베큐 요리',
    '디저트 요리',
  ]

  return (
    <NavContainer>
      <LogoSection>
        <Logo
          src='/Logo.png'
          alt='Logo'
        />
        <NavLinks>
          <StyledLink to='/'>Home</StyledLink>

          <CategoryContainer
            onMouseEnter={handleCategoryMouseEnter}
            onMouseLeave={handleCategoryMouseLeave}
          >
            <Category>Category</Category>
            {isCategoryVisible && (
              <CategoryModal
                onMouseEnter={handleCategoryMouseEnter}
                onMouseLeave={handleCategoryMouseLeave}
              >
                {categories.map((category, index) => (
                  <CategoryItem key={index}>{category}</CategoryItem>
                ))}
              </CategoryModal>
            )}
          </CategoryContainer>
        </NavLinks>
      </LogoSection>
      <SearchLoginSection>
        <SearchOutlined
          style={{ fontSize: '30px' }}
          onClick={() => navigate('/search')}
        />
        <LogInBtnContainer>
          {loggedIn ? (
            <AvatarContainer
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <StyledAvatar
                size={64}
                icon={<UserOutlined />}
                src='https://your-avatar-image-url' // 사용자 아바타 이미지로 변경 가능
              />

              {/* 아바타 모달창 */}
              {isModalVisible && (
                <CustomModal>
                  <ModalContent>
                    <ModalButton onClick={handleProfile}>내 정보</ModalButton>
                    <ModalDivider />
                    <ModalButton onClick={handleWriting}>
                      게시물 작성
                    </ModalButton>
                    <ModalDivider />
                    <ModalButton onClick={handleLogout}>로그아웃</ModalButton>
                  </ModalContent>
                </CustomModal>
              )}
            </AvatarContainer>
          ) : (
            <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
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
  text-align: center;
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
  gap: 20px;
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

//카테고리 컨테이너
const CategoryContainer = styled.div``

const Category = styled.div`
  font-family: 'Libre Baskerville';
  font-size: 20px;
  color: black;
  margin-right: 20px;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`

const CategoryModal = styled.div`
  position: absolute;
  top: 75px;
  left: 300px;
  width: 170px;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  font-family: 'Libre Baskerville';
`

const CategoryItem = styled.div`
  cursor: pointer;
  &:hover {
    color: #ccc; // 호버 시 약간 밝은 회색으로 변경
  }
`

// 아바타 모달창
const CustomModal = styled.div`
  position: absolute;
  top: 75px;
  left: -103px;
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
