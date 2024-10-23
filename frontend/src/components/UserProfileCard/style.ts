import styled from 'styled-components'

export const UserCard = styled.div`
  display: flex;
  width: 60%;
  padding: 1.5rem;
  justify-content: space-evenly;
  background-color: white;
  font-family: 'Noto Sans KR', sans-serif;
`

export const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
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
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.5;
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