import { SettingOutlined } from '@ant-design/icons'
import {
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  ImageContainer,
  ImageInput,
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

import { useNavigateTo } from '@/assets/useNavigateTo'
import { ChangeEvent, useState } from 'react'

const UserEditModal = () => {
  const [userImage, setUserImage] = useState(
    'https://static.inews24.com/v1/0ea0b53518da00.jpg',
  )

  const handleNavigateTo = useNavigateTo()
  const handleClickCancel = () => {
    handleNavigateTo('/profile')
  }

  const handleClickConfirm = () => {
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

  return (
    <UserProfileModalContainer>
      <PopupCard>
        <ProfileSection>
          <ImageContainer>
            <ProfileImage
              src={userImage}
              alt='Profile'
            />
            <ImageInput htmlFor='image-input'>
              <SettingOutlined style={{ color: '#7d7d7d' }} />
            </ImageInput>
            <input
              id='image-input'
              type='file'
              accept='.jpg, .png, .gif'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </ImageContainer>

          <InputSection>
            <InputGroup>
              <Label>닉네임</Label>
              <NicknameInput
                type='text'
                placeholder='닉네임을 입력하세요'
                defaultValue='에드워드 리'
              />
            </InputGroup>

            <InputGroup>
              <Label>소개글</Label>
              <TextArea
                placeholder='소개글을 입력하세요'
                defaultValue="심사위원에게 가는 길은 길었어요. 가끔은 '잠깐만, 돌아가서 뭔가 고치고 싶다'라는 생각이 들기도 해요. 하지만 한 번 걷기 시작하면 끝까지 가봐야 하는 겁니다. 해봅시다."
              />
            </InputGroup>
          </InputSection>
        </ProfileSection>
        <ButtonGroup>
          <CancelButton onClick={handleClickCancel}>취소</CancelButton>
          <ConfirmButton onClick={handleClickConfirm}>확인</ConfirmButton>
        </ButtonGroup>
      </PopupCard>
    </UserProfileModalContainer>
  )
}

export default UserEditModal
