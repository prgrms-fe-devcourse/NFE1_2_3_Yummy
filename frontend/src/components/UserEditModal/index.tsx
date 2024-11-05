import {
  LoadingOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  ImageContainer,
  ImageInputLabel,
  InputGroup,
  InputSection,
  Label,
  NicknameInput,
  PopupCard,
  ProfileImage,
  ProfileSection,
  TextArea,
  UserAvatar,
  UserProfileModalContainer,
} from './style'

import { useNavigateTo } from '@/hooks/useNavigateTo'
import { ChangeEvent, useEffect, useState } from 'react'
import { User, UserForm } from '@/typings/db'
import { useOutletContext } from 'react-router-dom'
import { useUpdateUserInfoQuery } from '@/hooks/useUserInfoQuery'
import { message } from 'antd'

const UserEditModal = () => {
  const userData = useOutletContext<User>()
  const handleNavigateTo = useNavigateTo()

  const [userImage, setUserImage] = useState<string | File | null>(null)

  useEffect(() => {
    if (userData.profileImageUrl) {
      const imageUrl = userData.profileImageUrl
      setUserImage(imageUrl)
    }
  }, [userData.profileImageUrl])

  const handleNavigateToProfile = () => {
    handleNavigateTo('../')
  }

  const { updateUserInfo, isUpdatingUserInfo, isUpdatingUserInfoError } =
    useUpdateUserInfoQuery(userData._id, handleNavigateToProfile)

  if (isUpdatingUserInfoError) {
    message.error('유저 정보 수정 중 오류 발생')
  }

  // 선택한 파일 출력을 위한 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          const result = e.target?.result
          setUserImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 유저 데이터 수정 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let formData

    if (e.target instanceof HTMLFormElement) {
      formData = new FormData(e.target)
    }

    let requestBody = formData ? Object.fromEntries(formData) : userData

    const isImageUnChanged =
      requestBody.profileImageUrl instanceof File &&
      requestBody.profileImageUrl.name === ''

    // 이미지가 변경되지 않았으면 호출 시 profileImageUrl 항목 제거

    if (isImageUnChanged) {
      const { profileImageUrl, ...restRequestBody } = requestBody
      requestBody = restRequestBody
    }

    const isUserDataChanged =
      userData.bio !== requestBody.bio ||
      userData.nickname !== requestBody.nickname ||
      userData.profileImageUrl

    // 유저 데이터가 변경되었으면 업데이트
    if (isUserDataChanged) {
      const userForm = requestBody as UserForm

      updateUserInfo(userForm)
    }

    handleNavigateToProfile()
  }

  // 유저 데이터
  const { nickname, bio } = userData
  const userProfileImage =
    typeof userImage === 'string' ? (
      <ProfileImage
        src={userImage}
        alt='User Profile'
      />
    ) : (
      <UserAvatar icon={<UserOutlined />} />
    )

  return (
    <UserProfileModalContainer>
      <PopupCard>
        <ProfileSection onSubmit={handleSubmit}>
          <ImageContainer>
            {userProfileImage}
            <ImageInputLabel htmlFor='image-input'>
              <SettingOutlined style={{ color: '#7d7d7d' }} />
            </ImageInputLabel>
            <input
              id='image-input'
              type='file'
              accept='.jpg, .png, .gif'
              style={{ display: 'none' }}
              onChange={handleImageChange}
              name='profileImageUrl'
            />
          </ImageContainer>

          <InputSection>
            <InputGroup>
              <Label htmlFor='nickname-input'>닉네임</Label>
              <NicknameInput
                id='nickname-input'
                type='text'
                placeholder='닉네임을 입력하세요'
                defaultValue={nickname}
                name='nickname'
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor='introduction-input'>소개글</Label>
              <TextArea
                id='introduction-input'
                placeholder='소개글을 입력하세요'
                defaultValue={bio || ''}
                name='bio'
              />
            </InputGroup>
          </InputSection>
          <ButtonGroup>
            <CancelButton onClick={handleNavigateToProfile}>취소</CancelButton>
            <ConfirmButton
              type='submit'
              disabled={isUpdatingUserInfo}
            >
              {isUpdatingUserInfo ? <LoadingOutlined /> : '확인'}
            </ConfirmButton>
          </ButtonGroup>
        </ProfileSection>
      </PopupCard>
    </UserProfileModalContainer>
  )
}

export default UserEditModal
