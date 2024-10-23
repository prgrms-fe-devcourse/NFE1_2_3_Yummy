import {
  UserCard,
  Description,
  Name,
  ProfileImage,
  ProfileIntroduce,
  EditButton,
} from './style'

const UserProfileCard = ({
  name = '애드워드 리',
  description = "실사취집에게 가는 길은 길었어요. 가끔은 '참았다', 좋아서 가서 뭔가 고치고 싶다말하는 생각이 들기도 해요. 앞자막 한 번 걷기 시작하면 끝까지 가봐야 하는 길니다. 화이팅!",
  imageUrl = 'https://static.inews24.com/v1/0ea0b53518da00.jpg',
}) => {
  return (
    <UserCard>
      <ProfileImage
        src={imageUrl}
        alt={name}
      />
      <ProfileIntroduce>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </ProfileIntroduce>
      <EditButton $isDisplay={true}>asd</EditButton>
    </UserCard>
  )
}

export default UserProfileCard
