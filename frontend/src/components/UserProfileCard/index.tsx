import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import {
  UserCard,
  Description,
  Name,
  ProfileImage,
  ProfileIntroduce,
  EditButton,
  ProfileNameContainer,
} from './style'
import { useNavigateTo } from '@/hooks/useNavigateTo'
import { User } from '@typings/db'
import { Avatar } from 'antd'

interface UserProfileCardProps extends User {
  isDisplay: boolean
}

const UserProfileCard = ({
  nickname,
  bio,
  profileImageUrl,
  isDisplay,
}: UserProfileCardProps) => {
  const handleNavigateTo = useNavigateTo()
  const handleEditProfile = () => {
    handleNavigateTo('/profile/edit')
  }

  const profileImage = profileImageUrl ? (
    <ProfileImage
      src={profileImageUrl}
      alt={nickname}
    />
  ) : (
    <Avatar icon={<UserOutlined />} />
  )

  return (
    <UserCard>
      {profileImage}
      <ProfileIntroduce>
        <ProfileNameContainer>
          <Name>{nickname}</Name>
          <EditButton
            $isDisplay={isDisplay}
            onClick={handleEditProfile}
          >
            <SettingOutlined style={{ color: '#7d7d7d', fontSize: '1.2rem' }} />
          </EditButton>
        </ProfileNameContainer>
        <Description>{bio}</Description>
      </ProfileIntroduce>
    </UserCard>
  )
}

export default UserProfileCard
