import { SettingOutlined } from '@ant-design/icons'
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
      <EditButton $isDisplay={isDisplay}>
        <SettingOutlined style={{ color: '#7d7d7d', fontSize: '1.2rem' }} />
      </EditButton>
    </UserCard>
  )
}

export default UserProfileCard
