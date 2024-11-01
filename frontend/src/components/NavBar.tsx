import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Avatar, message } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavigationBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCategoryVisible, setIsCategoryVisible] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const navigate = useNavigate()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 로그인 여부 확인
  const loggedIn = Boolean(localStorage.getItem('token'))

  // userId로 프로필 이미지 URL 가져오기
  useEffect(() => {
    const fetchProfileImageUrl = async () => {
      const userId = localStorage.getItem('userId')
      if (userId) {
        try {
          const response = await axios.get(`/user/${userId}`)
          setProfileImageUrl(response.data.profileImageUrl)
        } catch (error) {
          console.error('Error fetching profile image URL:', error)
        }
      }
    }
    if (loggedIn) {
      fetchProfileImageUrl()
    }
  }, [loggedIn])

  // 타이머 설정 함수
  const toggleVisibility = (
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
  ) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    if (visible) {
      setVisible(true)
    } else {
      closeTimeoutRef.current = setTimeout(() => setVisible(false), 200)
    }
  }

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsModalVisible(false)
    message.success('로그아웃이 완료되었습니다.')
    navigate('/')
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
            onMouseEnter={() => toggleVisibility(setIsCategoryVisible, true)}
            onMouseLeave={() => toggleVisibility(setIsCategoryVisible, false)}
          >
            <Category>Category</Category>
            {isCategoryVisible && (
              <CategoryModal>
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
              onMouseEnter={() => toggleVisibility(setIsModalVisible, true)}
              onMouseLeave={() => toggleVisibility(setIsModalVisible, false)}
            >
              <StyledAvatar
                size={64}
                icon={<UserOutlined />}
                src={
                  profileImageUrl || 'https://example.com/default-avatar.jpg'
                }
              />

              {/* 아바타 모달창 */}
              {isModalVisible && (
                <AvatorModal>
                  <ModalContent>
                    <ModalButton onClick={() => navigate('/profile')}>
                      내 정보
                    </ModalButton>
                    <ModalDivider />
                    <ModalButton onClick={() => navigate('/write')}>
                      게시물 작성
                    </ModalButton>
                    <ModalDivider />
                    <ModalButton onClick={handleLogout}>로그아웃</ModalButton>
                  </ModalContent>
                </AvatorModal>
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

// 카테고리 컨테이너
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

// 모달 공통 스타일
const modalStyles = `
  width: 170px;
  background-color: black;
  color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`

// 카테고리 모달
const CategoryModal = styled.div`
  ${modalStyles}
  position: absolute;
  top: 75px;
  left: 300px;
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
    color: #ccc;
  }
`

// 아바타 모달
const AvatorModal = styled.div`
  ${modalStyles}
  position: absolute;
  top: 75px;
  left: -103px;
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
