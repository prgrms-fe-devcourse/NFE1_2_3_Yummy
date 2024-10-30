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
import { User } from '@/typings/db'
import { useMutation } from '@tanstack/react-query'
import userApi from '@/apis/userService'
import { useOutletContext } from 'react-router-dom'

const UserEditModal = () => {
  const userData = useOutletContext<User>()
  const handleNavigateTo = useNavigateTo()

  const [userImage, setUserImage] = useState(
    'https://static.inews24.com/v1/0ea0b53518da00.jpg',
  )

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (userForm: User) =>
      await userApi.updateUserData(userForm),
  })

  const { nickname, bio, profileImageUrl } = userData

  const handleClickCancel = () => {
    handleNavigateTo('../')
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일 출력을 위한 로직
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const requestBody = Object.fromEntries(formData)

    mutate(requestBody as unknown as User)
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
              name='profileImageUrl'
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
                defaultValue={nickname}
                name='nickname'
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor='introduction-input'>소개글</Label>
              <TextArea
                id='introduction-input'
                placeholder='소개글을 입력하세요'
                defaultValue={bio}
                name='bio'
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
