import { SettingOutlined } from '@ant-design/icons'
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
  UserProfileModalContainer,
} from './style'

import { useNavigateTo } from '@/hooks/useNavigateTo'
import { ChangeEvent, useState } from 'react'

const UserEditModal = () => {
  const [userImage, setUserImage] = useState(
    'https://static.inews24.com/v1/0ea0b53518da00.jpg',
  )

  const handleNavigateTo = useNavigateTo()
  const handleClickCancel = () => {
    handleNavigateTo('/profile')
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일 출력을 위한 로직
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUserImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const requestBody = Object.fromEntries(formData)

    return { ...requestBody, image: userImage }
  }

  return (
    <UserProfileModalContainer>
      <PopupCard>
        <ProfileSection onSubmit={handleSubmit}>
          <ImageContainer>
            <ProfileImage
              src={userImage}
              alt='User Profile'
            />
            <ImageInputLabel htmlFor='image-input'>
              <SettingOutlined style={{ color: '#7d7d7d' }} />
            </ImageInputLabel>
            <input
              id='image-input'
              type='file'
              name='image'
              accept='.jpg, .png, .gif'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </ImageContainer>

          <InputSection>
            <InputGroup>
              <Label htmlFor='nickname-input'>닉네임</Label>
              <NicknameInput
                id='nickname-input'
                type='text'
                placeholder='닉네임을 입력하세요'
                defaultValue='에드워드 리'
                name='nickname'
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor='introduction-input'>소개글</Label>
              <TextArea
                id='introduction-input'
                placeholder='소개글을 입력하세요'
                defaultValue="심사위원에게 가는 길은 길었어요. 가끔은 '잠깐만, 돌아가서 뭔가 고치고 싶다'라는 생각이 들기도 해요. 하지만 한 번 걷기 시작하면 끝까지 가봐야 하는 겁니다. 해봅시다."
                name='introduction'
              />
            </InputGroup>
          </InputSection>
          <ButtonGroup>
            <CancelButton onClick={handleClickCancel}>취소</CancelButton>
            <ConfirmButton type='submit'>확인</ConfirmButton>
          </ButtonGroup>
        </ProfileSection>
      </PopupCard>
    </UserProfileModalContainer>
  )
}

export default UserEditModal
