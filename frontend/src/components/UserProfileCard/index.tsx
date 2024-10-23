import {
  UserCard,
  Description,
  Name,
  ProfileImage,
  ProfileIntroduce,
  EditButton,
} from './style'

interface UserProfileCardProps {
  imageUrl: string
  name: string
  description: string
  isDisplay: boolean
}

const UserProfileCard = ({
  imageUrl,
  name,
  description,
  isDisplay,
}: UserProfileCardProps) => {
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
      <EditButton $isDisplay={isDisplay}>asd</EditButton>
    </UserCard>
  )
}

export default UserProfileCard
