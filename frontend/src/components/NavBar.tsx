import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Menu, Avatar } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const NavigationBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [iscategoryVisible, setIsCategoryVisible] = useState(false)
  const navigate = useNavigate()
  // let isMounted = true //마운트 여부 추적하는 함수

  // clean up
  // useEffect(() => {
  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  // 로그인 여부 확인
  const isLoggedIn = () => {
    return !!localStorage.getItem('token') // JWT 토큰이 있으면 true 반환
  }
  // 로그인 상태 체크
  const loggedIn = isLoggedIn()

  // 프로필 모달 토글
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev)
  }

  // 카테고리 모달 토글
  const handleCategoryMouseEnter = () => {
    setIsCategoryVisible(true) // 마우스가 들어가면 모달을 보이도록 설정
  }

  const handleCategoryMouseLeave = () => {
    setIsCategoryVisible(false) // 마우스가 나가면 모달을 숨김
  }

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('JWTtoken')
    setIsModalVisible(false)
    navigate('/')
  }

  // 내 정보 페이지 이동
  const handleProfile = () => {
    navigate('/profile') // 프로필 페이지로 이동
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
          <Category
            onMouseEnter={handleCategoryMouseEnter}
            onMouseLeave={handleCategoryMouseLeave}
          >
            Category
          </Category>
          {iscategoryVisible && (
            <CategoryModal>
              {categories.map((category, index) => (
                <CategoryItem key={index}>{category}</CategoryItem>
              ))}
            </CategoryModal>
          )}
        </NavLinks>
      </LogoSection>
      <SearchLoginSection>
        <SearchOutlined
          style={{ fontSize: '30px' }}
          onClick={() => navigate('/search')}
        />
        <LogInBtnContainer>
          {loggedIn ? (
            <AvatarContainer>
              <StyledAvatar
                size={64}
                icon={<UserOutlined />}
                src='https://your-avatar-image-url' // 사용자 아바타 이미지로 변경 가능
                onClick={toggleModal}
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

const Category = styled.div`
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

// 커스텀 모달
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
  font-size: 20px;
  font-family: 'Libre Baskerville';
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

// 카테고리 아이템
const CategoryItem = styled.div`
  cursor: pointer;
  &:hover {
    color: #ccc; // 호버 시 약간 밝은 회색으로 변경
  }
`

export default NavigationBar
