import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import {
  UserCard,
  Description,
  Name,
  ProfileImage,
  ProfileIntroduce,
  EditButton,
  ProfileNameContainer,
  AuthorProfileIcon,
} from './style'
import { useNavigateTo } from '@/hooks/useNavigateTo'
import { User } from '@typings/db'

interface UserProfileCardProps extends User {
  isDisplay: boolean
  type?: 'post'
}

const UserProfileCard = ({
  nickname,
  bio,
  profileImageUrl,
  isDisplay,
  _id: userId,
}: UserProfileCardProps) => {
  const handleNavigateTo = useNavigateTo()

  const handleNavigateToProfile = () => {
    handleNavigateTo(`/profile/${userId}`)
  }

  const handleEditProfile = () => {
    handleNavigateTo(`/profile/${userId}/edit`)
  }

  const profileImage = profileImageUrl ? (
    <ProfileImage
      src={profileImageUrl}
      alt={nickname}
    />
  ) : (
    <AuthorProfileIcon icon={<UserOutlined />} />
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
        <Description>{bio || `${nickname}님입니다.`}</Description>
      </ProfileIntroduce>
    </UserCard>
  )
}

export default UserProfileCard
