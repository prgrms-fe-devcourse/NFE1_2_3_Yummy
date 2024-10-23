import {
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  ImageContainer,
  InputGroup,
  InputSection,
  Label,
  NicknameInput,
  PopupCard,
  ProfileImage,
  ProfileSection,
  SettingsIcon,
  TextArea,
  UserProfileModalContainer,
} from './style'

const PopupDialog = ({}) => {
  return (
    <UserProfileModalContainer>
      <PopupCard>
        <ProfileSection>
          <ImageContainer>
            <ProfileImage
              src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
              alt='Profile'
            />
            <SettingsIcon></SettingsIcon>
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
          <CancelButton>취소</CancelButton>
          <ConfirmButton>확인</ConfirmButton>
        </ButtonGroup>
      </PopupCard>
    </UserProfileModalContainer>
  )
}

export default PopupDialog
