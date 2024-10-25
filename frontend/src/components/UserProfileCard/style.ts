import styled from 'styled-components'

interface UserCardProps {
  $inPostPage?: boolean
}

export const UserCard = styled.div<UserCardProps>`
  display: flex;
  width: 70%;
  justify-content: center;
  padding-block: 1.5rem;
  align-items: center;
  gap: 2rem;
  background-color: white;
  font-family: 'Noto Sans KR', sans-serif;
`

export const ProfileImage = styled.img<UserCardProps>`
  width: 6.5rem;
  height: 6.5rem;
  margin-top: 1rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

export const ProfileIntroduce = styled.div`
  width: 50%;
`

export const Name = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: #111827;
`

export const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.5;
`

export const ProfileNameContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

interface EditButtonProps {
  $isDisplay: boolean
}

export const EditButton = styled.button<EditButtonProps>`
  width: 1.5rem;
  height: 1.5rem;
  display: ${({ $isDisplay }) => ($isDisplay ? 'block' : 'none')};
  border: none;
  background: none;
  cursor: pointer;
`
