import styled from 'styled-components'

export const UserProfileModalContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const PopupCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 1rem;
  max-width: 25rem;
  padding: 2rem 1.5rem;
`

export const ProfileSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

export const ImageContainer = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const SettingsIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  background: #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const InputSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
`

export const NicknameInput = styled.input`
  padding: 0.75rem;
  border: none;
  background: #f5f5f5;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: none;
  background: #f5f5f5;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: none;
  min-height: 5rem;
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
`

export const CancelButton = styled(Button)`
  background: transparent;
  color: #3a3a3a;
  font-weight: bold;

  &:hover {
    background: #f5f5f5;
  }
`

export const ConfirmButton = styled(Button)`
  background: black;
  color: white;
  font-weight: 500;
`
