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
import { checkAuthor } from '@/utils/user'
import { useLocation } from 'react-router-dom'

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
  const { pathname } = useLocation()
  const handleNavigateTo = useNavigateTo()

  const handleNavigateToProfile = () => {
    handleNavigateTo(`/profile/${userId}`)
  }

  // 프로필 페이지인 경우 클릭 이벤트 제외
  const isProfilePage = pathname.includes('/profile')
  const handleClickProfile = isProfilePage ? undefined : handleNavigateToProfile

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

  const isAuthor = checkAuthor(userId)

  return (
    <UserCard>
      {profileImage}
      <ProfileIntroduce
        $isProfilePage={isProfilePage}
        onClick={handleClickProfile}
      >
        <ProfileNameContainer>
          <Name>{nickname}</Name>
          {isAuthor && (
            <EditButton
              $isDisplay={isDisplay}
              onClick={handleEditProfile}
            >
              <SettingOutlined />
            </EditButton>
          )}
        </ProfileNameContainer>
        <Description>{bio || `${nickname}님입니다.`}</Description>
      </ProfileIntroduce>
    </UserCard>
  )
}

export default UserProfileCard
