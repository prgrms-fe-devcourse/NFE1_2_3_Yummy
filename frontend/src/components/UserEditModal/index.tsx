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
import { useMutation } from '@tanstack/react-query'
import userApi from '@/apis/userService'
import { useOutletContext } from 'react-router-dom'
import uploadImage from '@/apis/cloudianry'
import { queryClient } from '@/apis/api'

const UserEditModal = () => {
  const userData = useOutletContext<User>()
  const handleNavigateTo = useNavigateTo()

  const [userImage, setUserImage] = useState<string | File | null>(null)

  useEffect(() => {
    if (userData.profileImageUrl) {
      setUserImage(userData.profileImageUrl)
    }
  }, [userData.profileImageUrl])

  // 추후 에러처리 진행 및 옵티미스틱 업데이트 진행 예정
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (userForm: UserForm) => userApi.updateUserData(userForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', userData._id] })
      queryClient.invalidateQueries({ queryKey: ['profileImage'] }) //쿼리키 추가
      handleNavigateTo('../')
    },
  })

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

    const formData = new FormData(e.target as HTMLFormElement)
    const requestBody = Object.fromEntries(formData)

    // 최초의 유저 이미지와 선택한 이미지가 다르면 이미지 업로드
    if (userData.profileImageUrl !== userImage) {
      const imageUrl = await uploadImage(userImage as File)
      requestBody.profileImageUrl = imageUrl.secure_url
      queryClient.invalidateQueries({ queryKey: ['profileImage'] }) //쿼리키 추가
    }

    // 유저 데이터가 변경되었으면 업데이트
    if (
      userData.bio !== requestBody.bio ||
      userData.nickname !== requestBody.nickname ||
      userData.profileImageUrl !== requestBody.profileImageUrl
    ) {
      mutate(requestBody as unknown as UserForm)

      return
    }

    handleNavigateTo('../')
  }

  // 취소 버튼 클릭 핸들러
  const handleClickCancel = () => {
    handleNavigateTo('../')
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
            <CancelButton onClick={handleClickCancel}>취소</CancelButton>
            <ConfirmButton
              type='submit'
              disabled={isPending}
            >
              {isPending ? <LoadingOutlined /> : '확인'}
            </ConfirmButton>
          </ButtonGroup>
        </ProfileSection>
      </PopupCard>
    </UserProfileModalContainer>
  )
}

export default UserEditModal
